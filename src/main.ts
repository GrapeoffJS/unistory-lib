import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    app.useGlobalPipes(
        new ValidationPipe({
            always: true,
            forbidUnknownValues: true,
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    await app.listen(configService.get<string>('PORT'));
}

bootstrap().then();
