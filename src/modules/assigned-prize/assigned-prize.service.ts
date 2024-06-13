import { Injectable } from '@nestjs/common';
import { CreateAssignedPrizeDto } from './dto/create-assigned-prize.dto';
import { UpdateAssignedPrizeDto } from './dto/update-assigned-prize.dto';

@Injectable()
export class AssignedPrizeService {
  create(createAssignedPrizeDto: CreateAssignedPrizeDto) {
    return 'This action adds a new assignedPrize';
  }

  findAll() {
    return `This action returns all assignedPrize`;
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
