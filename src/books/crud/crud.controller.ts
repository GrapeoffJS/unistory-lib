import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { BookEntity } from '../entities/book.entity';
import { CrudService } from './crud.service';
import { CreateBookDto } from './dto/create-book.dto';

@ApiTags('books')
@Controller('books')
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @ApiResponse({ type: () => BookEntity, isArray: true })
    @Get()
    async get() {
        return await this.crudService.get();
    }

    @ApiBody({ type: () => CreateBookDto })
    @ApiResponse({ type: () => BookEntity })
    @Post()
    async create(@Body() createBookDto: CreateBookDto) {
        return await this.crudService.create(createBookDto);
    }
}
