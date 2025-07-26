import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TitleComponent } from './title/title-component';
import { IntroText } from './intro-text/intro-text';
import { StickerComponent } from "./sticker/sticker_component";
import { GameboardComponent } from './gameboard/gameboard_component';
// import { ZoneComponent } from './interactive-zone/interactive-zone_component';
import { ZoneUtils } from './sticker/interactive-zone_util';
import { Zone } from './sticker/interactive-zone';

@Component({
  selector: 'app-game-display',
  imports: [CommonModule,TitleComponent, IntroText, StickerComponent, GameboardComponent],
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit {
  zones:Zone[] = [];
  boardWidth: number = 700;
  boardHeight: number = 600;
  scaleFactor: number = 1;
  boardHeightOffset: number = 0;
  boardWidthOffset: number = 0;
  
  constructor() {}

  ngOnInit(): void {
    this.setBoardDimensions();
    this.calculateOffsets();

    this.zones = ZoneUtils.generateZones(
      this.scaleFactor,
      this.boardWidthOffset,
      this.boardHeightOffset
    )
  }
  //I use a 1920 but this will look horrible on 4k or lower res, I can't test it atm but it's an attempt
  setBoardDimensions(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    this.boardWidth = Math.floor(screenWidth * 0.4);  // 40% of screen width
    this.boardHeight = Math.floor(screenHeight * 0.35); // 35% of screen height

    // Optionnel : un facteur d’échelle en fonction du spacing d'origine (100)
    this.scaleFactor = 1;//this.boardWidth / (7 * 100); // pour une grille de 7 colonnes
  }

  //So the tiles aren't stuck to the side of the board, wich is fugly
  calculateOffsets(): void {
    const offsetRatio = 0.04; // 4% of width and height
    this.boardHeightOffset = this.boardHeight * offsetRatio;
    this.boardWidthOffset = this.boardWidth * offsetRatio;
  }
}
