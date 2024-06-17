import { forwardRef, Module } from '@nestjs/common';
import { AssignedPrizeService } from './assigned-prize.service';
import { AssignedPrizeController } from './assigned-prize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignedPrize } from './entities/assigned-prize.entity';
import { PrizeModule } from '../prize/prize.module';
import { PlayerModule } from '../player/player.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([AssignedPrize]), PlayerModule, forwardRef(() =>PrizeModule)
    
  ],
  controllers: [AssignedPrizeController],
  providers: [AssignedPrizeService],
  exports:[TypeOrmModule]
})
export class AssignedPrizeModule {}
