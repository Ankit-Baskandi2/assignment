import { CanActivateFn } from '@angular/router';

export const loginValidateGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('Bearer')) {
    return true;
  }
  return false;
};
