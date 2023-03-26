import { PostVideoInterface } from '@project/shared/app-types';
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostVideoEntity extends BlogPostEntity implements PostVideoInterface {
  public title: string;
  public videoLink: string;

  constructor(blogPost: PostVideoInterface) {
    super(blogPost);
    this.fillEntity(blogPost);
  }

  public fillEntity(blogPost: PostVideoInterface) {
    this.title = blogPost.title;
    this.videoLink = blogPost.videoLink;
  }
}
