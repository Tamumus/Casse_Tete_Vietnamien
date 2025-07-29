import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CombinationService } from '../api/combination-calculation.service';
import { CombinationDeletionService } from '../api/combination-deletion.service';
import { CombinationModel } from './combination-model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-combination-display',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './combination-display.component.html',
  styleUrls: ['./combination-display.component.css']
})
export class CombinationDisplayComponent {
  calculationMessage: string = '';
  solutions: CombinationModel[] = [];

  // Tableau des 9 filtres, null = pas de filtre sur cette position
  filterPositions: (number | null)[] = Array(9).fill(null);

  // Liste des chiffres possibles
  numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(
    private combinationService: CombinationService,
    private combinationDeletionService: CombinationDeletionService
  ) {}

  onSolveButtonClick(): void {
    this.calculationMessage = 'Calcul en cours...';
    this.solutions = [];

    this.combinationService.generateCombination().subscribe({
      next: (message) => {
        this.calculationMessage = message;
        this.combinationService.getAllSolutions().subscribe({ //go check the ednpoitnt hat contains the whole DB
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

  onDeleteAll(): void {
    this.combinationDeletionService.clearAllAndResetIds().subscribe({
      next: () => {
        this.solutions = [];
        console.log('Suppression réussie');
      },
      error: (err) => {
        console.error('Erreur lors de la suppression complète et reset des IDs.', err);
      }
    });
  }

  parseValues(numbers: string): number[] {
    return numbers.split(',').map(val => Number(val));
  }

  getValuesArray(sol: CombinationModel): number[] {
    return [
      sol.x1, sol.x2, sol.x3,
      sol.x4, sol.x5, sol.x6,
      sol.x7, sol.x8, sol.x9
    ];
  }

  // Retourne la liste des valeurs disponibles pour le select i, en excluant celles déjà choisies ailleurs
  getAvailableNumbersForPosition(index: number): (number | null)[] {
    const usedNumbers = this.filterPositions
      .filter((val, i) => val !== null && i !== index) as number[];
    return [null, ...this.numbers.filter(n => !usedNumbers.includes(n))];
  }

  // Filtre les solutions selon les valeurs choisies dans filterPositions
  getFilteredSolutions(): CombinationModel[] {
    return this.solutions.filter(sol => {
      const vals = this.getValuesArray(sol);
      return this.filterPositions.every((filterVal, idx) => {
        if (filterVal === null) return true;
        return vals[idx] === filterVal;
      });
    });
  }
}