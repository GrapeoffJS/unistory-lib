import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReaderEntity } from '../entities/reader.entity';
import { SubscriptionManagementController } from './subscription-management.controller';
import { SubscriptionManagementService } from './subscription-management.service';

@Module({
    imports: [TypeOrmModule.forFeature([ReaderEntity])],
    controllers: [SubscriptionManagementController],
    providers: [SubscriptionManagementService],
})
export class SubscriptionManagementModule {}
