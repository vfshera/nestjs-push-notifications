import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { PostCreatedEvent } from 'src/events/post-created.event';
import { Repository } from 'typeorm';
import { SubscriptionDTO } from './dto/subscriber.dto';
import { Subscriber } from './subscriber.entity';


@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber) private subRepository: Repository<Subscriber>,
    @Inject('WEB_PUSH') private webPush
  ) {}

  createSubscription(sub: SubscriptionDTO): Promise<Subscriber> {
    const newSub = this.subRepository.create({
      endpoint: sub.endpoint,
      authkey: sub.keys.auth,
      p256dhkey: sub.keys.p256dh,
    });

    return this.subRepository.save(newSub);
  }

  


  
  @OnEvent('post.created')
  async handlePostCreatedEvent(event: PostCreatedEvent) {

    const subscribers: Subscriber[] = await this.subRepository.find();

    subscribers.forEach((sub) => {
      const payload = JSON.stringify({
        title: event.title,
        description: event.description,
      });

      if(sub.authkey === ""){
          console.log(`Subcriber ${sub.id} Should be deleted!`)
      }else{
        this.webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { auth: sub.authkey, p256dh: sub.p256dhkey },
          },
          payload
        );
      }
      
    });
  }
}
