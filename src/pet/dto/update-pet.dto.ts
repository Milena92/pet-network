import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { PetGender } from '../pet-gender.enum';
import { PetStatus } from '../pet-status.enum';
import { PetType } from '../pet-type.enum';

export class UpdatePetDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsEnum(PetType, { message: 'Invalid pet type' })
    @IsOptional()
    type: PetType;

    @IsString()
    @IsOptional()
    color: string;

    @IsString()
    @IsOptional()
    location: string;

    @IsString()
    @IsOptional()
    breed: string;

    @IsNumber()
    @IsOptional()
    age: number;

    @IsEnum(PetGender, { message: 'Invalid gender value' })
    @IsOptional()
    gender: PetGender;

    @IsEnum(PetStatus, { message: 'Invalid pet status' })
    @IsOptional()
    status: PetStatus;
}
