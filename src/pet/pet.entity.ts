import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PetGender } from './pet-gender.enum';
import { PetStatus } from './pet-status.enum';
import { PetType } from './pet-type.enum';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ nullable: true })
    name: string;

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
}
