import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CombinationDTO } from '../models/combination-dto.model'; 
import { VictoryService } from '../game-display/services/graphics/victory.service';

@Injectable({ providedIn: 'root' })
export class CombinationCheckerService {
  private baseUrl = 'http://localhost:8080/api/combinations'; 

  constructor(private http: HttpClient,
              private victoryService : VictoryService) 
              {}

  // Send the DTO for checking to the back. I *know* I could use a fitler front wise like I do to filter the combis and cheat, but I want to show I can do it via the back
  checkCombination(dto: CombinationDTO): Observable<{ message: string }> {
    console.log("Appel API check avec DTO :", dto);
  
    return this.http.post<{ message: string }>(`${this.baseUrl}/check`, dto).pipe(
    catchError(error => {
      console.error('Erreur API checkCombination, erreur remontée via VictoryService', error);
      this.victoryService.showError(); //I won't play fair if you don't boot the back. You're warned
      return of({ message: "Erreur API" }); 
    })
  );
  }
}
