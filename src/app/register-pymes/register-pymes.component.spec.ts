import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPymesComponent } from './register-pymes.component';

describe('RegisterPymesComponent', () => {
  let component: RegisterPymesComponent;
  let fixture: ComponentFixture<RegisterPymesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPymesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPymesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
