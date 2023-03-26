import { PostImageInterface } from '@project/shared/app-types';
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostImageEntity extends BlogPostEntity implements PostImageInterface {
  public title: string;
  public imageLink: string;

  constructor(blogPost: PostImageInterface) {
    super(blogPost);
    this.fillEntity(blogPost);
  }

  public fillEntity(blogPost: PostImageInterface) {
    this.title = blogPost.title;
    this.imageLink = blogPost.imageLink;
  }
}
