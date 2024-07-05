import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { MatconformdialogComponent } from 'src/app/mat/matconformdialog/matconformdialog.component';
import { SavingCourseComponent } from '../saving-course/saving-course.component';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss'],
})
export class AddcourseComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toaster: ToastrService
  ) { }

  courseArray: any[] = [];
  addCourse() {
    this.dialog.open(SavingCourseComponent, {});
  }

  ngOnInit(): void {

    const localData = localStorage.getItem('courseDetails');

    if (localData !== null) {
      this.courseArray = JSON.parse(localData);
    }
  }

  edit(id: number) {
    this.router.navigate(['feature/user/course/savecourse', id]);
  }

  delete(id: number) {
    // const dialogRef = this.dialog.open(MatconformdialogComponent, {
    //   data: {
    //     message: 'Are you sure want to delete?',
    //     buttonText: {
    //       ok: 'yes',
    //       cancel: 'No',
    //     },
    //   },
    // });

    let dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const index = this.courseArray.findIndex((m) => m.id == id);
        this.courseArray.splice(index, 1);
        localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
        this.toaster.success('success', 'Successfully Deleted!');

      }
    })

    // dialogRef.afterClosed().subscribe((confirmed: boolean) => {

    //   if (confirmed) {

    //     const index = this.courseArray.findIndex((m) => m.id == id);
    //     this.courseArray.splice(index, 1);
    //     localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
    //     this.toaster.success('success', 'Successfully Deleted!');

    //   }
    // });


  }
}
