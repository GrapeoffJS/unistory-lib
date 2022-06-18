import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import Joi from 'joi';

import { BooksModule } from './books/books.module';
import { ReadersModule } from './readers/readers.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required(),
                POSTGRES_HOST: Joi.string().required(),
                POSTGRES_PORT: Joi.number().required(),
                POSTGRES_USERNAME: Joi.string().required(),
                POSTGRES_PASSWORD: Joi.string().required(),
                POSTGRES_DATABASE: Joi.string().required(),
                SYNCHRONIZE: Joi.string().valid('YES'),
                CORS_ALLOWED_HEADERS: Joi.string().optional(),
                CORS_ALLOWED_ORIGINS: Joi.string().optional(),
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory(configService: ConfigService): TypeOrmModuleOptions {
                return {
                    type: 'postgres',
                    host: configService.get('POSTGRES_HOST'),
                    port: Number.parseInt(configService.get('POSTGRES_PORT')),
                    username: configService.get('POSTGRES_USERNAME'),
                    password: configService.get('POSTGRES_PASSWORD'),
                    database: configService.get('POSTGRES_DATABASE'),
                    autoLoadEntities: true,
                    synchronize: configService.get('SYNCHRONIZE') === 'YES',
                };
            },
        }),
        ReadersModule,
        BooksModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
