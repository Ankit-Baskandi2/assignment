import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmedValiator } from 'src/app/confiremed.validator';
import { RegisterationService } from '../authService/registeration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isLoading = false;
  arr: any[] = [];
  eyeOpen: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _route: Router,
    private service: RegisterationService,
    private toaster: ToastrService
  ) {}

  country: any[] = [
    { id: 1, name: 'India' },
    { id: 2, name: 'USA' },
    { id: 3, name: 'JAPAN' },
    { id: 4, name: 'AUSTRALIA' },
  ];

  state: any[] = [
    { id: 1, name: 'Uttrakhand' },
    { id: 2, name: 'Tokyo' },
    { id: 3, name: 'California' },
  ];

  registerDetails: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.service.isLoading.subscribe((loading) => {
      this.isLoading = loading;
    });
    this.registerDetails = this._fb.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.email, Validators.required, Validators.maxLength(50)],],
        phoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        gender: [1, [Validators.required]],
        password: ['',[Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')],],
        conformPassword: ['', [Validators.required]],
      },
      { validator: ConfirmedValiator('password', 'conformPassword') }
    );
  }

  passwordMatch(password: string, conformPassword: string) {
    // debugger;
    return function (form: AbstractControl) {
      const passwordValue = form.get(password)?.value;
      const confirmPasswordValue = form.get(conformPassword)?.value;

      if (passwordValue === confirmPasswordValue) {
        return null;
      }
      return { passwordMismatchError: true };
    };
  }

  //Function to access form control from formGroup
  getControl(name: any): AbstractControl | null {
    return this.registerDetails.get(name);
  }

  get f() {
    return this.registerDetails.controls;
  }

  //Submit Funtion
  displayRegisterationData() {
    if (this.registerDetails.valid) {
      const formValue = { ...this.registerDetails.value };
      delete formValue.conformPassword;

      console.log(this.registerDetails.value);

      this.service.saveSignUpDetails(formValue).subscribe({
        next: (res: any) => {
          if (res.statusCode === 200) {
            this.toaster.success('Success', res.message);
            this._route.navigate(['auth/login']);
          } else {
            this.toaster.error('error', res.message);
          }
        },
        error: (error: any) => {
          this.toaster.error('error', error.message);
        },
      });
      //let data = this.registerDetails.value;
      //this.arr.push(data);
      //localStorage.setItem('details', JSON.stringify(this.arr));
      //this._route.navigate(['auth/login']);
    } else {
      this.registerDetails.markAllAsTouched();
    }
  }

  //input validation for firstName and lastName
  firstAndLastNameValidation(e: any) {
    return (
      (e.charCode >= 65 && e.charCode <= 90) ||
      (e.charCode >= 97 && e.charCode <= 122)
    );
  }

  //input validation for phone Number
  phoneValidation(e: any) {
    return e.charCode >= 48 && e.charCode <= 57;
  }

  togglePasswordVisibility() {
    this.eyeOpen = !this.eyeOpen;
  }
}
