import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get<ConfigService>(ConfigService);

    app.enableCors({
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: configService
            .get<string>('CORS_ALLOWED_HEADERS')
            .split(' '),
        optionsSuccessStatus: 200,
        origin: configService.get<string>('CORS_ALLOWED_ORIGINS').split(' '),
    });
    app.use(helmet());
    app.useGlobalPipes(
        new ValidationPipe({
            always: true,
            forbidUnknownValues: true,
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );

    app.enableVersioning({
        type: VersioningType.URI,
        prefix: 'api',
        defaultVersion: '1',
    });

    const swaggerConfig = new DocumentBuilder()
        .setTitle('Library API')
        .setDescription(
            'Implementation of the API for the library as part of the test task',
        )
        .setVersion('1.0')
        .addTag('Library')
        .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);

    await app.listen(configService.get<string>('PORT'));
}

bootstrap().then();
