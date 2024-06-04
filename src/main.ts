import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    }
  ))

  const config = new DocumentBuilder()
    .setTitle('API esports')
    .setDescription('The esports API description')
    .setVersion('1.0')
    .addTag('players')
    .addTag('results')
    .addTag('tournaments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-documentation', app, document);
  
  await app.listen(3000);
}
bootstrap();
