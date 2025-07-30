import { Injectable } from '@angular/core';
import { CombinationModel } from '../combination-display/combination-model';
import { BehaviorSubject } from 'rxjs';

//IMPORTANT: Cheat mode will tell you what tile to put your sticker on..if the DB was loaded.
//if you want to cheat, do it right. It's too late in the project for such a big change to the API management and DB
export type PartialCombination = (number | null | undefined)[];

@Injectable({
  providedIn: 'root'
})
export class CombinationCheatService {

  private solutions: CombinationModel[] = [];
  private suggestedZoneSubject = new BehaviorSubject<number | null>(null);
    suggestedZone$ = this.suggestedZoneSubject.asObservable();

  constructor() {}

  //Load the solutions from the API (if the user generated them)
  setSolutions(solutions: CombinationModel[]): void {
    this.solutions = solutions;
  }

  //so we do nothing if the user didn't gen the combis yet. Either you cheat or you don't!
  hasSolutions(): boolean {
    return this.solutions.length > 0;
  }

  //Filter the possible combis based on what's on the board
  filterSolutions(currentPositions: PartialCombination): CombinationModel[] {
    if (!this.hasSolutions()) {
      return [];
    }
    return this.solutions.filter(sol => {
      const vals = [
        sol.x1, sol.x2, sol.x3,
        sol.x4, sol.x5, sol.x6,
        sol.x7, sol.x8, sol.x9
      ];
      return currentPositions.every((val, idx) => {
        if (val === null || val === undefined) return true;
        return vals[idx] === val;
      });
    });
  }

  //Check the filtered list. What position is the sticker most common at?
  suggestPositionForSticker(currentPositions: PartialCombination, stickerValue: number): number | null {
    if (!this.hasSolutions()) {
      return null;
    }
    const filtered = this.filterSolutions(currentPositions);

    const counts = Array(9).fill(0);
    filtered.forEach(sol => {
      const vals = [
        sol.x1, sol.x2, sol.x3,
        sol.x4, sol.x5, sol.x6,
        sol.x7, sol.x8, sol.x9
      ];
      vals.forEach((v, idx) => {
        if ((currentPositions[idx] === null || currentPositions[idx] === undefined) && v === stickerValue) {
          counts[idx]++;
        }
      });
    });

    let maxCount = 0;
    let suggestedPos: number | null = null;
    counts.forEach((count, idx) => {
      if (count > maxCount) {
        maxCount = count;
        suggestedPos = idx;
      }
    });

    this.suggestedZoneSubject.next(suggestedPos);
    return suggestedPos;
  }
  
}