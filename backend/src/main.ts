import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from './common/config/configuration';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const allowedOrigins = configuration().ALLOWED_ORIGINS;
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'apikey',
      'x-client-info',
      'x-supabase-authorization',
    ],
    credentials: true,
    maxAge: 86400,
  });
  await app.listen(configuration().PORT ?? 3000, '0.0.0.0');
}
bootstrap();
