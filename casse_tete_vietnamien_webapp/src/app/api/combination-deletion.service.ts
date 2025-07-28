import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CombinationDeletionService {
  private baseUrl = 'http://localhost:8080/api/combinations';

  constructor(private http: HttpClient) {}

  deleteCombination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  clearAllCombinations(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}`);
  }
}