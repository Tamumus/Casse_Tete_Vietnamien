import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleComponent } from './title/title-component';
import { IntroText } from './intro-text/intro-text';
import { StickerComponent } from './sticker/sticker_component';
import { GameboardComponent } from './gameboard/gameboard_component';
import { CombinationDisplayComponent } from '../combination-display/combination-display.component';
import { ZoneUtils } from './sticker/interactive-zone_util';
import { Zone } from './sticker/interactive-zone';
import { VictoryService,GameStatus } from './services/graphics/victory.service';
import { Subscription } from 'rxjs';
import { AudioService } from '../shared/audio-service';
import { CombinationCheatService } from '../combination-display/combination-cheat.service';
 
@Component({
  selector: 'app-game-display',
  imports: [CommonModule,TitleComponent, IntroText, StickerComponent, GameboardComponent,CombinationDisplayComponent],
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.css']
})
export class GameDisplayComponent implements OnInit, OnDestroy {
  showVictoryScreen = false;
  showDefeatScreen = false;
  private statusSub?: Subscription;
  private cheatSub?: Subscription;

  zones: Zone[] = [];
  suggestedZoneId: string | null = null; //used for the cheat mode
  boardWidth: number = 700;
  boardHeight: number = 600;
  scaleFactor: number = 1;
  boardHeightOffset: number = 0;
  boardWidthOffset: number = 0;

  constructor(private victoryService: VictoryService,
              private AudioService: AudioService,
              private cheatService: CombinationCheatService) {}

  ngOnInit(): void {
    // Listen for the victory/defeat status
    this.statusSub = this.victoryService.status$.subscribe((status: GameStatus) => {;
      this.showVictoryScreen = status === 'victory';
      this.showDefeatScreen = status === 'defeat';

      if (status === 'victory') {
        this.AudioService.playVictorySound();
    } else if (status === 'defeat') {
      this.AudioService.playDefeatSound();
      }
    })
    //Listen for the cheatservice to tell us what to draw attention to
    this.cheatSub = this.cheatService.suggestedZone$.subscribe((zoneIndex) => {
      console.log('Nouvelle zone suggérée reçue dans GameDisplayComponent:', zoneIndex);
      if (zoneIndex !== null) {
        this.blinkZone(zoneIndex);
      }
    });
    this.setBoardDimensions();
    this.calculateOffsets();

    this.zones = ZoneUtils.generateZones(
      this.scaleFactor,
      this.boardWidthOffset,
      this.boardHeightOffset
    );
  }

  ngOnDestroy(): void {
    this.statusSub?.unsubscribe();
    this.cheatSub?.unsubscribe();
  }

  
  //I use a 1920 but this will look horrible on 4k or lower res, I can't test it atm but it's an attempt
  setBoardDimensions(): void {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    this.boardWidth = Math.floor(screenWidth * 0.4);  // 40% of screen width
    this.boardHeight = Math.floor(screenHeight * 0.35); // 35% of screen height

    this.scaleFactor = 1;//this.boardWidth / (7 * 100); // pour une grille de 7 colonnes
  }

  //So the tiles aren't stuck to the side of the board, wich is fugly
  calculateOffsets(): void {
    const offsetRatio = 0.04; // 4% of width and height
    this.boardHeightOffset = this.boardHeight * offsetRatio;
    this.boardWidthOffset = this.boardWidth * offsetRatio;
  }
  //for the cheat mode. Make the zone blink for 3secs
  blinkZone(zoneIndex: number) {
  const zone = this.zones[zoneIndex];
  if (!zone) return;

  this.suggestedZoneId = zone.id;
  setTimeout(() => {
    this.suggestedZoneId = null;
  }, 3000);
}
}
