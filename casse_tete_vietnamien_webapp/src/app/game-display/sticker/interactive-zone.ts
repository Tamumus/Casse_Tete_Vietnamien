export interface Zone {
  x: number;
  y: number;
  width: number;
  height: number;
  stickerValue: number | null;
  id: string;
  highlighted?: boolean; // 🆕 facultatif, permet de savoir si on la survole
}