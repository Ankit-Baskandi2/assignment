import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingSubjectComponent } from './saving-subject.component';

describe('SavingSubjectComponent', () => {
  let component: SavingSubjectComponent;
  let fixture: ComponentFixture<SavingSubjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingSubjectComponent]
    });
    fixture = TestBed.createComponent(SavingSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
