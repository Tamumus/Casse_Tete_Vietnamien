import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // so we can access it anywhere
})
export class TileUtilsService {
  // beautify the tiles by randomising the display a bit
  rotateTile(): number {
    const allowedRotations = [0, 90, 180, 270, 360];
    const index = Math.floor(Math.random() * allowedRotations.length);
    return allowedRotations[index];
  }
}