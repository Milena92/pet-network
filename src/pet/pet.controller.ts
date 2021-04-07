import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetStatus } from './pet-status.enum';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetStatusValidationPipe } from './pipes/pet-status.validation.pipe';

@ApiTags('pet')
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

    @Delete('/:id')
    async deletePet(@Param('id') id: string): Promise<void> {
        return this.petService.deletePet(id);
    }

    @Put('/:id')
    async updatePet(
        @Param('id') id: string,
        @Body(ValidationPipe) updatePetDto: UpdatePetDto,
    ): Promise<Pet> {
        return this.petService.updatePet(id, updatePetDto);
    }
}
