import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavingCourseComponent } from './saving-course.component';

describe('SavingCourseComponent', () => {
  let component: SavingCourseComponent;
  let fixture: ComponentFixture<SavingCourseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavingCourseComponent]
    });
    fixture = TestBed.createComponent(SavingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
