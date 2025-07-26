//We offload the logic for the interactions of stickers and zones here, as .sticker.ts was becoming WAY too full and hard to navigate

import { StickerData } from './sticker';
import { Zone } from './interactive-zone';

export class StickerZoneLogic {
//Is the sticker in a zone?
  static isInZone(sticker: StickerData, zone: Zone): boolean {
    const width = 100;
    const height = 100;
    return !(
      sticker.x + width < zone.x ||
      sticker.x > zone.x + zone.width ||
      sticker.y + height < zone.y ||
      sticker.y > zone.y + zone.height
    );
  }

  //When the sticker is dropped in a zone, update its spawn, update the value of the zone with that of the sticker
  static updateZonesOnDrop(
    selectedSticker: StickerData,
    zones: Zone[],
    originalPosition: { x: number, y: number }
  ): { droppedInZone: boolean; zones: Zone[]; updatedStickerPosition: { x: number; y: number } } {
    let droppedInZone = false;
    let updatedPosition = { ...originalPosition };

    for (const zone of zones) {
      if (this.isInZone(selectedSticker, zone)) {
        updatedPosition = {
          x: zone.x + zone.width / 2 - 50,
          y: zone.y + zone.height / 2 - 50
        };
        zone.stickerValue = selectedSticker.value; //Save the value of the sticker to that of the zone
        droppedInZone = true;
        break;
      }
    }

    if (!droppedInZone) {
      // Send it back to spawn or last known zone
      for (const zone of zones) {
        if (zone.stickerValue === selectedSticker.value) {
          zone.stickerValue = null;
        }
      }
    }

    return { droppedInZone, zones, updatedStickerPosition: updatedPosition };
  }
}