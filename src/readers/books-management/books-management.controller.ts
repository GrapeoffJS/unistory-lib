import { Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReaderEntity } from '../entities/reader.entity';
import { BooksManagementService } from './books-management.service';
import { BookManagementDto } from './dto/book-management.dto';

@ApiTags('/reader/books')
@Controller('readers')
export class BooksManagementController {
    constructor(
        private readonly booksManagementService: BooksManagementService,
    ) {}

    @ApiParam({ name: 'id' })
    @ApiParam({ name: 'bookId' })
    @ApiResponse({ type: () => ReaderEntity })
    @Post(':id/books/:bookId')
    async addBook(@Param() { id, bookId }: BookManagementDto) {
        return await this.booksManagementService.addBook(id, bookId);
    }

    @ApiParam({ name: 'id' })
    @ApiParam({ name: 'bookId' })
    @ApiResponse({ type: () => ReaderEntity })
    @Delete(':id/books/:bookId')
    async returnBook(@Param() { id, bookId }: BookManagementDto) {
        return await this.booksManagementService.returnBook(id, bookId);
    }
}
