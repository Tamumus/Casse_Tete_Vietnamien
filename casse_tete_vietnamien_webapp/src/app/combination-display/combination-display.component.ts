import { Component } from '@angular/core';
import { JsonPipe, CommonModule } from '@angular/common';
import { CombinationService } from '../api/combination-calculation.service';
import { Combination } from '../api/combination-calculation.service';
import { CombinationDeletionService } from '../api/combination-deletion.service';

@Component({
  selector: 'app-combination-display',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './combination-display.component.html',
  styleUrls: ['./combination-display.component.css']
})
export class CombinationDisplayComponent {
  calculationMessage: string = '';
  solutions: Combination[] = [];

  constructor(private combinationService: CombinationService,private combinationDeletionService: CombinationDeletionService) {}

  onSolveButtonClick(): void {
    this.calculationMessage = 'Calcul en cours...';
    this.solutions = [];

    this.combinationService.generateCombination().subscribe({
      next: (message) => {
        this.calculationMessage = message;

        this.combinationService.getAllSolutions().subscribe({
          next: (solutions) => {
            this.solutions = solutions;
          },
          error: () => {
            this.calculationMessage = 'Erreur lors de la récupération des solutions.';
          }
        });
      },
      error: () => {
        this.calculationMessage = 'Erreur lors du calcul des solutions.';
      }
    });
  }
    onDeleteCombination(id: number): void {
    this.combinationDeletionService.deleteCombination(id).subscribe({
      next: () => {
        this.solutions = this.solutions.filter(c => c.id !== id);
      },
      error: () => console.error('Erreur suppression combinaison ID', id)
    });
    
  }
}