import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { Tournament } from '../tournament/entities/tournament.entity';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class ResultService {

  constructor(
    @InjectRepository(Result)
    private resultRepository: Repository<Result>,
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const tournament = await this.tournamentRepository.findOneBy({id: createResultDto.tournamentId});
    if (!tournament) {
      throw new NotFoundException(`Tournament with ID ${createResultDto.tournamentId} not found`);
    }

    const winner = await this.playerRepository.findOneBy({id: createResultDto.winnerId});
    if (!winner) {
      throw new NotFoundException(`Winner with ID ${createResultDto.winnerId} not found`);
    }

    const loser = await this.playerRepository.findOneBy({id: createResultDto.loserId});
    
    if (!loser) {
      throw new NotFoundException(`Loser with ID ${createResultDto.loserId} not found`);
    }
  

    const result = this.resultRepository.create({
      ...createResultDto,
      tournament: tournament,
      winner: winner,
      loser: loser,
    });

    

    return await this.resultRepository.save(result);
    
}

  async findAll() {
    return await this.resultRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
