import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { PetGender } from '../pet-gender.enum';
import { PetStatus } from '../pet-status.enum';
import { PetType } from '../pet-type.enum';

export class CreatePetDto {
    @IsNotEmpty()
    name: string;

    @IsEnum(PetType, { message: 'Invalid pet type' })
    type: PetType;

    @IsNotEmpty()
    breed: string;

    @IsNumber()
    age: number;

    @IsEnum(PetGender, { message: 'Invalid gender value' })
    gender: PetGender;

    @IsEnum(PetStatus, { message: 'Invalid pet status' })
    status: PetStatus;
}
