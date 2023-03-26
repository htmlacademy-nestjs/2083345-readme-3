import { PostTextInterface } from '@project/shared/app-types';
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostTextEntity extends BlogPostEntity implements PostTextInterface {
  public title: string;
  public announcement: string;
  public text: string;

  constructor(blogPost: PostTextInterface) {
    super(blogPost);
    this.fillEntity(blogPost);
  }

  public fillEntity(blogPost: PostTextInterface) {
    this.title = blogPost.title;
    this.announcement = blogPost.announcement;
    this.text = blogPost.text;
  }
}
