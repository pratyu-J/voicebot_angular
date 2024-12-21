import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextbotComponent } from './textbot.component';

describe('TextbotComponent', () => {
  let component: TextbotComponent;
  let fixture: ComponentFixture<TextbotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextbotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextbotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
