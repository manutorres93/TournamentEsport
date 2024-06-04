import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { TournamentModule } from '../tournament/tournament.module';
import { TournamentService } from '../tournament/tournament.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Player]),
     /* TournamentModule  */
  ],
  controllers: [PlayerController],
  providers: [PlayerService], 
  exports:[TypeOrmModule]
})
export class PlayerModule {}
