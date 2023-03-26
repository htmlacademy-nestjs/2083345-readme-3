import { PostLinkInterface } from '@project/shared/app-types';
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostLinkEntity extends BlogPostEntity implements PostLinkInterface {
  public link: string;
  public description: string;

  constructor(blogPost: PostLinkInterface) {
    super(blogPost);
    this.fillEntity(blogPost);
  }

  public fillEntity(blogPost: PostLinkInterface) {
    this.link = blogPost.link;
    this.description = blogPost.description;
  }
}
