import { Injectable } from '@nestjs/common';
import { CreateAssignedPrizeDto } from './dto/create-assigned-prize.dto';
import { UpdateAssignedPrizeDto } from './dto/update-assigned-prize.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignedPrize } from './entities/assigned-prize.entity';
import { Repository } from 'typeorm';
import { PrizeService } from '../prize/prize.service';
import { Prize } from '../prize/entities/prize.entity';
import { Cron } from '@nestjs/schedule';
import { Player } from '../player/entities/player.entity';

@Injectable()
export class AssignedPrizeService {

  constructor(
    @InjectRepository(AssignedPrize)
    private assignedPrizeRepository: Repository<AssignedPrize>,
    @InjectRepository(Prize)
    private readonly prizeService: PrizeService,
    @InjectRepository(Player)
    private playerRepository: Repository<Player>,
  
  ) {}

  @Cron('59 23 * * *', {
    timeZone: 'America/Bogota',
  })

  async assignPrizesAutomatically() {
   
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

        const prizeAssignated = 'Basura'
  
        if (assignmentCount === 0) {
          await this.assignedPrizeRepository.create({ player, prize: prizeAssignated, 
            prizeQuantity: 1 });
        }
      }
    
  }

  create(createAssignedPrizeDto: CreateAssignedPrizeDto) {
    return 'This action adds a new assignedPrize';
  }

  async findAll() {
    return await this.assignedPrizeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} assignedPrize`;
  }

  update(id: number, updateAssignedPrizeDto: UpdateAssignedPrizeDto) {
    return `This action updates a #${id} assignedPrize`;
  }

  remove(id: number) {
    return `This action removes a #${id} assignedPrize`;
  }
}

