import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//what the game-display component subscribes to and observes to display and play sound accordingly
//this is changed by the sticker service on completion of the game, after checking if the combi is valid
export type GameStatus = 'none' | 'victory' | 'defeat' | 'error';

@Injectable({
  providedIn: 'root'
})
export class VictoryService {
  private statusSubject = new BehaviorSubject<GameStatus>('none');
  status$ = this.statusSubject.asObservable();

  showVictory() {
    this.statusSubject.next('victory');
    console.log('VictoryService: showVictory called');
  }

  showDefeat() {
    this.statusSubject.next('defeat');
    console.log('VictoryService: showDefeat called');
  }

  showError() { //you don't want to boot the DB? Fine. I'll blind you with my paint skills
  this.statusSubject.next('error');
  console.log('VictoryService: showError called');
}

  reset() {
    this.statusSubject.next('none');
  }
}