import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'verbose', 'debug', 'log'],
  });
  
  app.enableCors(); // add this line


  await app.listen(3000);

  console.log(`Application is running on: ${await app.getUrl()}`);

}
bootstrap();
