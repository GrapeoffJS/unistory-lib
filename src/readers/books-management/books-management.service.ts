import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BookEntity } from '../../books/entities/book.entity';
import { ReaderEntity } from '../entities/reader.entity';

@Injectable()
export class BooksManagementService {
    constructor(
        @InjectRepository(ReaderEntity)
        private readonly readerRepository: Repository<ReaderEntity>,
        @InjectRepository(BookEntity)
        private readonly bookRepository: Repository<BookEntity>,
    ) {}

    async addBook(readerId: string, bookId: string) {
        const reader = await this.readerRepository.findOne({
            where: { id: readerId },
            relations: ['books'],
        });

        if (!reader.has_subscription) {
            throw new ForbiddenException('Subscription is required');
        }

        const book = await this.bookRepository.findOne({
            where: { id: bookId },
            relations: ['owner'],
        });

        if (book.owner) {
            throw new ForbiddenException('Book is already owned');
        }

        if (!reader || !book) {
            throw new NotFoundException();
        }

        if (reader.books.length === 5) {
            throw new BadRequestException(
                `Reader can't have more than 5 books`,
            );
        }

        await this.bookRepository.update({ id: bookId }, { owner: reader });

        return this.readerRepository.findOne({
            where: { id: readerId },
            relations: ['books'],
        });
    }

    async returnBook(readerId: string, bookId: string) {
        const reader = await this.readerRepository.findOne({
            where: { id: readerId },
            relations: ['books'],
        });

        const book = await this.bookRepository.findOne({
            where: { id: bookId },
            relations: ['owner'],
        });

        if (!reader || !book) {
            throw new NotFoundException();
        }

        if (!reader.books.some(book => book.id === bookId)) {
            // If reader doesn't have this book
            throw new BadRequestException();
        }

        await this.bookRepository.update({ id: bookId }, { owner: null });

        return this.readerRepository.findOne({
            where: { id: readerId },
            relations: ['books'],
        });
    }
}
