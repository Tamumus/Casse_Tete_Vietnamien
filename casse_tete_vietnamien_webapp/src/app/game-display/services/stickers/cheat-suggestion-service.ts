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
          console.warn('Pas de solutions disponibles ou erreur chargement, arrêt de la suggestion', err);
          this.cancelSuggestionTimer(); // stoppe le timer et n'essaye plus
          this.sticker = null; // on "oublie" le sticker
          this.zones = [];
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

    if (suggestedPos !== null) {
      console.log(`Suggestion : placer le sticker à la position ${suggestedPos}`);
      // TODO: tu peux émettre un événement ou mettre à jour l'UI ici
    } else {
      console.log('Aucune suggestion possible');
    }
  }

  private getCurrentPositions(): PartialCombination {
    return this.zones.map(zone => zone.stickerValue);
  }
}