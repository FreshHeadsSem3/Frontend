import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DealService } from './deal.service';
import { Deal } from '../model/deal/deal';
import { Createmodel } from '../model/deal/createmodel';
import { EmailModel } from '../model/email-model';
import { RemoveParticipant } from '../model/remove-participant';

describe('DealService', () => {
  let service: DealService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DealService]
    });

    service = TestBed.inject(DealService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  

  
  // Add more tests for other functions...

});

