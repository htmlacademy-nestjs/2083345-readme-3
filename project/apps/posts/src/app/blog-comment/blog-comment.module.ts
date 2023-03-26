import { Module } from '@nestjs/common';
import {BlogCommentController} from './blog-comment.controller';
import {BlogCommentService} from './blog-comment.service';
import {BlogPostModule} from '../blog-post/blog-post.module';
import {BlogCommentMemoryRepository} from './blog-comment-memory.repository';

@Module({
  imports: [BlogPostModule],
  providers: [BlogCommentService, BlogCommentMemoryRepository],
  controllers: [BlogCommentController],
  exports: [BlogCommentService]
})
@Module({})
export class BlogCommentModule {}
