import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Question } from './question-module';
import { User } from './User';
import { UserResponseDTO } from './UserResponseDTO';


@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private apiUrl = 'http://Serviceapp-env.eba-9ssz2pm2.eu-north-1.elasticbeanstalk.com/api/crt/questions';
  private loginUrl = 'http://Serviceapp-env.eba-9ssz2pm2.eu-north-1.elasticbeanstalk.com/api/crt/user/login';
  private registerUrl='http://Serviceapp-env.eba-9ssz2pm2.eu-north-1.elasticbeanstalk.com/api/crt/user/register'
  private userResUrl='http://Serviceapp-env.eba-9ssz2pm2.eu-north-1.elasticbeanstalk.com/api/crt/response/save';
 private baseUrl='http://Serviceapp-env.eba-9ssz2pm2.eu-north-1.elasticbeanstalk.com/api/crt/response'
  constructor(private http: HttpClient) {}

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/${id}`);
  }

  getFirstQuestion(): Observable<Question> {
    return this.getQuestionById(1); // Assuming the first question always has an ID of 1
  }
  loginUser(userName: string, password: string): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { userName, password };

    return this.http.post<any>(this.loginUrl, body, { headers, observe: 'response' })
      .pipe(
        map(response => {
          const token = response.body?.token; // Assuming token is returned in the body
          if (token) {
            localStorage.setItem('token', token); // Store token in localStorage
          }
          return token; // Return the token
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }


  submitQuestion(questionData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Assuming you need to send cookies for authentication
    return this.http.post<any>(this.userResUrl, questionData, { headers, withCredentials: true });
  }
  
  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }

   // Method to save multiple user responses
   saveUserResponses(responses: UserResponseDTO[]): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/saveList`, responses);
  }
}
