import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from 'src/app/loaderComponent/loader.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterationService {
  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  loginCheck(data: any): Observable<any> {
    this.loaderService.show();
    return this.http
      .post('https://localhost:7047/api/UserSignUp/UserValidation', data)
      .pipe(
        finalize(() => {
          this.loaderService.hide();
        })
      );
  }

  saveSignUpDetails(data: any): Observable<any> {
    this.loaderService.show();
    return this.http
      .post('https://localhost:7047/api/UserSignUp/SavingSignUpDetails', data)
      .pipe(
        finalize(() => {
          this.loaderService.hide();
        })
      );
  }
}
