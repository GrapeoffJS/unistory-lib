import { IsUUID } from 'class-validator';

export class BookManagementDto {
    @IsUUID()
    id: string;

    @IsUUID()
    bookId: string;
}
