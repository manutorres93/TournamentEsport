import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerModule } from '../player/player.module';
import { TournamentModule } from '../tournament/tournament.module';
import { Result } from './entities/result.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Result]),
    PlayerModule, TournamentModule
  ],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [TypeOrmModule]
})
export class ResultModule {}
