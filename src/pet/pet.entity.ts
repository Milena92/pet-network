import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PetGender } from './pet-gender.enum';
import { PetStatus } from './pet-status.enum';
import { PetType } from './pet-type.enum';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    type: PetType;

    @Column()
    breed: string;

    @Column()
    age: number;

    @Column()
    gender: PetGender;

    @Column()
    status: PetStatus;
}
