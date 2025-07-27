import { TestBed } from '@angular/core/testing';

import { StickerDrag } from './sticker-drag.service';

describe('StickerDrag', () => {
  let service: StickerDrag;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StickerDrag);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
