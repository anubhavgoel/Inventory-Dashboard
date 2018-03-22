import { TestBed, inject } from '@angular/core/testing';

import { ProductDataServiceService } from './product-data-service.service';

describe('ProductDataServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductDataServiceService]
    });
  });

  it('should be created', inject([ProductDataServiceService], (service: ProductDataServiceService) => {
    expect(service).toBeTruthy();
  }));
});
