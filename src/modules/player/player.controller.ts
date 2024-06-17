import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('players')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @Get('searchByName')
  findByName(@Query('namePlayer') player: string) {
    return this.playerService.findByName(player);
  }

  @Get('searchByNameIlike')
  findByNameIlike(@Query('namePlayer') player: string) {
    return this.playerService.findByNameIlike(player);
  }
  

  @Get('searchPassingTermAndColumn')
  findByTermColumn(@Query('namePlayer') player: string, @Query('column') column:string ) {
    return this.playerService.findByTermColumn(player, column);
  }


  @Get('pagination')
  findAllPaginated(@Query('page') page: number, 
  @Query('pageSize') pageSize:number,
  @Query('orderBy') orderBy: string,
  @Query('order') order:'ASC' | 'DESC' = 'ASC' ) {
    return this.playerService.findAllPaginated(page, pageSize, orderBy,order);
  }

  @Get('searchPaginated')
  findByTermPaginated(
  @Query('term') searchTerm: string,
  @Query('column') column:string,
  @Query('page') page: number, 
  @Query('pageSize') pageSize:number,
  @Query('orderBy') orderBy: string,
  @Query('order') order:'ASC' | 'DESC' = 'ASC' ) {
    return this.playerService.findByTermPaginated(searchTerm, column,page, pageSize, orderBy,order);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}
