import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prize } from './entities/prize.entity';
import { Player } from '../player/entities/player.entity';
import { AssignedPrize } from '../assigned-prize/entities/assigned-prize.entity';
import { CreateAssignedPrizeDto } from '../assigned-prize/dto/create-assigned-prize.dto';

@Injectable()
export class PrizeService {
  constructor(
    @InjectRepository(Prize)
    private prizeRepository: Repository<Prize>,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
    /* @InjectRepository(AssignedPrize)
    private assignedPrizeRepository: Repository<AssignedPrize>, */
  ) {}

  async create(createPrizeDto: CreatePrizeDto): Promise<Prize> {
    const prize = this.prizeRepository.create(createPrizeDto);
    return this.prizeRepository.save(prize);
  }

  async assignPrize(assignPrizeDto: CreateAssignedPrizeDto)/* : Promise<{ player: Player; prize: Prize }> */ {
    const player = await this.playerRepository.findOneBy({id : assignPrizeDto.playerId});
    if (!player) {
      throw new NotFoundException(`Player with ID ${assignPrizeDto.playerId} not found`);
    }

   /*  const prize = this.prizeRepository.findOneBy({id : assignPrizeDto.prizeId});
    if (!prize) {
      throw new NotFoundException('No prizes available');
    } */

   /*  prize.quantity -= 1;
    await this.prizeRepository.save(prize); */

    /* const assignment = this.prizeAssignmentRepository.create({ player, prize });
    await this.prizeAssignmentRepository.save(assignment); */

   /*  return { player, prize }; */

   return player
  }

  async findAll() {
    return await this.prizeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} prize`;
  }

  update(id: number, updatePrizeDto: UpdatePrizeDto) {
    return `This action updates a #${id} prize`;
  }

  remove(id: number) {
    return `This action removes a #${id} prize`;
  }
}
