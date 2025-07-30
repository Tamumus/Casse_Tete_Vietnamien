import { Zone } from "./interactive-zone";

//coords of the stickers ,relative to the gameboard
export class ZoneUtils {
  static generateZones(scaleFactor: number, boardWidthOffset: number, boardHeightOffset: number): Zone[] {
    const base = [
      { x: 0, y: 0 },
      { x: 0, y: 400 },
      { x: 100, y: 500 },
      { x: 200, y: 400 },
      { x: 200, y: 0 },
      { x: 400, y: 0 },
      { x: 400, y: 400 },
      { x: 500, y: 500 },
      { x: 600, y: 400 }
    ];

    //we return the zones scaled, with offsets
    return base.map(({ x, y }, index) => {
      const scaledX = boardWidthOffset + x * scaleFactor;
      const scaledY = boardHeightOffset + y * scaleFactor;
      const size = 100 * scaleFactor;
      return {
        x: scaledX,
        y: scaledY,
        width: size,
        height: size,
        stickerValue: null, //will be changed based on the value of the stickr dropped inside
        id: `zone-${index}` //so we can get the zones one by one (they follow the order of the operations as given by the subject)
      };
    });
  }
}
