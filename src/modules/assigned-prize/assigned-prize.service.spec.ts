import { Test, TestingModule } from '@nestjs/testing';
import { AssignedPrizeService } from './assigned-prize.service';

describe('AssignedPrizeService', () => {
  let service: AssignedPrizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignedPrizeService],
    }).compile();

    service = module.get<AssignedPrizeService>(AssignedPrizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
