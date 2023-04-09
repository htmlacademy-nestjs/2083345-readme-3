import {CommentInterface} from '@project/shared/app-types';

export class BlogCommentEntity implements CommentInterface {
  public _id?: number;
  public _authorId?: string;
  public postId: number;
  public postedDate: string;
  public text: string;

  constructor(blogComment: CommentInterface) {
    this._id = blogComment._id;
    this._authorId = blogComment._authorId;
    this.postId = blogComment.postId;
    this.postedDate = blogComment.postedDate;
    this.text = blogComment.text;
  }

  public toObject() {
    return {...this};
  }
}
