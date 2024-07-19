import { Component, Inject, OnInit, signal } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saving-course',
  templateUrl: './saving-course.component.html',
  styleUrls: ['./saving-course.component.scss'],
})
export class SavingCourseComponent implements OnInit {
  errorMessage = signal('');
  currentId: number = 0;

  constructor(
    private toaster: ToastrService,
    private router: Router,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public res: any
  ) {
    this.courseArray = [];
    debugger;
    if (res.id != null) {
      this.currentId = res.id;
      if (this.currentId !== 0) {
        let localDataStoarge = JSON.parse(
          localStorage.getItem('courseDetails') || ''
        );
        const currentRecord = localDataStoarge.find(
          (m: any) => m.id == this.currentId
        );
        if (currentRecord !== undefined) {
          this.courseDetailsObj = currentRecord;
        }
      }
    }
  }

  formDetails = this._fb.group({
    course: ['', [Validators.required]],
    time: ['', [Validators.required]],
  });

  courseDetailsObj: any = {
    id: 1,
    courseName: '',
    duration: '',
  };

  courseArray: any[] = [];
  ngOnInit(): void {
    const localData = localStorage.getItem('courseDetails');

    if (localData !== null) {
      this.courseArray = JSON.parse(localData);
    }
  }

  generateUniqueId(): number {
    const randomNum = Math.floor(Math.random() * 1000);
    return randomNum;
  }

  cancel() {
    this.dialog.closeAll();
  }

  getControl(name: any): AbstractControl | null {
    return this.formDetails.get(name);
  }

  register() {
    const localData = localStorage.getItem('courseDetails');

    let obj: any = {
      id: 1,
      courseName: '',
      duration: '',
    };

    console.log('checking', this.formDetails.controls.course.value);
    console.log('Checking', this.formDetails.controls.time.value);
    obj.courseName = this.formDetails.value.course;
    obj.duration = this.formDetails.value.time;

    if (localData == null) {
      this.courseArray = [obj];
      localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
    } else {
      const parseData = JSON.parse(localData);
      obj.id = this.generateUniqueId();
      this.courseArray = parseData;
      this.courseArray.push(obj);
      localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
    }

    location.reload();
    this.toaster.success('success', 'Successfully Saved');
    this.cancel();
  }

  update() {
    const currentRecord = this.courseArray.find((m) => m.id == this.currentId);

    if (currentRecord != undefined) {
      const index = this.courseArray.findIndex((m) => m.id == this.currentId);
      this.courseArray.splice(index, 1);
      this.courseArray.push(this.courseDetailsObj);
      localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
      this.toaster.success('success', 'Successfully Updated!');
      this.router.navigate(['feature/user/course/addcourse']);
      this.cancel()
    }
  }

  updateErrorMessage() {
    if (this.formDetails.controls.course.hasError('required')) {
      this.errorMessage.set("Course Name is required");
    }
    else if (this.formDetails.controls.time.hasError('required')) {
      this.errorMessage.set("Time field is requied");
    }
    else {
      this.errorMessage.set('');
    }
  }
}
