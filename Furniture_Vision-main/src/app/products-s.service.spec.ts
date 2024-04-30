import { TestBed } from '@angular/core/testing';

import { ProductsSService } from './products-s.service';

describe('ProductsSService', () => {
  let service: ProductsSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
