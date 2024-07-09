import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterationService {
  constructor(private http: HttpClient) {}

  loginCheck(data: any): Observable<any> {
    return this.http.post(
      'https://localhost:7047/api/UserSignUp/UserValidation',
      data
    );
  }
}
