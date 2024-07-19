import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterationService {
  constructor(private http: HttpClient) {}

  private loading = new BehaviorSubject<boolean>(false);
  isLoading = this.loading.asObservable();

  show() {
    this.loading.next(true);
  }

  hide() {
    this.loading.next(false);
  }

  loginCheck(data: any): Observable<any> {
    this.show();
    return this.http
      .post('https://localhost:7047/api/UserSignUp/UserValidation', data)
      .pipe(
        finalize(() => {
          this.hide();
        })
      );
  }

  saveSignUpDetails(data: any): Observable<any> {
    this.show();
    return this.http
      .post('https://localhost:7047/api/UserSignUp/SavingSignUpDetails', data)
      .pipe(
        finalize(() => {
          this.hide();
        })
      );
  }
}
