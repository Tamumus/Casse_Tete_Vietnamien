import { Injectable } from '@angular/core';
import { CombinationCheckerService } from '../../../api/combination-checker.service';
import { VictoryService } from '../graphics/victory.service';

@Injectable({ providedIn: 'root' })
export class CombinationVerificationService {
  private zones: any[] = [];

  constructor(
    private checker: CombinationCheckerService,
    private victoryService: VictoryService
  ) {}

  initialize(zones: any[]) {
    this.zones = zones;
  }

  checkIfCompleteAndVerify() {
    if (this.zones.every(z => z.stickerValue !== null && z.stickerValue !== undefined)) {
      const dto: any = {
        x1: this.zones[0].stickerValue,
        x2: this.zones[1].stickerValue,
        x3: this.zones[2].stickerValue,
        x4: this.zones[3].stickerValue,
        x5: this.zones[4].stickerValue,
        x6: this.zones[5].stickerValue,
        x7: this.zones[6].stickerValue,
        x8: this.zones[7].stickerValue,
        x9: this.zones[8].stickerValue,
      };

      this.checker.checkCombination(dto).subscribe({
        next: (response) => {
          if (response && typeof response === 'object' && 'message' in response) {
            const message = response.message as string;

            if (message.includes('✅')) {
              this.victoryService.showVictory();
            } else if (message.includes('❌')) {
              this.victoryService.showDefeat();
            } else {
              console.warn('Message inattendu reçu:', message);
            }
          } else {
            console.warn('Réponse inattendue du backend:', response);
          }
        },
        error: (err) => {
          console.error('Erreur lors de la vérification de la combinaison', err);
        }
      });
    }
  }
}