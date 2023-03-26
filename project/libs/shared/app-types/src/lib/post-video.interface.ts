import { PostInterface } from './post.interface';

export interface PostVideoInterface extends PostInterface {
  title: string;
  videoLink: string;
}
