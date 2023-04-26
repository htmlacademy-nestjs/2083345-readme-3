import { Module } from '@nestjs/common';
import { BlogUserModule } from './blog-user/blog-user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import {ConfigUsersModule, getMongooseOptions} from '@project/config/config-users';
import {MongooseModule} from '@nestjs/mongoose';
import {NotifyModule} from './notify/notify.module';

@Module({
  imports: [
    BlogUserModule,
    AuthenticationModule,
    ConfigUsersModule,
    MongooseModule.forRootAsync(getMongooseOptions()),
    NotifyModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
