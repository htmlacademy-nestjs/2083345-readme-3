import {PostInterface, PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';
import {Like, Post} from '@prisma/client';

export function prismaToPost(prismaPost: Post | null, prismaLikes: Like): PostInterface {
  if (prismaPost) {
    const post = {
      ...prismaPost,
      postedDate: prismaPost.postedDate.toISOString(),
      creationDate: prismaPost.creationDate.toISOString(),
      type: prismaPost.type as PostTypeEnum,
      status: prismaPost.status as PostStatusEnum,
      likesQty: prismaLikes.likedByUsersIds.length,
      _id: prismaPost.postId,
      _origAuthorId: prismaPost.origAuthorId,
      _authorId: prismaPost.authorId,
    };
    delete post.postId;
    delete post.authorId;
    delete post.origAuthorId;

    return post;
  }
  return null;
}
