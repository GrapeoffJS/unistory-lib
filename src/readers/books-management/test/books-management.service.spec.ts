import { Test, TestingModule } from '@nestjs/testing';

import { BooksManagementService } from '../books-management.service';

describe('BooksManagementService', () => {
    let service: BooksManagementService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BooksManagementService],
        }).compile();

        service = module.get<BooksManagementService>(BooksManagementService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
