import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PetGender } from '../pet-gender.enum';
import { PetStatus } from '../pet-status.enum';
import { PetType } from '../pet-type.enum';
import { CreatePetDto } from './create-pet.dto';

export class UpdatePetDto extends PartialType(CreatePetDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty()
    @IsEnum(PetType, { message: 'Invalid pet type' })
    @IsOptional()
    type: PetType;

    @ApiProperty()
    @IsString()
    @IsOptional()
    color: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    location: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    breed: string;

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    age: number;

    @ApiProperty()
    @IsEnum(PetGender, { message: 'Invalid gender value' })
    @IsOptional()
    gender: PetGender;

    @ApiProperty()
    @IsEnum(PetStatus, { message: 'Invalid pet status' })
    @IsOptional()
    status: PetStatus;
}
