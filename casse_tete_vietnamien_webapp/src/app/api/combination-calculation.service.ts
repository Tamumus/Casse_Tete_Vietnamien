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
  //send a POST to the API part that will start the solving algo and fil the DB
  generateCombination(): Observable<string> {
    return this.http.post(this.baseUrl + '/generate', null, { responseType: 'text' });
  }

  //send a GET to the Json object containing all the combs
  getAllSolutions(): Observable<CombinationModel[]> {
    return this.http.get<CombinationModel[]>(this.baseUrl);
  }
}