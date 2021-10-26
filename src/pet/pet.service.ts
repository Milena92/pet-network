import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetStatus } from './enum/pet-status.enum';
import { Pet } from './pet.entity';
import * as fs from 'fs';

@Injectable()
export class PetService {
    constructor(
        @InjectRepository(Pet)
        private petRepository: Repository<Pet>,
    ) {}

    async getPetById(id: string): Promise<Pet> {
        if (!id) {
            throw new NotFoundException(`Pet with id: ${id} not found`);
        }
        return this.petRepository.findOne(id);
    }

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

    async getAllPets(status?: PetStatus): Promise<Pet[]> {
        if (!status) {
            return this.petRepository.find();
        }
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

    async uploadPhotos(id: string, files: Express.Multer.File[]): Promise<Pet> {
        if (files === undefined) {
            throw new BadRequestException('Invalid file.');
        }

        const images: string[] = new Array();

        files.forEach((file) => {
            const pictureLocation = file.destination + file.filename;
            images.push(pictureLocation);
        });

        const pet = this.petRepository.create({
            images,
        });

        try {
            const toUpdate = await this.petRepository.findOne({ id });
            const updateResult = await this.petRepository.update(
                toUpdate.id,
                pet,
            );
        } catch (error) {
            files.forEach((file) => {
                const pictureLocation = file.destination + file.filename;
                fs.unlink(pictureLocation, (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                });
            });

            throw new NotFoundException(`Pet with id ${id} not found`);
        }
        return pet;
    }
}
