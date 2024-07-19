import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { SavingCourseComponent } from '../saving-course/saving-course.component';

@Component({
  selector: 'app-addcourse',
  templateUrl: './addcourse.component.html',
  styleUrls: ['./addcourse.component.scss'],
})
export class AddcourseComponent implements OnInit {
  @ViewChild('deleteDialog') deleteDialog!: TemplateRef<any>;

  constructor(
    private dialog: MatDialog,
    private toaster: ToastrService
  ) { }

  courseArray: any[] = [];
  addCourse() {
    this.dialog.open(SavingCourseComponent, { data: { id: 0 } });
  }

  ngOnInit(): void {

    const localData = localStorage.getItem('courseDetails');

    if (localData !== null) {
      this.courseArray = JSON.parse(localData);
    }
  }

  edit(id: number) {
    // this.router.navigate(['feature/user/course/savecourse', id]);
    this.dialog.open(SavingCourseComponent, { data: { id: id } })
  }

  delete(id: number) {
    let dialogRef = this.dialog.open(this.deleteDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        const index = this.courseArray.findIndex((m) => m.id == id);
        this.courseArray.splice(index, 1);
        localStorage.setItem('courseDetails', JSON.stringify(this.courseArray));
        this.toaster.success('success', 'Successfully Deleted!');

      }
    })
  }
}
