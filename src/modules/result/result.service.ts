import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ILike, Repository } from 'typeorm';
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

async findByParam(searchTerm: string, orderBy: string,
  order: 'ASC' | 'DESC',
  page: number,
  pageSize: number, columnName: string){
    try {

      const [result, total] = await this.resultRepository.findAndCount( {
        where: {
        [columnName]: ILike(`%${searchTerm}%`)},
        order: { [orderBy]: order },
        take: pageSize,
        skip: (page - 1) * pageSize,
     },);

     return {
      data: result,
      total,
      page,
      pageCount: Math.ceil(total / pageSize)
    };
      
    } catch (error) {
      throw new BadRequestException('Failed to find athletes with provided parameters', error.message);
      
    }
}

async findScores(){
  const results = await this.resultRepository.find(/* {
    select: ['id', 'winnerScore', 'loserScore'], // Specify desired properties, no se porque funciona con esto comentado
  } */);

  const formattedResults = results.map((result) => ({
    id: result.id,
    winnerScore: result.winnerScore,
    loserScore: result.loserScore,
    winnerName: result.winner.name,
    loserName: result.loser.name,
    tournamentName:result.tournament.name,
  }));

  return formattedResults;
}

async findScoresByTournament(tournamentName:string){
  const results = await this.resultRepository.find({
    where: {tournament:{name:tournamentName}} , // Specify desired properties
  });

  const formattedResults = results.map((result) => ({
    id: result.id,
    winnerScore: result.winnerScore,
    loserScore: result.loserScore,
    winnerName: result.winner.name,
    loserName: result.loser.name,
    tournamentName:result.tournament.name,
  }));

  return formattedResults;
}

async findScoresByTournamentPaginated(tournamentName:string, 
  page: number, pageSize: number, orderBy: string, order:'ASC' | 'DESC'){
  const results = await this.resultRepository.find({
    where: {tournament:{name:tournamentName}} , // Specify desired properties
    order: { [orderBy]: order },
    skip:(page - 1) * pageSize , 
    take:pageSize,
  });

  const formattedResults = results.map((result) => ({
    id: result.id,
    winnerScore: result.winnerScore,
    loserScore: result.loserScore,
    winnerName: result.winner.name,
    loserName: result.loser.name,
    tournamentName:result.tournament.name,
  }));

  return formattedResults;
}

  async findAll() {
    return await this.resultRepository.find();
  }

  async findOne(id: number) {
    const result = await this.resultRepository.findOneBy( { id });
  if (!result) {
    throw new NotFoundException(`Result with ID ${id} not found`);
  }
  return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const result= await this.resultRepository.findOneBy({id})
    this.resultRepository.merge(result, updateResultDto)
    return await this.resultRepository.save(result)
  }

  async remove(id: number) {
    return await this.resultRepository.softDelete({id})
  }
}
