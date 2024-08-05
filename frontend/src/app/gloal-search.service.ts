import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SearchOption {
  name: string,
  ticker: string,
}

@Injectable({
  providedIn: 'root'
})
export class GloalSearchService {
  private apiUrl = 'https://api.example.com/portfolio';
  constructor(private http: HttpClient) { }

  searchInstruments(term: string | null): Observable<SearchOption[]> {
    return this.http.get<SearchOption[]>(`${this.apiUrl}?search=${term}`);
  }
}
