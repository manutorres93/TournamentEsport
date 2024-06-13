import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreatePrizeDto {
    @IsNotEmpty()
    @IsString()
    name: string;
  
    @IsNotEmpty()
    @IsString()
    description: string;
  
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    quantity: number;
}
