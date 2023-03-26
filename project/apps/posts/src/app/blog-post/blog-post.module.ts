import { Module } from '@nestjs/common';
import {BlogPostController} from './blog-post.controller';
import {BlogPostService} from './blog-post.service';
import {BlogPostMemoryRepository} from './blog-post-memory.repository';

@Module({
  providers: [BlogPostService, BlogPostMemoryRepository],
  controllers: [BlogPostController],
  exports: [BlogPostService]
})
@Module({})
export class BlogPostModule {}
