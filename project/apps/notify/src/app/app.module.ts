import { Module } from '@nestjs/common';
import {getMongooseOptions} from '@project/util/util-core';
import {MongooseModule} from '@nestjs/mongoose';
import {ConfigNotifyModule} from '@project/config/config-notify';
import {EmailSubscriberModule} from './email-subscriber/email-subscriber.module';

@Module({
  imports: [
    ConfigNotifyModule,
    MongooseModule.forRootAsync(getMongooseOptions('application.db')),
    EmailSubscriberModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
