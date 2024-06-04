import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateTournamentDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @IsString()
  playerName?: string;
}
