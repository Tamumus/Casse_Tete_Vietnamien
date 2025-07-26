import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StickerData } from './sticker';
import { Zone } from './interactive-zone';
import { GameboardData } from '../gameboard/gameboard';
import { ZoneUtils } from './interactive-zone_util';

//This is where we create the sticker and all they need to work as intended
@Component({
  selector: 'app-sticker-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticker.html',
  styleUrls: ['./sticker.css']
})
export class StickerComponent implements OnInit {
  //backend interactions below
//   constructor(private http: HttpClient) {}
//   // submitZones() {
//   // // the nine zones and their values
//   // const values = this.zones.map(z => z.stickerValue); //debug stuff
//   // console.log('Valeurs à envoyer au backend :', values); //debug stuff
//   // //WIP for the rest of backend interactions
// }
  @Input() boardHeight: number = 0;
  @Input() boardWidth: number = 0;
  @Input() scaleFactor: number = 1; //1 so we don't mult scaling by zero in case zomething breaks in gamedisplay.ts
  @Input() boardHeightOffset: number = 0;
  @Input() boardWidthOffset: number = 0;
  @Input() zones: Zone[] = []; // //Needed to interact with them

  //Needed so we know where the sticker is, and was
  private lastZone: Zone | null = null; // Needed below for the logic, 

  stickers: StickerData[] = [];
  readonly imageSrc = 'tile_white.jpg'
  src = this.imageSrc;
 //wich stick to drag/being dragged
  selectedSticker: StickerData | null = null;
  offsetX = 0;
  offsetY = 0;
  containerRect: DOMRect | null = null;

ngOnInit() {
  console.log('--- STICKER COMPONENT INIT ---');
  console.log('boardWidthOffset:', this.boardWidthOffset);
  console.log('boardHeightOffset:', this.boardHeightOffset);
  console.log('scaleFactor:', this.scaleFactor);
  this.generatestickersPositions(); // OK

  // We build the zones now and here, because that's what an afternoon of debugging brought me to realize
  this.zones = ZoneUtils.generateZones(
    this.scaleFactor,
    this.boardWidthOffset,
    this.boardHeightOffset
  );

  // console.log('--- ZONES INIT ---');
  // this.zones.forEach(zone => {
  //   console.log(
  //     `Zone ${zone.id} → x: ${zone.x}, y: ${zone.y}, width: ${zone.width}, height: ${zone.height}`
  //   );
  // });
}

  //calc the positions of the nine stickers based on the scaling
  generatestickersPositions() {
  let i: number = 1;
  let x: number = 0, y: number = 0;
  const spacing = 100 * this.scaleFactor;

  // First column (1 to 4)
  x = spacing * 8 + this.boardWidthOffset;
  for (; i <= 4; i++) {
    y = i * spacing + this.boardHeightOffset;
    this.stickers.push({
      id: `sticker-${i}`,
      src: this.imageSrc,
      x: x,
      y: y,
      spawnX: x,
      spawnY: y,
      value: i,
      currentZoneId: null
    });
  }

  // Second colum (5 to 9)
  x = spacing * 9 + this.boardWidthOffset;
  for (; i <= 9; i++) {
    y = (i - 4) * spacing + this.boardHeightOffset;
    this.stickers.push({
      id: `sticker-${i}`,
      src: this.imageSrc,
      x: x,
      y: y,
      spawnX: x,
      spawnY: y,
      value: i,
      currentZoneId: null
    });
  }
}

  startDrag(event: MouseEvent, sticker: StickerData) {
    // console.log('--- DRAG STARTED ---');
    this.selectedSticker = sticker;
    const container = document.querySelector('.sticker-container') as HTMLElement;
    const rect = container.getBoundingClientRect();

    // Save offset between the mouse absolute x and y and the sticker relative x and y (to the gameboard)
    this.offsetX = event.clientX - rect.left - sticker.x;
    this.offsetY = event.clientY - rect.top - sticker.y;
    this.selectedSticker.zIndex = 1000;//display it on top of everything, much prettier

    window.addEventListener('mousemove', this.onMouseMove);
    window.addEventListener('mouseup', this.stopDrag);
  }

