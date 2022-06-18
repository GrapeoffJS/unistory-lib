import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { UuidDto } from '../../common/dto/uuid.dto';
import { SubscriptionManagementService } from './subscription-management.service';

@ApiTags('reader/subscription')
@Controller('readers')
export class SubscriptionManagementController {
    constructor(
        private readonly subscriptionManagementService: SubscriptionManagementService,
    ) {}

    @ApiParam({ name: 'id' })
    @Get(':id/subscription/check')
    async check(@Param() { id }: UuidDto) {
        return await this.subscriptionManagementService.check(id);
    }
}
