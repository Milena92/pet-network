import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PetGender } from './enum/pet-gender.enum';
import { PetStatus } from './enum/pet-status.enum';
import { PetType } from './enum/pet-type.enum';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    chipNumber: string;

    @Column()
    type!: PetType;

    @Column()
    color!: string;

    @Column()
    location!: string;

    @Column({ nullable: true })
    breed: string;

    @Column({ nullable: true })
    age: number;

    @Column()
    gender!: PetGender;

    @Column()
    status!: PetStatus;

    @Column('text', { array: true, nullable: true })
    images: string[];
}
