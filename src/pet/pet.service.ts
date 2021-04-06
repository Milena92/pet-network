import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetStatus } from './pet-status.enum';
import { Pet } from './pet.entity';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet)
        private petRepository: Repository<Pet>,
    ) {}

    async createPet(createPetDto: CreatePetDto): Promise<Pet> {
        const {
            name,
            type,
            color,
            location,
            breed,
            age,
            gender,
            status,
        } = createPetDto;

        const pet = this.petRepository.create({
            name,
            type,
            color,
            location,
            breed,
            age,
            gender,
            status,
        });

        return this.petRepository.save(pet);
    }

    async getAllPets(status: PetStatus): Promise<Pet[]> {
        return this.petRepository.find({ status });
    }
}
