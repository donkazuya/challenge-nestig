import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCounterComponent } from './input-counter.component';

describe('InputCounterComponent', () => {
  let component: InputCounterComponent;
  let fixture: ComponentFixture<InputCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
