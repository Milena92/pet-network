import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { PetGender } from '../pet-gender.enum';
import { PetStatus } from '../pet-status.enum';
import { PetType } from '../pet-type.enum';

export class CreatePetDto {
    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsEnum(PetType, { message: 'Invalid pet type' })
    @IsNotEmpty()
    type: PetType;

    @ApiProperty()
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

    @ApiProperty()
    @IsEnum(PetGender, { message: 'Invalid gender value' })
    @IsNotEmpty()
    gender: PetGender;

    @ApiProperty()
    @IsEnum(PetStatus, { message: 'Invalid pet status' })
    @IsNotEmpty()
    status: PetStatus;
}
