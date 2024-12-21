import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicebotComponent } from './voicebot.component';

describe('VoicebotComponent', () => {
  let component: VoicebotComponent;
  let fixture: ComponentFixture<VoicebotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoicebotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VoicebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
