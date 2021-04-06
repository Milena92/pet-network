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
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsEnum(PetType, { message: 'Invalid pet type' })
    @IsNotEmpty()
    type: PetType;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    breed: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsEnum(PetGender, { message: 'Invalid gender value' })
    @IsNotEmpty()
    gender: PetGender;

    @IsEnum(PetStatus, { message: 'Invalid pet status' })
    @IsNotEmpty()
    status: PetStatus;
}
