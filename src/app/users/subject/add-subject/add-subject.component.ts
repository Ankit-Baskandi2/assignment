import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SavingSubjectComponent } from '../saving-subject/saving-subject.component';
// import { MatconformdialogComponent } from 'src/app/mat/matconformdialog/matconformdialog.component';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
})
export class AddSubjectComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;
  constructor(
    private dialog: MatDialog,
    private toaster: ToastrService
  ) {}

  courseArray: any[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('subjectDetails');

    if (localData !== null) {
      this.courseArray = JSON.parse(localData);
    }
  }

  addCourse() {
    // debugger;
    this.dialog.open(SavingSubjectComponent, { data: { id: 0 } });
  }

  delete(id: any) {
    let dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.courseArray.findIndex((m) => m.id == id);
        this.courseArray.splice(index, 1);
        localStorage.setItem(
          'subjectDetails',
          JSON.stringify(this.courseArray)
        );
        this.toaster.success('success', 'Successfully Deleted!');
      }
    })
  }

  edit(id: any) {
    this.dialog.open(SavingSubjectComponent, { data: { id: id } });
  }
}
