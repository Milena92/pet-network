import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { PetGender } from '../enum/pet-gender.enum';
import { PetStatus } from '../enum/pet-status.enum';
import { PetType } from '../enum/pet-type.enum';

export class CreatePetDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    chipNumber: string;

    @ApiProperty({ enum: PetType })
    @IsEnum(PetType, { message: 'Invalid pet type' })
    @IsNotEmpty()
    type: PetType;

    @ApiPropertyOptional()
    @IsString()
    @IsNotEmpty()
    color: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    location: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsString()
    breed: string;

    @ApiPropertyOptional()
    @IsNumber()
    @IsOptional()
    age: number;

    @ApiProperty({ enum: PetGender })
    @IsEnum(PetGender, { message: 'Invalid gender value' })
    @IsNotEmpty()
    gender: PetGender;

    @ApiProperty({ enum: PetStatus })
    @IsEnum(PetStatus, { message: 'Invalid pet status' })
    @IsNotEmpty()
    status: PetStatus;
}
