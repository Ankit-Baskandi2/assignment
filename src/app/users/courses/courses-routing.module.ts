import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { SavingCourseComponent } from './saving-course/saving-course.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'addcourse',
    pathMatch: 'full',
  },
  {
    path: 'addcourse',
    component: AddcourseComponent,
  },
  {
    path: 'savecourse/:id',
    component: SavingCourseComponent,
  },
  {
    path: 'savecourse',
    component: SavingCourseComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
