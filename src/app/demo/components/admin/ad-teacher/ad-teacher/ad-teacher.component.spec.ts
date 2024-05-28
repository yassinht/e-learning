import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdTeacherComponent } from './ad-teacher.component';

describe('AdTeacherComponent', () => {
  let component: AdTeacherComponent;
  let fixture: ComponentFixture<AdTeacherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdTeacherComponent]
    });
    fixture = TestBed.createComponent(AdTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
