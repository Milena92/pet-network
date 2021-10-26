import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PetStatus } from '../enum/pet-status.enum';

export class PetStatusValidationPipe implements PipeTransform {
    readonly allowedPetStatuses: string[] = [PetStatus.FOUND, PetStatus.LOST];

    transform(value: string) {
        if (!value) {
            return null;
        }
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(
                `Value ${value} is not a valid status`,
            );
        }
        return value;
    }

    private isStatusValid(status: string) {
        const idx = this.allowedPetStatuses.indexOf(status);
        return idx !== -1;
    }
}
