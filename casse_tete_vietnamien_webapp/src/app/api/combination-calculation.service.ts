import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombinationModel } from '../combination-display/combination-model';

@Injectable({
  providedIn: 'root'
})
export class CombinationService {
  private baseUrl = 'http://localhost:8080/api/combinations';

  constructor(private http: HttpClient) {}

  generateCombination(): Observable<string> {
    return this.http.post(this.baseUrl + '/generate', null, { responseType: 'text' });
  }

  getAllSolutions(): Observable<CombinationModel[]> {
    return this.http.get<CombinationModel[]>(this.baseUrl);
  }
}