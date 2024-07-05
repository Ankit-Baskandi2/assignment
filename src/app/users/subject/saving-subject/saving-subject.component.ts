import { Component, Inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-saving-subject',
  templateUrl: './saving-subject.component.html',
  styleUrls: ['./saving-subject.component.scss'],
})
export class SavingSubjectComponent {

  errorMessage = signal('');

  currentId: number = 0;

  dataofCourse: any[] = [];

  constructor(
    private toaster: ToastrService,
    private _fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public res: any,
  ) {
    if (res.id != null) {

      this.currentId = res.id;
      if (this.currentId !== 0) {

        let localDataStoarge = JSON.parse(
          localStorage.getItem('subjectDetails') || ''
        );

        const currentRecord = localDataStoarge.find(
          (m: any) => m.id == this.currentId
        );

        if (currentRecord !== undefined) {

          this.subjectDetailsObj = currentRecord;
          console.log('subjectdetails :', this.subjectDetailsObj);
        }
      }
    }

    let courseDataFromLocalStoarge = JSON.parse(
      localStorage.getItem('courseDetails') || ''
    );
    this.dataofCourse = courseDataFromLocalStoarge;
  }

  formDetails = this._fb.group({
    courseName: ['', [Validators.required]],
    subjectName: ['', [Validators.required]],
    sem: ['', [Validators.required]],
    marks: ['', [Validators.required, Validators.maxLength(2)]],
  });

  cancel() {
    this.dialog.closeAll();
  }

  subjectDetailsObj: any = {
    id: 1,
    courseName: '',
    subjectName: '',
    seme: '',
    marks: '',
  };

  courseArray: any[] = [];
  ngOnInit(): void {
    const localData = localStorage.getItem('subjectDetails');

    if (localData !== null) {
      
      this.courseArray = JSON.parse(localData);
    }
  }

  generateUniqueId(): number {
    const randomNum = Math.floor(Math.random() * 1000);
    return randomNum;
  }

  register() {
    const localData = localStorage.getItem('subjectDetails');

    let obj: any = {
      id: 1,
      courseName: '',
      subjectName: '',
      semester: '',
      marks: '',
    };

    obj.courseName = this.formDetails.value.courseName;
    obj.subjectName = this.formDetails.value.subjectName;
    obj.semester = this.formDetails.value.sem;
    obj.marks = this.formDetails.value.marks;

    if (localData == null) {

      this.courseArray = [obj];
      localStorage.setItem('subjectDetails', JSON.stringify(this.courseArray));
    } else {

      const parseData = JSON.parse(localData);
      obj.id = this.generateUniqueId();
      this.courseArray = parseData;
      this.courseArray.push(obj);
      localStorage.setItem('subjectDetails', JSON.stringify(this.courseArray));
    }

    location.reload();
    this.toaster.success('success', 'Successfully Saved');
    this.cancel();
  }

  getControl(name: any): AbstractControl | null {
    return this.formDetails.get(name);
  }

  update() {
    let data: any[] = JSON.parse(
      localStorage.getItem('subjectDetails') || '[]'
    );
    
    const index = data.findIndex((m: any) => m.id === this.currentId);

    if (index !== -1) {
      data[index] = this.subjectDetailsObj;

      localStorage.setItem('subjectDetails', JSON.stringify(data));

      this.toaster.success('Success', 'Successfully Updated!');

      location.reload();

      this.cancel();
    } else {

      this.toaster.error('Error', 'Record not found!');
    }
  }

  updateErrorMessage() {
    if (this.formDetails.controls.subjectName.hasError('required')) {

      this.errorMessage.set('You Must Enter a value');
    }
    else if(this.formDetails.controls.marks.hasError('maxlength')){

      this.errorMessage.set('Max lenght of Marks should be 2 digit')
    }
    else {

      this.errorMessage.set('');
    }
  }
}
