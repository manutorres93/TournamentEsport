import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class TournamentService {

  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,

    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    
  ) {}

  async create(createTournamentDto: CreateTournamentDto): Promise<Tournament> {
    const player = await this.playerRepository.findOneBy({name: createTournamentDto.playerName});
    if (!player) {
      throw new BadRequestException('Player not found');
    }
    const tournament = this.tournamentRepository.create(createTournamentDto);
    tournament.players = [player];
    return this.tournamentRepository.save(tournament);
  }

  async findAll() {
    return await this.tournamentRepository.find();
  }

 async findOne(id: number) {
  const tournament = await this.tournamentRepository.findOneBy( { id });
  if (!tournament) {
    throw new NotFoundException(`Tournament with ID ${id} not found`);
  }
  return tournament;
  }

  async update(id: number, updateTournamentDto: UpdateTournamentDto) {
    const tournament = await this.tournamentRepository.findOneBy({ id });
  if (!tournament) {
    throw new NotFoundException(`Tournament with ID ${id} not found`);
  }

  const updatedTournament = { ...updateTournamentDto };

  if (updateTournamentDto.playerName) {
    const newPlayers = await this.playerRepository.findOneBy({
      name: updateTournamentDto.playerName
    });

    if (!newPlayers) {
      throw new BadRequestException('Player not found');
    }
    tournament.players.push(newPlayers); // Add new players to the existing ones
  }

  // Update other tournament properties as needed

    return this.tournamentRepository.save(tournament);
  }

  remove(id: number) {
    return `This action removes a #${id} tournament`;
  }
}
