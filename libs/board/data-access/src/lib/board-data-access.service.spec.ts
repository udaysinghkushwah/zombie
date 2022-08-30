import { TestBed } from '@angular/core/testing';
import { BoardDataAccessService } from './board-data-access.service';

describe('BoardDataAccessService', () => {
  let service: BoardDataAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardDataAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
