import { Module } from '@nestjs/common';

import { CrudController } from './crud.controller';
import { CrudService } from './crud.service';

@Module({
    providers: [CrudService],
    controllers: [CrudController],
})
export class CrudModule {}
