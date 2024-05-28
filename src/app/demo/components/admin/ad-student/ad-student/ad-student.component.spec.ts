import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdStudentComponent } from './ad-student.component';

describe('AdStudentComponent', () => {
  let component: AdStudentComponent;
  let fixture: ComponentFixture<AdStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdStudentComponent]
    });
    fixture = TestBed.createComponent(AdStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
