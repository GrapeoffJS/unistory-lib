import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany } from 'typeorm';

import { BookEntity } from '../../books/entities/book.entity';
import { BasicEntity } from '../../common/entities/basic.entity';

@Entity('readers')
export class ReaderEntity extends BasicEntity {
    @ApiProperty()
    @Column({ nullable: false })
    first_name: string;

    @ApiProperty()
    @Column({ nullable: false })
    last_name: string;

    @ApiProperty()
    @Column({ default: false })
    has_subscription: boolean;

    @ApiProperty({ type: () => BookEntity })
    @OneToMany(() => BookEntity, book => book.owner)
    books: BookEntity[];
}
