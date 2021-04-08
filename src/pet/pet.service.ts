import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
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
            chipNumber,
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
            chipNumber,
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

    async deletePet(id: string): Promise<void> {
        const deleteResult = await this.petRepository.delete({ id });
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`Pet with id ${id} not found`);
        }
    }

    async updatePet(id: string, updatePetDto: UpdatePetDto): Promise<Pet> {
        const {
            name,
            chipNumber,
            type,
            color,
            location,
            breed,
            age,
            gender,
            status,
        } = updatePetDto;

        const pet = this.petRepository.create({
            name,
            chipNumber,
            type,
            color,
            location,
            breed,
            age,
            gender,
            status,
        });
        try {
            const updateResult = await this.petRepository.update(id, pet);
        } catch (error) {
            throw new NotFoundException(`Pet with id ${id} not found`);
        }
        return pet;
    }
}
