import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';

@Module({
  imports: [BlogPostModule, BlogCommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
