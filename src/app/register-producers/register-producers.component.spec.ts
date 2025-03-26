import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterProducersComponent } from './register-producers.component';

describe('RegisterProducersComponent', () => {
  let component: RegisterProducersComponent;
  let fixture: ComponentFixture<RegisterProducersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterProducersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterProducersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
