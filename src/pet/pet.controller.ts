import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { PetStatus } from './pet-status.enum';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetStatusValidationPipe } from './pipes/pet-status.validation.pipe';

@Controller('pet')
export class PetController {
    constructor(private petService: PetService) {}
    @Post()
    @UsePipes(ValidationPipe)
    async createPet(@Body() createPetDto: CreatePetDto): Promise<Pet> {
        return this.petService.createPet(createPetDto);
    }

    @Get()
    async getAllPets(
        @Query('status', PetStatusValidationPipe) status: PetStatus,
    ): Promise<Pet[]> {
        return this.petService.getAllPets(status);
    }
}
