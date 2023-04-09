import { Module } from '@nestjs/common';
import {BlogCommentController} from './blog-comment.controller';
import {BlogCommentService} from './blog-comment.service';
import {BlogPostModule} from '../blog-post/blog-post.module';
import {BlogCommentRepository} from './blog-comment.repository';

@Module({
  imports: [BlogPostModule],
  providers: [BlogCommentService, BlogCommentRepository],
  controllers: [BlogCommentController],
  exports: [BlogCommentService]
})
@Module({})
export class BlogCommentModule {}
