import { Injectable } from '@angular/core';
import { AudioService } from '../../../shared/audio-service';

@Injectable({ providedIn: 'root' })
export class StickerPlacementService {
  private stickers: any[] = [];
  private zones: any[] = [];
  private boardWidthOffset = 0;
  private boardHeightOffset = 0;
  private scaleFactor = 1;

  constructor(private audioService: AudioService) {}

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
  }

  tryPlaceSticker(sticker: any): boolean {
    const stickerX = sticker.x;
    const stickerY = sticker.y;
    const stickerSize = 100 * this.scaleFactor;

    for (const zone of this.zones) {
      const zoneX = zone.x;
      const zoneY = zone.y;
      const zoneSize = zone.width;

      if (this.isOverlappingRect(stickerX, stickerY, stickerSize, stickerSize, zoneX, zoneY, zoneSize, zoneSize)) {
        const isZoneUsed = zone.stickerValue !== null;
        const otherStickerInZone = this.stickers.some(s => s.id !== sticker.id && s.currentZoneId === zone.id);

        if (!isZoneUsed && !otherStickerInZone) {
          if (sticker.currentZoneId && sticker.currentZoneId !== zone.id) {
            const prevZone = this.zones.find(z => z.id === sticker.currentZoneId);
            if (prevZone) prevZone.stickerValue = null;
          }

          // Ajuster offset si stickers plus gros que zones (exemple ici tu peux modifier)
          sticker.x = zone.x - this.boardWidthOffset / 2;
          sticker.y = zone.y - this.boardHeightOffset / 2;

          zone.stickerValue = sticker.value;
          sticker.currentZoneId = zone.id;

          this.audioService.playSlideInSound();
          return true;
        }
      }
    }

    // Si pas placé, reset position
    this.resetStickerPosition(sticker);
    this.audioService.playShakeSound();
    return false;
  }

  resetStickerPosition(sticker: any) {
    if (sticker.currentZoneId) {
      const oldZone = this.zones.find(z => z.id === sticker.currentZoneId);
      if (oldZone) oldZone.stickerValue = null;
      sticker.currentZoneId = null;
    }
    sticker.x = sticker.spawnX;
    sticker.y = sticker.spawnY;
  }

  private isOverlappingRect(
    x1: number, y1: number, w1: number, h1: number,
    x2: number, y2: number, w2: number, h2: number
  ): boolean {
    return !(x2 > x1 + w1 || x2 + w2 < x1 || y2 > y1 + h1 || y2 + h2 < y1);
  }
}