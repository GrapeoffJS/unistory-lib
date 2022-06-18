import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

import { UuidDto } from '../../common/dto/uuid.dto';
import { ReaderEntity } from '../entities/reader.entity';
import { CrudService } from './crud.service';
import { CreateReaderDto } from './dto/create-reader.dto';
import { UpdateReaderDto } from './dto/update-reader.dto';

@ApiTags('/readers')
@Controller('readers')
export class CrudController {
    constructor(private readonly crudService: CrudService) {}

    @ApiResponse({ type: () => ReaderEntity, isArray: true })
    @Get()
    async get() {
        return await this.crudService.get();
    }

    @ApiParam({ name: 'id' })
    @ApiResponse({ type: () => ReaderEntity })
    @Get(':id')
    async getById(@Param() { id }: UuidDto) {
        return await this.crudService.getById(id);
    }

    @ApiBody({ type: () => CreateReaderDto })
    @ApiResponse({ type: () => ReaderEntity })
    @Post()
    async create(@Body() createReaderDto: CreateReaderDto) {
        return await this.crudService.create(createReaderDto);
    }

    @ApiParam({ name: 'id' })
    @ApiBody({ type: () => UpdateReaderDto })
    @ApiResponse({ type: () => ReaderEntity })
    @Patch(':id')
    async update(
        @Param() { id }: UuidDto,
        @Body() updateReaderDto: UpdateReaderDto,
    ) {
        return await this.crudService.update(id, updateReaderDto);
    }

    @ApiParam({ name: 'id' })
    @ApiResponse({ type: () => ReaderEntity })
    @Delete(':id')
    async delete(@Param() { id }: UuidDto) {
        return await this.crudService.delete(id);
    }
}
