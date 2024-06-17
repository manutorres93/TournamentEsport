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
    @InjectRepository(AssignedPrize)
    private assignedPrizeRepository: Repository<AssignedPrize>,
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

    const prize =await this.prizeRepository.findOneBy({id : assignPrizeDto.prizeId});
    if (!prize) {
      throw new NotFoundException('No prizes available');
    }

    if (prize.quantity<=0) {
      throw new NotFoundException('There is no prize available');
    }


    console.log(prize);
    

    prize.quantity -= 1;

    const prizeAssignated = prize.name
    console.log(prize.quantity);
    
    await this.prizeRepository.save(prize);

    const assignment = this.assignedPrizeRepository.create({ player, prize: prizeAssignated, 
      prizeQuantity: 1});
    

    return await this.assignedPrizeRepository.save(assignment);

   
  }

  async assignDailyPrizes() {
    const players = await this.playerRepository.find();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const player of players) {
      const assignmentCount = await this.assignedPrizeRepository.count({
        where: {
          player,
          assignedAt: today,
        },
      });

      if (assignmentCount === 0) {
        await this.assignPrize({ playerId: player.id, prizeId: null });
      }
    }
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
