import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroText } from './intro-text';

describe('IntroText', () => {
  let component: IntroText;
  let fixture: ComponentFixture<IntroText>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroText]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroText);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
