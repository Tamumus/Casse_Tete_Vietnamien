import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDisplayComponent } from './game-display';

describe('GameDisplay', () => {
  let component: GameDisplayComponent;
  let fixture: ComponentFixture<GameDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
