import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesAbonnementsComponent } from './mes-abonnements.component';

describe('MesAbonnementsComponent', () => {
  let component: MesAbonnementsComponent;
  let fixture: ComponentFixture<MesAbonnementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MesAbonnementsComponent]
    });
    fixture = TestBed.createComponent(MesAbonnementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
