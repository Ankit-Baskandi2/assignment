import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { loginValidateGuard } from './login-validate.guard';

describe('loginValidateGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => loginValidateGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
