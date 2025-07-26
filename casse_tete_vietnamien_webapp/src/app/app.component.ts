import { Component, OnInit } from '@angular/core';
import { Combination, CombinationService } from './services/combination';
import { CommonModule } from '@angular/common'; 
import { GameDisplayComponent } from './game-display/game-display';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameDisplayComponent],
  styleUrls: ['app.component.css'],
  //background will be the..background, stickers the interactive tiles, comibinations are a WIP while I code
  template: `
    <app-game-display></app-game-display>
    <div class="combinations">
      <div *ngIf="combinations.length > 0; else noData">
        <h2>Combinaisons :</h2>
        <ul>
          <li *ngFor="let combo of combinations">
            ID {{ combo.id }} : {{ combo.numberList.join(', ') }}
          </li>
        </ul>
      </div>
      <ng-template #noData>
        <p>Aucune combinaison trouvée.</p>
      </ng-template>
    </div>

  <button class="button" (click)="generateNewCombination()">➕ Générer</button>
  
  `
})
export class AppComponent {
  combinations: { id?: number; numberList: number[] }[] = [];

  constructor(private combinationService: CombinationService) {}

  ngOnInit(): void {
    this.combinationService.getCombinations().subscribe((data: Combination[]) => {
      this.combinations = data.map(c => ({
        id: c.id,
        numberList: typeof c.numbers === 'string'
          ? c.numbers.split(',').map(Number)
          : []
      }));
    });
  }

  generateNewCombination(): void {
    this.combinationService.generateCombination().subscribe(newCombo => {
      this.combinations.push({
        id: newCombo.id,
        numberList: typeof newCombo.numbers === 'string'
          ? newCombo.numbers.split(',').map(Number)
          : []
      });
    });
  }
}