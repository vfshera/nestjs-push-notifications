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
    @Inject('WEB_PUSH') private webPush,
  ) {}

  /**
   * CREATES SUBSCRIPTION
   * SAVES TO DATABASE
   *  
   */
  createSubscription(sub: SubscriptionDTO): Promise<Subscriber> {
    const newSub = this.subRepository.create({
      endpoint: sub.endpoint,
      authkey: sub.keys.auth,
      p256dhkey: sub.keys.p256dh,
    });

    return this.subRepository.save(newSub);
  }

  /**
   * LISTENING TO post.created EVENT
   * 
   */
  @OnEvent('post.created')
  async handlePostCreatedEvent(event: PostCreatedEvent) {
       /*
    *GETS ALL SUBSCRIBERS
    */
    const subscribers: Subscriber[] = await this.subRepository.find();

    subscribers.forEach((sub) => {
      /*
      *LOOPING THROUGH EACH SUBSCRIBER
      */
      const payload = JSON.stringify({
        title: event.title,
        description: event.description,
      });

      if (sub.authkey === '' || sub.endpoint === '' || sub.p256dhkey === '') {
        /*
         *IF ANY FIELD IS NULL
         */

        console.log(`Subcriber ${sub.id} Should be deleted!`);

        this.subRepository
          .remove(sub)
          .then(
            (res) => console.log('Deleted'),
            (err) => console.log(err),
          );


      } else {
        /*
         *SENDING PUSH NOTIFICATION
         */
        this.webPush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { auth: sub.authkey, p256dh: sub.p256dhkey },
          },
          payload,
        );
      }
    });
  }
}
