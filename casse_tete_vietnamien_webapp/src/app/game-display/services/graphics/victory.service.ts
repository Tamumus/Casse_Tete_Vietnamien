import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type GameStatus = 'none' | 'victory' | 'defeat';

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

  reset() {
    this.statusSubject.next('none');
  }
}