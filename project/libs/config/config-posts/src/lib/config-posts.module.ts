import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {jwtConfig} from '@project/config/config-users';
import rabbitConfig from './config/rabbit.config';
const ENV_POSTS_FILE_PATH = 'apps/posts/.posts.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [rabbitConfig, jwtConfig],
      envFilePath: ENV_POSTS_FILE_PATH,
    })
  ],
})
export class ConfigPostsModule {}
