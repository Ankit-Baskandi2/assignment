import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterationService } from '../authService/registeration.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  eyeOpen: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private toaster: ToastrService,
    private service: RegisterationService
  ) { }

  ngOnInit(): void { }

  loginDetails = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        ),
      ],
    ],
  });

  check(name: any): AbstractControl | null {
    return this.loginDetails.get(name);
  }

  displayingLoginDetails() {
    if (this.loginDetails.valid) {
      this.service.loginCheck(this.loginDetails.value).subscribe(
        {
          next: (res: any) => {
            if (res) {
              localStorage.setItem(
                'Bearer',
                'jfkdf343jkd2332kjdkjfd343e434jjf34434lkjfdjsfj'
              );
              this.toaster.success('Successfully Login', 'Success');
              this._router.navigate(['feature/']);
            }
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.toaster.error(
                'Unauthorized: Incorrect Email or Password',
                'Error'
              );
            } else {
              this.toaster.error('An error occurred. Please try again.', 'Error');
            }
          }
        }
      )
    } else {
      this.loginDetails.markAllAsTouched();
    }
  }

  togglePasswordVisibility() {
    this.eyeOpen = !this.eyeOpen;
  }
}
