import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { PlayerModule } from '../player/player.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tournament]),PlayerModule
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
  exports:[TypeOrmModule]
})
export class TournamentModule {}
