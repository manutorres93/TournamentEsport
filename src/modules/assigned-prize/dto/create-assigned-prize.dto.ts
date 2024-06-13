import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateAssignedPrizeDto {
    @IsNotEmpty()
    @IsInt()
    playerId: number;
}
