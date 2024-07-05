import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginValidateGuard } from './AuthGuard/login-validate.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth-module/auth-module.module').then(
        (m) => m.AuthModuleModule
      ),
  },
  {
    path: 'feature',
    loadChildren: () =>
      import('./users/users.module').then((m) => m.UsersModule),
    canActivate: [loginValidateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
