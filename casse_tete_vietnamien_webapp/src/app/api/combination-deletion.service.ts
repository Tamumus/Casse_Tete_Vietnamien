import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CombinationDeletionService {
  private baseUrl = 'http://localhost:8080/api/combinations';

  constructor(private http: HttpClient) {}

  //DEL a combi based on the ID
  deleteCombination(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  //Custom API endpoint. Basically, we delete via the common DEL + reset the ID via a query
  clearAllAndResetIds(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/full-reset`);
  }
}