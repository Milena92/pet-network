import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PetModule } from './pet/pet.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        PetModule,
        UserModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'pet-network',
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
        }),
    ],
})
export class AppModule {}
