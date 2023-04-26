import { Inject, Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { rabbitConfig } from '@project/config/config-posts';
import { ConfigType } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';
import { Post } from '@prisma/client';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    @Inject(rabbitConfig.KEY)
    private readonly rabbitOptions: ConfigType<typeof rabbitConfig>,
  ) {}

  public async initPostNewsletter(posts: Post[]) {
    await this.rabbitClient.publish(
      this.rabbitOptions.exchange,
      RabbitRouting.InitNewsletter,
      [...posts]
    );
  }
}
