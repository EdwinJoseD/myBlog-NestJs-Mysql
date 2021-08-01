import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initSwagger } from './app.swagger';
import { PORT } from './config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const config = app.get(ConfigService)
  const port = parseInt(config.get<string>(PORT), 10) || 3000

  initSwagger(app)

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(port);
  logger.log(`Servidor Corriendo en ${await app.getUrl()}`);
}
bootstrap();
