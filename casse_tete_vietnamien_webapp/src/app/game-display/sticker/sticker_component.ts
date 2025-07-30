// import { Component, OnInit, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { StickerData } from './sticker';
// import { Zone } from './interactive-zone';
// import { ZoneUtils } from './interactive-zone_util';
// import { StickerDragService } from '../services/stickers/sticker-drag-service';

// //This is where we create the sticker and all they need to work as intended
// @Component({
//   selector: 'app-sticker-component',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './sticker.html',
//   styleUrls: ['./sticker.css']
// })
// export class StickerComponent implements OnInit {

//   constructor(public http: HttpClient, public dragService: StickerDragService) {}

//   @Input() boardHeight: number = 0;
//   @Input() boardWidth: number = 0;
//   @Input() scaleFactor: number = 1; //1 so we don't mult scaling by zero in case zomething breaks in gamedisplay.ts
//   @Input() boardHeightOffset: number = 0;
//   @Input() boardWidthOffset: number = 0;
//   @Input() zones: Zone[] = []; // //Needed to interact with them

//   //Needed so we know where the sticker is, and was
//   private lastZone: Zone | null = null; // Needed below for the logic, 

//   stickers: StickerData[] = [];
//   readonly imageSrc = 'tile_white.jpg';
//   src = this.imageSrc;

//   //removed selectedSticker from the component, now delegated to the service
//   //wich stick to drag/being dragged — from now on, ask the service
//   get selectedSticker(): StickerData | null {
//     return this.dragService.getSelectedSticker();
//   }

//   offsetX = 0; 
//   offsetY = 0;
//   containerRect: DOMRect | null = null;

//   ngOnInit() {
//     // console.log('--- STICKER COMPONENT INIT ---');
//     // console.log('boardWidthOffset:', this.boardWidthOffset);
//     // console.log('boardHeightOffset:', this.boardHeightOffset);
//     // console.log('scaleFactor:', this.scaleFactor);
//     this.zones = ZoneUtils.generateZones( //generate zones first, so the stuff below that depends on it is fine
//       this.scaleFactor,
//       this.boardWidthOffset,
//       this.boardHeightOffset
//     );

//     this.generatestickersPositions();

//     //Have to init it before calling the service with startdrag
//     this.dragService.initialize(
//       this.stickers,
//       this.zones,
//       this.scaleFactor,
//       this.boardWidthOffset,
//       this.boardHeightOffset
//     );
//   }

//   //calc the positions of the nine stickers based on the scaling
//   generatestickersPositions() {
//     let i: number = 1;
//     let x: number = 0, y: number = 0;
//     const spacing = 100 * this.scaleFactor;

//     // First column (1 to 4)
//     x = spacing * 8 + this.boardWidthOffset;
//     for (; i <= 4; i++) {
//       y = i * spacing + this.boardHeightOffset;
//       this.stickers.push({
//         id: `sticker-${i}`,
//         src: this.imageSrc,
//         x: x,
//         y: y,
//         spawnX: x,
//         spawnY: y,
//         value: i,
//         currentZoneId: null
//       });
//     }

//     // Second column (5 to 9)
//     x = spacing * 9 + this.boardWidthOffset;
//     for (; i <= 9; i++) {
//       y = (i - 4) * spacing + this.boardHeightOffset;
//       this.stickers.push({
//         id: `sticker-${i}`,
//         src: this.imageSrc,
//         x: x,
//         y: y,
//         spawnX: x,
//         spawnY: y,
//         value: i,
//         currentZoneId: null
//       });
//     }
//   }

//   //We call the moovement.service. God, that took so long to refractor
//   startDrag(event: MouseEvent, sticker: StickerData) {
//     this.dragService.startDrag(event, sticker);
//   }
// }

// This is where we create the sticker and all they need to work as intended
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { StickerDragService } from '../services/stickers/sticker-drag-service';
import { StickerData } from './sticker';
import { Zone } from './interactive-zone';
import { ZoneUtils } from './interactive-zone_util';

@Component({
  selector: 'app-sticker-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sticker.html',
  styleUrls: ['./sticker.css']
})
export class StickerComponent implements OnInit, AfterViewInit {

  constructor(
    public http: HttpClient,
    public dragService: StickerDragService
  ) {}

  @Input() boardHeight: number = 0;
  @Input() boardWidth: number = 0;
  @Input() scaleFactor: number = 1;
  @Input() boardHeightOffset: number = 0;
  @Input() boardWidthOffset: number = 0;
  @Input() zones: Zone[] = [];

  stickers: StickerData[] = [];
  readonly imageSrc = 'tile_white.jpg';

  // removed selectedSticker from the component, now delegated to the service
  // which stick to drag/being dragged — from now on, ask the service
  get selectedSticker(): StickerData | null {
    return this.dragService.getSelectedSticker();
  }

  ngOnInit(): void {
    // Générer dynamiquement les zones avec les offsets et scale
    this.zones = ZoneUtils.generateZones(
      this.scaleFactor,
      this.boardWidthOffset,
      this.boardHeightOffset
    );

    this.generateStickersPositions();
  }

  ngAfterViewInit(): void {
    // Récupérer les HTMLElements des stickers et zones
    const stickerElements = this.stickers
      .map(st => document.getElementById(st.id))
      .filter((el): el is HTMLElement => el !== null);

    const zoneElements = this.zones
      .map(z => document.getElementById(z.id))
      .filter((el): el is HTMLElement => el !== null);

    // Initialize drag service with all elements and data
    this.dragService.initialize(
      this.stickers,
      this.zones,
      this.scaleFactor,
      this.boardWidthOffset,
      this.boardHeightOffset
      );
    }

  generateStickersPositions(): void {
    let i = 1;
    const spacing = 100 * this.scaleFactor;

    // Colonne 1 (stickers 1 à 4)
    let x = spacing * 8 + this.boardWidthOffset;
    for (; i <= 4; i++) {
      const y = i * spacing + this.boardHeightOffset;
      this.stickers.push(this.createSticker(i, x, y));
    }

    // Colonne 2 (stickers 5 à 9)
    x = spacing * 9 + this.boardWidthOffset;
    for (; i <= 9; i++) {
      const y = (i - 4) * spacing + this.boardHeightOffset;
      this.stickers.push(this.createSticker(i, x, y));
    }
  }

  createSticker(idNumber: number, x: number, y: number): StickerData {
    return {
      id: `sticker-${idNumber}`,
      src: this.imageSrc,
      x,
      y,
      spawnX: x,
      spawnY: y,
      value: idNumber,
      currentZoneId: null
    };
  }

  startDrag(event: MouseEvent, sticker: StickerData): void {
    this.dragService.startDrag(event, sticker);
  }
  resetStickers() {
    this.dragService.resetAll();
}
}