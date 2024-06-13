import { PartialType } from '@nestjs/swagger';
import { CreateAssignedPrizeDto } from './create-assigned-prize.dto';

export class UpdateAssignedPrizeDto extends PartialType(CreateAssignedPrizeDto) {}
