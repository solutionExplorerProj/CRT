import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient) { }

  getQuestions(filename: string): Observable<any[]> {
    return this.http.get<any[]>(`assets/${filename}`); // Use the filename to fetch the appropriate JSON file
  }
}
