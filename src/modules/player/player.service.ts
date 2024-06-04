import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Tournament } from '../tournament/entities/tournament.entity';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PlayerService {

  constructor(
    /* @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>, */

    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    
  ) {}

  
  async create(createPlayerDto: CreatePlayerDto) {
    
    const player = this.playerRepository.create(createPlayerDto);

    /* if (createPlayerDto.tournamentName) {
      const tournament = await this.tournamentRepository.findOneBy({ name: createPlayerDto.tournamentName });
      if (!tournament) {
        throw new BadRequestException('Tournament not found');
      }
      player.tournaments = [tournament]; // Associate player with tournament
    } */


    return this.playerRepository.save(player);
  }

  async findAll() {
    return await this.playerRepository.find();
  }

  async findOne(id: number) {
    const player = await this.playerRepository.findOneBy( { id });
  if (!player) {
    throw new NotFoundException(`Tournament with ID ${id} not found`);
  }
  return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto) {
    const player= await this.playerRepository.findOneBy({id})
    this.playerRepository.merge(player, updatePlayerDto)
    return await this.playerRepository.save(player)
  }

  async remove(id: number) {
    return await this.playerRepository.softDelete({id})
  }
}
