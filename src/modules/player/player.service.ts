import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Tournament } from '../tournament/entities/tournament.entity';
import { Player } from './entities/player.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';

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

  async findByName(playerName: string) {

    const player = await this.playerRepository.find( {where: {name: playerName}} )    
    
    return player
  }


  async findByNameIlike(playerName: string) {

    const player = await this.playerRepository.find( {where: {name:  ILike(`%${playerName}%`)}} )    
    
    return player
  }

  async findByTermColumn(playerName: string, columnName: string){

    const player = await this.playerRepository.find( {where: {[columnName]:  ILike(`%${playerName}%`)}} )    
    
    return player
  }

  async findAllPaginated(page: number, pageSize: number, orderBy: string, order:'ASC' | 'DESC'){

    const player = await this.playerRepository.find({ 
      order: { [orderBy]: order },
      skip:(page - 1) * pageSize , 
      take:pageSize,
    },
      
      
      )    
    
    return player
  }

  async findByTermPaginated(searchTerm: string,columnName: string,
    page: number, pageSize: number, 
    orderBy: string, order:'ASC' | 'DESC'){

      const [result, total] = await this.playerRepository.findAndCount({
      where: {
        [columnName]: ILike(`%${searchTerm}%`)}, 
      order: { [orderBy]: order },
      take:pageSize,
      skip:(page - 1) * pageSize , 
    },
      
      
      )    
    
      return {
        data: result,
        total,
        page,
        pageCount: Math.ceil(total / pageSize)
      };
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
