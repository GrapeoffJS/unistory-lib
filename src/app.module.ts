import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            envFilePath: '.env',
            isGlobal: true,
            validationSchema: Joi.object({
                PORT: Joi.number().required().default(4200),
            }),
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
