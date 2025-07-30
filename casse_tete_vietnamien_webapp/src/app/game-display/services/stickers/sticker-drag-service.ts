import { Injectable } from '@angular/core';
import { StickerPlacementService } from './sticker-placement-service';
import { CombinationVerificationService } from './CombinationVerificationService';
import { CheatSuggestionService } from './cheat-suggestion-service';

//to think this was a spaghetti 300 hundred lines long. Yes, I'm congratulating myself
//More seriously, it's far more maintanable/understable
@Injectable({ providedIn: 'root' })
export class StickerDragService {
  private selectedSticker: any = null;
  private stickers: any[] = [];
  private zones: any[] = [];
  private boardWidthOffset = 0;
  private boardHeightOffset = 0;
  private scaleFactor = 1;

  //offsets between mouse (absolute) and stickers pos (realtive to gameboard)
  private dragOffsetX = 0;
  private dragOffsetY = 0;

  constructor(
    private placementService: StickerPlacementService,
    private verificationService: CombinationVerificationService,
    private cheatService: CheatSuggestionService
  ) {}

  initialize(
    stickers: any[],
    zones: any[],
    scaleFactor: number,
    boardWidthOffset: number,
    boardHeightOffset: number
  ) {
    this.stickers = stickers;
    this.zones = zones;
    this.scaleFactor = scaleFactor;
    this.boardWidthOffset = boardWidthOffset;
    this.boardHeightOffset = boardHeightOffset;

    this.verificationService.initialize(zones);
    this.placementService.initialize(stickers, zones, scaleFactor, boardWidthOffset, boardHeightOffset);
  }

  getSelectedSticker(): any {
    return this.selectedSticker;
  }

  startDrag(event: MouseEvent, sticker: any): void {
    this.selectedSticker = sticker;

    const stickerLeft = sticker.x + this.boardWidthOffset; //center sticker on the cursor x axis
    const stickerTop = sticker.y + this.boardHeightOffset; //y axis
    //convert the abs coord of the mouse to relative coords stickers live in
    this.dragOffsetX = event.clientX - stickerLeft; 
    this.dragOffsetY = event.clientY - stickerTop;

    this.cheatService.startSuggestionTimer(sticker, this.zones); //tick tack..

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopDrag);
  }

  private onMouseMove = (event: MouseEvent) => {
    if (!this.selectedSticker) return;

    // update the sticker coords when dragging
    this.selectedSticker.x = event.clientX - this.boardWidthOffset - this.dragOffsetX;
    this.selectedSticker.y = event.clientY - this.boardHeightOffset - this.dragOffsetY;
  };

  stopDrag = (): void => {
    if (!this.selectedSticker) return;

    this.cheatService.cancelSuggestionTimer();

    // try placing the sticker
    const placed = this.placementService.tryPlaceSticker(this.selectedSticker);

    // check if we placed all stickers
    if (placed) {
      this.verificationService.checkIfCompleteAndVerify();
    }

    // put the sticker Z back to normal, and unselected it
    this.selectedSticker.zIndex = 4;
    this.selectedSticker = null;

    this.cleanupListeners();
  };

  private cleanupListeners() {
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.stopDrag);
  }
  resetAll(): void {
  // send stickers back to spawn, and reset zone IDs
  this.stickers.forEach(sticker => {
    sticker.x = sticker.spawnX;
    sticker.y = sticker.spawnY;

    if (sticker.currentZoneId) {
      const oldZone = this.zones.find(z => z.id === sticker.currentZoneId);
      if (oldZone) oldZone.stickerValue = null;
      sticker.currentZoneId = null;
    }
  });

  // honestly I don't remember why we double empty, but I won't break it by testing
  //edit: I checked my notes. It's just safety TM
  this.zones.forEach(zone => {
    zone.stickerValue = null;
  });
}
}