  onMouseMove = (event: MouseEvent) => {
    if (this.selectedSticker) {
      const container = document.querySelector('.sticker-container') as HTMLElement;
      const rect = container.getBoundingClientRect();

      this.selectedSticker.x = event.clientX - rect.left - this.offsetX;
      this.selectedSticker.y = event.clientY - rect.top - this.offsetY;
      for (const zone of this.zones) {
        const stickerX = this.selectedSticker.x;
        const stickerY = this.selectedSticker.y;
        const stickerSize = 100 * this.scaleFactor;
        // console.log('Zone', zone.id, 'highlighted?', zone.highlighted);
        // console.log(`Zone ${zone.id} highlighted: ${zone.highlighted}`);
      }    
  }
  }
stopDrag = () => {
  const sticker = this.selectedSticker;

  if (sticker) {
    console.log('--- DRAG STOPPED ---');
    console.log(`Sticker final position: x = ${sticker.x}, y = ${sticker.y}`);

    const stickerX = sticker.x;
    const stickerY = sticker.y;
    const stickerSize = 100 * this.scaleFactor;

    let placedInZone = false;

    for (const zone of this.zones) {
      const zoneX = zone.x;
      const zoneY = zone.y;
      const zoneSize = zone.width;

      const isOverlapping = this.isOverlappingRect(
        stickerX, stickerY, stickerSize, stickerSize,
        zoneX, zoneY, zoneSize, zoneSize
      );

      if (isOverlapping) {
        const isZoneAlreadyUsed = zone.stickerValue !== null;
        const otherStickerInZone = this.stickers.some(
          s => s.id !== sticker.id && s.currentZoneId === zone.id
        );

        if (!isZoneAlreadyUsed && !otherStickerInZone) {
          // Libérer l’ancienne zone si différente
          if (sticker.currentZoneId && sticker.currentZoneId !== zone.id) {
            const previousZone = this.zones.find(z => z.id === sticker.currentZoneId);
            if (previousZone) previousZone.stickerValue = null;
          }

          // Affecter la nouvelle zone
          const stickerSize = 100 * this.scaleFactor;
          sticker.x = zone.x - this.boardWidthOffset/2,
          sticker.y = zone.y - this.boardHeightOffset/2;
          zone.stickerValue = sticker.value;
          sticker.currentZoneId = zone.id;
          placedInZone = true;

          this.playslideinSound();
          break;
        } else {
          console.log(`Zone ${zone.id} déjà occupée`);
        }
      }
    }

    if (!placedInZone) {
      // Retour au point d'origine
      sticker.x = sticker.spawnX;
      sticker.y = sticker.spawnY;

      // Libère la zone si elle était marquée
      if (sticker.currentZoneId) {
        const oldZone = this.zones.find(z => z.id === sticker.currentZoneId);
        if (oldZone) oldZone.stickerValue = null;
        sticker.currentZoneId = null;
      }

      const element = document.getElementById(sticker.id);
      if (element) {
        element.classList.add('shake');
        setTimeout(() => element.classList.remove('shake'), 300);
      }

      this.playShakeSound();
    }

    this.selectedSticker = null;
    this.cleanupListeners();
  }
};
isOverlappingRect(
  x1: number, y1: number, w1: number, h1: number,
  x2: number, y2: number, w2: number, h2: number
): boolean {
  return !(x2 > x1 + w1 ||
           x2 + w2 < x1 ||
           y2 > y1 + h1 ||
           y2 + h2 < y1);
}
//We clean the listeners
cleanupListeners() {
  window.removeEventListener('mousemove', this.onMouseMove);
  window.removeEventListener('mouseup', this.stopDrag);
}
//audio feedback for the stickers when the zone is in use
playShakeSound(): void {
  const audio = new Audio();
  audio.src = 'cant_slide.mp3';
  audio.load();
  audio.play().catch(e => console.warn("Erreur lors de la lecture du son :", e));
}
//and when it's free
playslideinSound(): void {
  const audio = new Audio();
  audio.src = 'slide_in_place.mp3';
  audio.load();
  audio.play().catch(e => console.warn("Erreur lors de la lecture du son :", e));
}
}