import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from '../entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class CrudService {
    constructor(
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

    async get() {
        return this.bookRepository.find();
    }

    async create(createBookDto: CreateBookDto) {
        return this.bookRepository.save(createBookDto);
    }
}
