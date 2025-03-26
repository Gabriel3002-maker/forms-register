import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterCarriesComponent } from './register-carries.component';

describe('RegisterCarriesComponent', () => {
  let component: RegisterCarriesComponent;
  let fixture: ComponentFixture<RegisterCarriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterCarriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterCarriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
