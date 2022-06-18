import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReaderEntity } from '../entities/reader.entity';

@Injectable()
export class SubscriptionManagementService {
    constructor(
        @InjectRepository(ReaderEntity)
        private readonly readerRepository: Repository<ReaderEntity>,
    ) {}

    async check(id: string) {
        try {
            const reader = await this.readerRepository.findOneBy({ id });
            return { isSubscriptionActive: reader.has_subscription };
        } catch {
            throw new NotFoundException();
        }
    }
}
