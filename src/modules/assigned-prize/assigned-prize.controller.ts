import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AssignedPrizeService } from './assigned-prize.service';
import { CreateAssignedPrizeDto } from './dto/create-assigned-prize.dto';
import { UpdateAssignedPrizeDto } from './dto/update-assigned-prize.dto';

@Controller('assigned-prize')
export class AssignedPrizeController {
  constructor(private readonly assignedPrizeService: AssignedPrizeService) {}

  @Post()
  create(@Body() createAssignedPrizeDto: CreateAssignedPrizeDto) {
    return this.assignedPrizeService.create(createAssignedPrizeDto);
  }

  @Get()
  findAll() {
    return this.assignedPrizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignedPrizeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAssignedPrizeDto: UpdateAssignedPrizeDto) {
    return this.assignedPrizeService.update(+id, updateAssignedPrizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignedPrizeService.remove(+id);
  }
}
