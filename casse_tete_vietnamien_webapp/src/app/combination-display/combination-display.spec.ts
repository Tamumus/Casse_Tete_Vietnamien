import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinationDisplay } from './combination-display';

describe('CombinationDisplay', () => {
  let component: CombinationDisplay;
  let fixture: ComponentFixture<CombinationDisplay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CombinationDisplay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinationDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
