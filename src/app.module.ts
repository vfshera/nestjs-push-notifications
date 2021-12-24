import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriberModule } from './subscriber/subscriber.module';
import { ConfigModule } from '@nestjs/config';
import { PushNotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    SubscriberModule,
    PushNotificationsModule.forRoot(
      process.env.VAPID_SENDER,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    ),
    EventEmitterModule.forRoot({ wildcard: false, delimiter: '.' })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
