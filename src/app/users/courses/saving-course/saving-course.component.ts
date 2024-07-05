import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddcourseComponent } from '../addcourse/addcourse.component';

@Component({
  selector: 'app-saving-course',
  templateUrl: './saving-course.component.html',
  styleUrls: ['./saving-course.component.scss'],
})
export class SavingCourseComponent implements OnInit {
  cancel() {
    this.dialog.closeAll();
  }
  currentId: number = 0;

  constructor(
    private activateroute: ActivatedRoute,
    private toaster: ToastrService,
    private router: Router,
    private _fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.courseArray = [];
    this.activateroute.params.subscribe((res: any) => {
      // debugger;
      if (res.id) {
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
    });
  }

  formDetails = this._fb.group({
    course: ['', []],
    time: ['', []],
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

  register() {
    debugger;
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
    // this.router.navigate(['feature/user/course/addcourse']);
    this.toaster.success('success', 'Successfully Saved');
    this.cancel();
  }

  update() {
    // debugger;
    const currentRecord = this.courseArray.find((m) => m.id == this.currentId);

    if (currentRecord != undefined) {
      const index = this.courseArray.findIndex((m) => m.id == this.currentId);
      this.courseArray.splice(index, 1);
      this.courseArray.push(this.courseDetailsObj);
      localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
      this.toaster.success('success', 'Successfully Updated!');
      this.router.navigate(['feature/user/course/addcourse']);
    }
  }
}
