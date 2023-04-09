export interface CommentInterface {
  _id?: number;
  _authorId?: string;
  postId: number;
  postedDate?: string;
  text: string;
}
