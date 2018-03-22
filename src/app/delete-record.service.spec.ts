import { TestBed, inject } from '@angular/core/testing';

import { DeleteRecordService } from './delete-record.service';

describe('DeleteRecordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeleteRecordService]
    });
  });

  it('should be created', inject([DeleteRecordService], (service: DeleteRecordService) => {
    expect(service).toBeTruthy();
  }));
});
