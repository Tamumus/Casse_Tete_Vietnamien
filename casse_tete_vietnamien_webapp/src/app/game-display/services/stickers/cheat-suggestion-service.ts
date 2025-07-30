import { Injectable } from '@angular/core';
import { CombinationCheatService,PartialCombination } from '../../../combination-display/combination-cheat.service';
import { CombinationService } from '../../../api/combination-calculation.service';

@Injectable({ providedIn: 'root' })
export class CheatSuggestionService {
  private suggestionTimer: any = null;
  private sticker: any | null = null;
  private zones: any[] = [];

  private suggestionDelayMs = 3000; // 3ms delay before this kicks in

  constructor(
    private cheatService: CombinationCheatService,
    private combinationService: CombinationService
  ) {}

 startSuggestionTimer(sticker: any, zones: any[]): void {
  this.cancelSuggestionTimer();

  this.sticker = sticker;
  this.zones = zones;

  this.suggestionTimer = setTimeout(() => {
    if (!this.cheatService.hasSolutions()) {
      this.combinationService.getAllSolutions().subscribe({
        next: (solutions) => {
          this.cheatService.setSolutions(solutions);
          this.trySuggestPosition();
        },
        error: (err) => {
          //We don't give feedback to not flood the console..tbh, I could set a flag at the init of the front that checks if the DB is up to handle that..
          // buuut...I do feel it's out of scope for the project
          this.cancelSuggestionTimer(); // stop timer
          this.sticker = null; // forget stuff
          this.zones = []; //reset the zones
        }
      });
    } else {
      this.trySuggestPosition();
    }
  }, this.suggestionDelayMs);
}

  cancelSuggestionTimer(): void {
    if (this.suggestionTimer) {
      clearTimeout(this.suggestionTimer);
      this.suggestionTimer = null;
    }
  }

  private trySuggestPosition() {
    if (!this.sticker) return;

    console.log('Tentative de suggestion pour sticker', this.sticker.id);

    const currentPositions = this.getCurrentPositions();

    const suggestedPos = this.cheatService.suggestPositionForSticker(currentPositions, this.sticker.value);

    //debug IF
    if (suggestedPos !== null) {
    //   console.log(`Suggestion : placer le sticker à la position ${suggestedPos}`);
    } else {
    //   console.log('Aucune suggestion possible');
    }
  }

  private getCurrentPositions(): PartialCombination {
    return this.zones.map(zone => zone.stickerValue);
  }
}