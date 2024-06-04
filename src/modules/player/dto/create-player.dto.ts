import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePlayerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  tournamentName: string
}
