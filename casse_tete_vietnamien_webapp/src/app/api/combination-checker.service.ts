import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CombinationDTO } from '../models/combination-dto.model'; 

@Injectable({ providedIn: 'root' })
export class CombinationCheckerService {
  private baseUrl = 'http://localhost:8080/api/combinations'; 

  constructor(private http: HttpClient) {}

  // Send the DTO for checking
  checkCombination(dto: CombinationDTO): Observable<{ message: string }> {
    console.log("Appel API check avec DTO :", dto);
  return this.http.post<{ message: string }>(`${this.baseUrl}/check`, dto);
}
}