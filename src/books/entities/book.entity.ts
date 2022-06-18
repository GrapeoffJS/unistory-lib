import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne } from 'typeorm';

import { BasicEntity } from '../../common/entities/basic.entity';
import { ReaderEntity } from '../../readers/entities/reader.entity';

@Entity('books')
export class BookEntity extends BasicEntity {
    @ApiProperty()
    @Column({ nullable: false })
    title: string;

    @ApiProperty()
    @Column({ nullable: false })
    author: string;

    @ApiProperty({ type: () => String })
    @ManyToOne(() => ReaderEntity, reader => reader.books, {
        onDelete: 'SET NULL',
    })
    owner: ReaderEntity;
}
