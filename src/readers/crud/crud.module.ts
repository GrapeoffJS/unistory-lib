import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from '../../books/entities/book.entity';
import { ReaderEntity } from '../entities/reader.entity';
import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    imports: [TypeOrmModule.forFeature([ReaderEntity, BookEntity])],
    providers: [CrudService],
    controllers: [CrudController],
})
export class CrudModule {}
