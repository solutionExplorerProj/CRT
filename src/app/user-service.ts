import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from './question-module';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8990/crt/questions';

  constructor(private http: HttpClient) {}

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  getFirstQuestion(): Observable<Question> {
    return this.getQuestionById(1); // Assuming the first question always has an ID of 1
  }
}
