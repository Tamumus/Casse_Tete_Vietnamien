import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombinationDTO } from '../models/combination-dto.model'; 

@Injectable({ providedIn: 'root' })
export class CombinationCheckerService {
  private baseUrl = 'http://localhost:8080/api/combinations'; 

  constructor(private http: HttpClient) {}

  // Send the DTO for checking to the back. I *know* I could use a fitler front wise liek I do to filter the combis and cheat, but I want to show I can do it via the back
  checkCombination(dto: CombinationDTO): Observable<{ message: string }> {
    console.log("Appel API check avec DTO :", dto);
  return this.http.post<{ message: string }>(`${this.baseUrl}/check`, dto);
}
}