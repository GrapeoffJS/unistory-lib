import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookEntity } from '../../books/entities/book.entity';
import { ReaderEntity } from '../entities/reader.entity';
import { BooksManagementController } from './books-management.controller';
import { BooksManagementService } from './books-management.service';

@Module({
    imports: [TypeOrmModule.forFeature([ReaderEntity, BookEntity])],
    providers: [BooksManagementService],
    controllers: [BooksManagementController],
})
export class BooksManagementModule {}
