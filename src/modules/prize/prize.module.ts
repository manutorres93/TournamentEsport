import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prize } from './entities/prize.entity';
import { PlayerModule } from '../player/player.module';
import { AssignedPrizeModule } from '../assigned-prize/assigned-prize.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Prize]), PlayerModule, AssignedPrizeModule
    
  ],
  controllers: [PrizeController],
  providers: [PrizeService],
  exports:[TypeOrmModule]
})
export class PrizeModule {}
