import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private toaster: ToastrService
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

      const info = JSON.parse(localStorage.getItem('details') || '');

      let mail = info[0].email;
      let pass = info[0].password;

      if (
        this.loginDetails.value.email === mail &&
        this.loginDetails.value.password === pass
      ) {

        localStorage.setItem(
          'Bearer',
          'jfkdf343jkd2332kjdkjfd343e434jjf34434lkjfdjsfj'
        );
        this.toaster.success('success', 'Successfully Login');
        this._router.navigate(['feature/']);

      } else {
        this.toaster.warning('warning', 'Wrong Email/Password');
      }

    } else {

      this.loginDetails.markAllAsTouched();

    }
  }

  togglePasswordVisibility() {
    this.eyeOpen = !this.eyeOpen;
  }
}
