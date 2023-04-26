import { Module } from '@nestjs/common';
import {BlogPostController} from './blog-post.controller';
import {BlogPostService} from './blog-post.service';
import {BlogPostRepository} from './blog-post.repository';
import {JwtAccessStrategy} from '@project/util/util-auth';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import {getJwtOptions} from '@project/config/config-posts';
import {BlogCommentRepository} from '../blog-comment/blog-comment.repository';
import {NotifyModule} from '../notify/notify.module';

@Module({
  imports: [
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule
  ],
  providers: [BlogPostService, BlogPostRepository, BlogCommentRepository, JwtAccessStrategy],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
export class BlogPostModule {}
