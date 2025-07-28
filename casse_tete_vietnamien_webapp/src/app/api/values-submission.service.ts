import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Zone } from '../game-display/sticker/interactive-zone';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValueSubmissionService {

  private backendUrl = 'http://localhost:8080/api/zones'; // adapte cette URL à ton backend

  constructor(private http: HttpClient) {}

  submitValues(zones: Zone[]): Observable<any> {
    const payload = zones
      .filter(z => z.stickerValue !== null)
      .map(z => ({ id: z.id, value: z.stickerValue }));

    return this.http.post(this.backendUrl, payload);
  }
}