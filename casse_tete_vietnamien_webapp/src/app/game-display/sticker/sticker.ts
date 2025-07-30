export interface StickerData {
  id: string;
  x: number;
  y: number;
  spawnX: number;
  spawnY: number;
  zIndex?: number; // Used to display it on top of everything else when we moove it, else it displays on top of the gameboard tiles
  src: string;
  value: number;
   currentZoneId: string | null;
}