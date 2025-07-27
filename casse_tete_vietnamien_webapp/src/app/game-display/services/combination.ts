import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Combination {
  id: number;
  numbers: string; // <- ce champ doit être de type string
}

@Injectable({
  providedIn: 'root'
})
export class CombinationService {
  private apiUrl = 'http://localhost:8080/api/combinations';

  constructor(private http: HttpClient) {}

  getCombinations(): Observable<Combination[]> {
    return this.http.get<Combination[]>(this.apiUrl);
  }

  generateCombination(): Observable<Combination> {
  return this.http.post<Combination>(`${this.apiUrl}/generate`, {});
}
}