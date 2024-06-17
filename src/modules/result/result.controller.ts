import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiTags } from '@nestjs/swagger';
import { SearchResultDto } from './dto/search-result.dto';

@ApiTags('results')
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get('search')
  async findByParam(@Query() searchResultDto: SearchResultDto) {
    try {
      const { searchTerm, orderBy, order, page, pageSize, columnName } = searchResultDto;
      
      return await this.resultService.findByParam(searchTerm,orderBy, order,page, pageSize, columnName);
    } catch (error) {

      throw new BadRequestException('Failed to search athletes', error.message);
      
    }
    
    
  }

  @Get('scores')
  findScores() {
    return this.resultService.findScores();
  }

  @Get('scoresByTournament')
  findScoresByTournament(@Query('tournamentName') tournamentName: string) {
    return this.resultService.findScoresByTournament(tournamentName);
  }

  @Get('scoresByTournamentPaginated')
  findScoresByTournamentPaginated(@Query('tournamentName') tournamentName: string,
  @Query('page') page: number, 
  @Query('pageSize') pageSize:number,
  @Query('orderBy') orderBy: string,
  @Query('order') order:'ASC' | 'DESC' = 'ASC') {
    return this.resultService.findScoresByTournamentPaginated(tournamentName, page, pageSize, orderBy,order);
  }

  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
