import { Injectable } from '@angular/core';
import { Zone } from '../../sticker/interactive-zone';
import { StickerData } from '../../sticker/sticker';
import { AudioService } from '../../../shared/audio-service';

//So, we separate all the moovements of the stickers here. it's far easier to maintain, I think?
@Injectable({ providedIn: 'root' })
export class StickerDragService {
  //All this is inherited from the component
  private selectedSticker: StickerData | null = null;
  private offsetX = 0;
  private offsetY = 0;
  private stickers: StickerData[] = [];
  private zones: Zone[] = [];
  private scaleFactor: number = 1;
  private boardWidthOffset = 0;
  private boardHeightOffset = 0;

  //needed to have the sound effects play
  constructor(private audioService: AudioService) {}

  //Save it for later (AKA stuff is mooving around)
  initialize(stickers: StickerData[], zones: Zone[], scaleFactor: number, widthOffset: number, heightOffset: number) {
    this.stickers = stickers;
    this.zones = zones;
    this.scaleFactor = scaleFactor;
    this.boardWidthOffset = widthOffset;
    this.boardHeightOffset = heightOffset;
  }

  //User drag a sticker, what happens
  startDrag(event: MouseEvent, sticker: StickerData) {
    this.selectedSticker = sticker;
    const container = document.querySelector('.sticker-container') as HTMLElement;
    const rect = container.getBoundingClientRect();

    //offset needed between the mouse coord wich are relative to the screen and the sticker wich are relative to the gameboard
    this.offsetX = event.clientX - rect.left - sticker.x;
    this.offsetY = event.clientY - rect.top - sticker.y;

    //sticker mooving on top of everytinh else
    sticker.zIndex = 1000;

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopDrag);
  }

  //Sticker follows the mouse, wow
  onMouseMove = (event: MouseEvent) => {
    if (this.selectedSticker) {
      const container = document.querySelector('.sticker-container') as HTMLElement;
      const rect = container.getBoundingClientRect();

      this.selectedSticker.x = event.clientX - rect.left - this.offsetX;
      this.selectedSticker.y = event.clientY - rect.top - this.offsetY;
    }
  };

  //Let go of the sticker
  stopDrag = () => {
    const sticker = this.selectedSticker;
    if (!sticker) return;

    const stickerX = sticker.x;
    const stickerY = sticker.y;
    const stickerSize = 100 * this.scaleFactor;

    let placedInZone = false;

    //Grab the zones coords and size
    for (const zone of this.zones) {
      const zoneX = zone.x;
      const zoneY = zone.y;
      const zoneSize = zone.width;

      //is the sticker overlapping a zone? as a boolean for checks below
      const isOverlapping = this.isOverlappingRect(
        stickerX, stickerY, stickerSize, stickerSize,
        zoneX, zoneY, zoneSize, zoneSize
      );

      //if is overlapping true...
      if (isOverlapping) {
        const isZoneAlreadyUsed = zone.stickerValue !== null;
        const otherStickerInZone = this.stickers.some(
          s => s.id !== sticker.id && s.currentZoneId === zone.id
        );

        //already a sticker there, git out
        if (!isZoneAlreadyUsed && !otherStickerInZone) {
          if (sticker.currentZoneId && sticker.currentZoneId !== zone.id) {
            const previousZone = this.zones.find(z => z.id === sticker.currentZoneId);
            if (previousZone) previousZone.stickerValue = null;
          }

          //free zone! Offsets are needed so it looks pretty (stickers are 20% bigger than zones )
          sticker.x = zone.x - this.boardWidthOffset / 2;
          sticker.y = zone.y - this.boardHeightOffset / 2;
          zone.stickerValue = sticker.value;
          sticker.currentZoneId = zone.id;
          placedInZone = true;

          this.audioService.playSlideInSound();
          break;
        }
      }
    }
    //what happens if the sticker isn't dropped in a valid zone (AKA anywhere else)
    if (!placedInZone) {
      //send him back to spawn
      sticker.x = sticker.spawnX;
      sticker.y = sticker.spawnY;


      if (sticker.currentZoneId) {
        const oldZone = this.zones.find(z => z.id === sticker.currentZoneId);
        if (oldZone) oldZone.stickerValue = null;
        sticker.currentZoneId = null;
      }

      //bit of animation playing if the stickers is not dropped in a valid zone
      const element = document.getElementById(sticker.id);
      if (element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 300);
      }

      this.audioService.playShakeSound();
    }

    //clean up after mooving a sticker
    sticker.zIndex = 4;
    this.selectedSticker = null;
    this.cleanupListeners();
  };

  //bit of math, we use the X and Y (wcih are in the same ref. the gameboard)
  isOverlappingRect(
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean {
    return !(x2 > x1 + w1 ||
             x2 + w2 < x1 ||
             y2 > y1 + h1 ||
             y2 + h2 < y1);
  }

  cleanupListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.stopDrag);
  }
}
