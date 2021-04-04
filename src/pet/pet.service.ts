import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet)
        private petRepository: Repository<Pet>,
    ) {}

    async createPet(createPetDto: CreatePetDto): Promise<Pet> {
        const { name, type, breed, age, gender, status } = createPetDto;

        const pet = this.petRepository.create({
            name,
            type,
            breed,
            age,
            gender,
            status,
        });

        return this.petRepository.save(pet);
    }

    async getAllPets(): Promise<Pet[]> {
        return this.petRepository.find();
    }
}
