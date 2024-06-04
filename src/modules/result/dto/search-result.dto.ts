import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class SearchResultDto{
    @ApiProperty({example: '2024-05-31'})
    @IsString()
    searchTerm: string;
  
    @ApiProperty({example: "id"})
    @IsOptional()
    @IsString()
    orderBy: string = 'id';
  
    @ApiProperty({example: "ASC" , enum: ['ASC', 'DESC']})
    @IsOptional()
    @IsIn(['ASC', 'DESC'])
    order: 'ASC' | 'DESC' = 'ASC';
  
    @ApiProperty({example: 1})
    @IsOptional()
    @IsNumber()
    @Type(()=>Number)
    @Min(1)
    page: number = 1;
  
    @ApiProperty({example: 3})
    @IsOptional()
    @IsInt()
    @Type(()=>Number)
    @Min(1)
    pageSize: number = 10;
  
    @ApiProperty({example: 'saleDate'}) //nombre de la columna que quiero que busque
    @IsString()
    columnName:string;
}