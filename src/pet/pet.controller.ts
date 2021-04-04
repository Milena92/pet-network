import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';

@Controller('pet')
export class PetController {
    constructor(private petService: PetService) {}
    @Post()
    @UsePipes(ValidationPipe)
    async createPet(@Body() createPetDto: CreatePetDto): Promise<Pet> {
        return this.petService.createPet(createPetDto);
    }

    @Get()
    async getAllPets(): Promise<Pet[]> {
        return this.petService.getAllPets();
    }
}
