import { TestBed } from '@angular/core/testing';

import { TitleVisibilityService } from './title-visibility.service';

describe('TitleVisibilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TitleVisibilityService = TestBed.get(TitleVisibilityService);
    expect(service).toBeTruthy();
  });
});
