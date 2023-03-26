import { PostQuoteInterface } from '@project/shared/app-types';
import { BlogPostEntity } from './blog-post.entity';

export class BlogPostQuoteEntity extends BlogPostEntity implements PostQuoteInterface {
  public quote: string;
  public quoteAuthor: string;

  constructor(blogPost: PostQuoteInterface) {
    super(blogPost);
    this.fillEntity(blogPost);
  }

  public fillEntity(blogPost: PostQuoteInterface) {
    this.quote = blogPost.quote;
    this.quoteAuthor = blogPost.quoteAuthor;
  }
}
