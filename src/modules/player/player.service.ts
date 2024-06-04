import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Tournament } from '../tournament/entities/tournament.entity';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {

  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    
  ) {}

  
  async create(createPlayerDto: CreatePlayerDto) {
    const tournament = await this.tournamentRepository.findOneBy({name: createPlayerDto.tournamentName});
    if (!tournament) {
      throw new BadRequestException('Author not found');
    }
    const book = this.playerRepository.create({ ...createPlayerDto, tournament });
    return this.playerRepository.save(book);
  }

  findAll() {
    return `This action returns all player`;
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
