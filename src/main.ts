import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  await app.listen(3000,() => console.log("Nestjs Running at http://localhost:3000")
  );
}
bootstrap();
