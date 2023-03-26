import { PostInterface } from './post.interface';

export interface PostLinkInterface extends PostInterface {
  link: string;
  description?: string;
}
