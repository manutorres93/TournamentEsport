import { Module } from '@nestjs/common';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Tournament])
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
