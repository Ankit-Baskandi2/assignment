import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { SavingSubjectComponent } from './saving-subject/saving-subject.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'addsubject',
    pathMatch: 'full',
  },
  {
    path: 'addsubject',
    component: AddSubjectComponent,
  },
  // {
  //   path: 'savesubject/:id',
  //   component: SavingSubjectComponent,
  // },
  {
    path: 'savesubject',
    component: SavingSubjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectRoutingModule {}
