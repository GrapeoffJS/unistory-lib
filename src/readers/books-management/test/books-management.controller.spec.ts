import { Test, TestingModule } from '@nestjs/testing';

import { BooksManagementController } from '../books-management.controller';

describe('BooksManagementController', () => {
    let controller: BooksManagementController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksManagementController],
        }).compile();

        controller = module.get<BooksManagementController>(
            BooksManagementController,
        );
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
