import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetStatus } from './pet-status.enum';
import { Pet } from './pet.entity';
import * as fs from 'fs';

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
            const toUpdate = await this.petRepository.findOne({ id });
            await this.petRepository.update(toUpdate, pet);
        } catch (error) {
            throw new NotFoundException(`Pet with ${id} is not found`);
        }
        return pet;
    }

    async uploadPhoto(id: string, file: Express.Multer.File): Promise<Pet> {
        if (file === undefined) {
            throw new BadRequestException('Invalid file.');
        }
        const pictureLocation = file.destination + file.filename;
        const pet = this.petRepository.create({
            pictureLocation,
        });
        try {
            const toUpdate = await this.petRepository.findOne({ id });
            const updateResult = await this.petRepository.update(
                toUpdate.id,
                pet,
            );
        } catch (error) {
            fs.unlink(pictureLocation, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
            throw new NotFoundException(`Pet with id ${id} not found`);
        }
        return pet;
    }
}
