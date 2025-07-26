import { Zone } from "./interactive-zone";

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

    return base.map(({ x, y }, index) => {
      const scaledX = boardWidthOffset + x * scaleFactor;
      const scaledY = boardHeightOffset + y * scaleFactor;
      const size = 100 * scaleFactor;
      return {
        x: scaledX,
        y: scaledY,
        width: size,
        height: size,
        stickerValue: null,
        id: `zone-${index}`
      };
    });
  }
}
