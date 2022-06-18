import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReaderEntity } from '../entities/reader.entity';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@Injectable()
export class CrudService {
    constructor(
        @InjectRepository(ReaderEntity)
        private readonly readerRepository: Repository<ReaderEntity>,
    ) {}

    async get() {
        return this.readerRepository.find();
    }

    async getById(id: string) {
        try {
            return await this.readerRepository.findOneByOrFail({ id });
        } catch {
            throw new NotFoundException();
        }
    }

    async create(createReaderDto: CreateReaderDto) {
        return this.readerRepository.save(createReaderDto);
    }

    async update(id: string, updateReaderDto: UpdateReaderDto) {
        try {
            await this.readerRepository.findOneByOrFail({ id });
            await this.readerRepository.update({ id }, updateReaderDto);

            return this.readerRepository.findOneBy({ id });
        } catch {
            throw new NotFoundException();
        }
    }

    async delete(id: string) {
        try {
            const deleted = await this.readerRepository.findOneByOrFail({ id });
            await this.readerRepository.delete({ id });

            return deleted;
        } catch {
            throw new NotFoundException();
        }
    }
}
