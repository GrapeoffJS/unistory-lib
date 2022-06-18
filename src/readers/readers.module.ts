import { Module } from '@nestjs/common';

import { BooksManagementModule } from './books-management/books-management.module';
import { CrudModule } from './crud/crud.module';
import { SubscriptionManagementModule } from './subscription-management/subscription-management.module';

@Module({
    imports: [CrudModule, BooksManagementModule, SubscriptionManagementModule],
    providers: [],
    controllers: [],
})
export class ReadersModule {}
