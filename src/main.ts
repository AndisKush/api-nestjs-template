import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, // Remove automaticamente propriedades que não estão no DTO
      forbidNonWhitelisted: true, // (Opcional, mas recomendado) Lança um erro se propriedades extras forem enviadas
    }),
  );
  app.enableCors({
    origin: 'http://localhost:5173', // A origem do seu front-end
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
