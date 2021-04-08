import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFile,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { FileHelper } from './file-helper';
import { PetStatus } from './pet-status.enum';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetStatusValidationPipe } from './pipes/pet-status.validation.pipe';

@ApiTags()
@Controller('pet')
export class PetController {
    constructor(private petService: PetService) {}

    @Post('/:id/photo')
    @UseInterceptors(
        FileInterceptor('picture', {
            storage: diskStorage({
                destination: FileHelper.destinationPath,
                filename: FileHelper.customFileName,
            }),
        }),
    )
    async uploadPetPhoto(
        @UploadedFile() file: Express.Multer.File,
        @Param('id') id: string,
    ): Promise<Pet> {
        return this.petService.uploadPhoto(id, file);
    }

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
