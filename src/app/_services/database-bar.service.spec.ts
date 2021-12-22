import { TestBed } from '@angular/core/testing';
import { DatabaseBarService } from './database-bar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('DatabaseBarService', () => {


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
  });
});
