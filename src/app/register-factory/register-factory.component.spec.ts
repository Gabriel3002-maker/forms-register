import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFactoryComponent } from './register-factory.component';

describe('RegisterFactoryComponent', () => {
  let component: RegisterFactoryComponent;
  let fixture: ComponentFixture<RegisterFactoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFactoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterFactoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
