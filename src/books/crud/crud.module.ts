import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from '../entities/book.entity';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    imports: [TypeOrmModule.forFeature([BookEntity])],
    providers: [CrudService],
    controllers: [CrudController],
})
export class CrudModule {}
