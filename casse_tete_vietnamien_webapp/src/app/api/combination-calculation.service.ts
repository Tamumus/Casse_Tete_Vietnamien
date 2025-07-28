import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Combination {
  id: number;
  numbers: string; // adapte selon ta définition réelle (string[] ou autre)
}

@Injectable({
  providedIn: 'root'
})
export class CombinationService {
  private baseUrl = 'http://localhost:8080/api/combinations';

  constructor(private http: HttpClient) {}

  generateCombination(): Observable<string> {
    return this.http.post(this.baseUrl + '/generate', null, { responseType: 'text' });
  }

  getAllSolutions(): Observable<Combination[]> {
    return this.http.get<Combination[]>(this.baseUrl);
  }
}