import { Controller, Get, Post, Body } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { SubscriptionDTO } from './subscriber/dto/subscriber.dto';
import { SubscriberService } from './subscriber/subscriber.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly subService: SubscriberService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/subscribe')
  subscribe(@Body() body: SubscriptionDTO){
    return this.subService.createSubscription(body)
  }


}
