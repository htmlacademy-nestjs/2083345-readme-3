import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {PostInterface, RabbitRouting} from '@project/shared/app-types';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify',
  })
  public async createSubscriber(subscriber: CreateSubscriberDto) {
    await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendNotifyNewSubscriber(subscriber);
  }

  @RabbitSubscribe({
    exchange: 'readme.notify',
    routingKey: RabbitRouting.InitNewsletter,
    queue: 'readme.notify',
  })
  public async initNewsletter(
    posts: PostInterface[]
  ) {
    const recipients = await this.subscriberService.getSubscribers()
    if (posts.length > 0 && recipients.length > 0) {
      await this.mailService.sendNewPostsNewsletter(recipients, posts);
    }
  }
}
