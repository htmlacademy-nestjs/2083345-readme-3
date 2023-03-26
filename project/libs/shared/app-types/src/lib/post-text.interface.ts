import { PostInterface } from './post.interface';

export interface PostTextInterface extends PostInterface {
  title: string;
  announcement: string;
  text: string;
}
