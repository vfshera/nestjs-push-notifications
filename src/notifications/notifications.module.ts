import { DynamicModule, Module, Provider } from '@nestjs/common';
const webPush  =  require('web-push')


@Module({})
export class PushNotificationsModule {
  static  forRoot(sender: string, publicVapidKey: string, privateVapidKey: string): DynamicModule {
      
    webPush.setVapidDetails(
        sender,
        publicVapidKey,
        privateVapidKey
      );

    const PushNotificationsProvider: Provider = {
        provide: 'WEB_PUSH',
        useValue: webPush
    }

    return{
        module: PushNotificationsModule,
        providers:[PushNotificationsProvider],
        exports: [PushNotificationsProvider],
        global: true
    }
  }
}
