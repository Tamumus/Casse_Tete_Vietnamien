import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sticker } from './sticker';

describe('Sticker', () => {
  let component: Sticker;
  let fixture: ComponentFixture<Sticker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sticker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sticker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
