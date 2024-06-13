import { Module } from '@nestjs/common';
import { AssignedPrizeService } from './assigned-prize.service';
import { AssignedPrizeController } from './assigned-prize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedPrize } from './entities/assigned-prize.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([AssignedPrize]),
    
  ],
  controllers: [AssignedPrizeController],
  providers: [AssignedPrizeService],
})
export class AssignedPrizeModule {}
