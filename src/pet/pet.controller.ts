import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UploadedFiles,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { CreatePetDto } from './dto/create-pet.dto';
import { PhotosUploadDto } from './dto/photos-upload.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { FileHelper } from './file-helper';
import { PetStatus } from './enum/pet-status.enum';
import { Pet } from './pet.entity';
import { PetService } from './pet.service';
import { PetStatusValidationPipe } from './pipes/pet-status.validation.pipe';

@ApiTags('pet')
@Controller('pet')
export class PetController {
    constructor(private petService: PetService) {}

    @ApiQuery({
        name: 'status',
        enum: PetStatus,
        required: false,
    })
    @Get()
    async getAllPets(
        @Query('status', PetStatusValidationPipe) status?: PetStatus,
    ): Promise<Pet[]> {
        return this.petService.getAllPets(status);
    }

    @Get('/:id')
    async getPetById(@Param('id') id: string): Promise<Pet> {
        return this.petService.getPetById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createPet(@Body() createPetDto: CreatePetDto): Promise<Pet> {
        return this.petService.createPet(createPetDto);
    }

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Photo of the dog',
        type: PhotosUploadDto,
    })
    @UseInterceptors(
        FilesInterceptor('photos', 10, {
            storage: diskStorage({
                destination: FileHelper.destinationPath,
                filename: FileHelper.customFileName,
            }),
            fileFilter: FileHelper.fileFilter,
        }),
    )
    @Put('/photos/:id')
    async uploadPetPhotos(
        @UploadedFiles() files: Express.Multer.File[],
        @Param('id') id: string,
    ): Promise<Pet> {
        return this.petService.uploadPhotos(id, files);
    }

    @Put('/:id')
    async updatePet(
        @Param('id') id: string,
        @Body(ValidationPipe) updatePetDto: UpdatePetDto,
    ): Promise<Pet> {
        return this.petService.updatePet(id, updatePetDto);
    }

    @Delete('/:id')
    async deletePet(@Param('id') id: string): Promise<void> {
        return this.petService.deletePet(id);
    }
}
