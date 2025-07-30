import { Component, OnInit } from '@angular/core';
// import { Combination, CombinationService } from './game-display/services/combination';
import { CommonModule } from '@angular/common'; 
import { GameDisplayComponent } from './game-display/game-display';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameDisplayComponent],
  styleUrls: ['app.component.css'],
  //just call the component that handles display
  template: `
  <app-game-display></app-game-display> 
  `
})
export class AppComponent {
}