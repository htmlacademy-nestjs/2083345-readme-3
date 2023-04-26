import { Module } from '@nestjs/common';
import { BlogPostModule } from './blog-post/blog-post.module';
import { BlogCommentModule } from './blog-comment/blog-comment.module';
import { PrismaModule } from './prisma/prisma.module';
import {ConfigPostsModule} from '@project/config/config-posts';

@Module({
  imports: [
    BlogPostModule,
    BlogCommentModule,
    PrismaModule,
    ConfigPostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
