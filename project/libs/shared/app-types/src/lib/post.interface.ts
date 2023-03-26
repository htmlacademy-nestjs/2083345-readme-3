import {PostTypeEnum} from './post-type.enum';
import {PostStatusEnum} from './post-status.enum';

export interface PostInterface {
  _id?: string;
  _authorId?: string;
  _origAuthorId?: string;
  creationDate: string;
  postedDate: string;
  likesQty: number;
  commentsQty: number;
  type: PostTypeEnum;
  status: PostStatusEnum;
  isReposted: boolean;
  tags: string[];
}
