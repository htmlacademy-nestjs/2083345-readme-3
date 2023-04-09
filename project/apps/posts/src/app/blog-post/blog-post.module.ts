import { Module } from '@nestjs/common';
import {BlogPostController} from './blog-post.controller';
import {BlogPostService} from './blog-post.service';
import {BlogPostRepository} from './blog-post.repository';

@Module({
  providers: [BlogPostService, BlogPostRepository],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
@Module({})
export class BlogPostModule {}
