import {Comment} from '@prisma/client';
import {CommentInterface} from '@project/shared/app-types';

export function prismaCommentToComment(prismaComment: Comment | null): CommentInterface {
  if (prismaComment) {
    const comment = {
      ...prismaComment,
      postedDate: prismaComment.postedDate.toISOString(),
      _id: prismaComment.commentId,
      _authorId: prismaComment.authorId,
    };
    delete comment.commentId;
    delete comment.authorId;
    return comment;
  }
  return null;
}
