import { Test, TestingModule } from '@nestjs/testing';
import { AssignedPrizeController } from './assigned-prize.controller';
import { AssignedPrizeService } from './assigned-prize.service';

describe('AssignedPrizeController', () => {
  let controller: AssignedPrizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignedPrizeController],
      providers: [AssignedPrizeService],
    }).compile();

    controller = module.get<AssignedPrizeController>(AssignedPrizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
