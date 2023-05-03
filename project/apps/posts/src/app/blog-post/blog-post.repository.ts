import {BlogPostEntity} from './blog-post.entity';
import {LikeInterface, PostInterface, PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';
import {Injectable} from '@nestjs/common';
import {CrudRepositoryInterface} from '@project/util/util-types';
import {PrismaService} from '../prisma/prisma.service';
import {prismaToPost} from './utils/prisma-to-post';
import {GetPostsQuery} from './query/get-posts.query';
import {Like} from '@prisma/client';
import {LikePostQueryActionEnum} from './query/like-post.query';

@Injectable()
export class BlogPostRepository implements CrudRepositoryInterface<BlogPostEntity, number, PostInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogPostEntity): Promise<PostInterface> {
    const data = {
      ...item.toObject(),
      authorId: item._authorId,
      origAuthorId: item._origAuthorId
    }
    delete data._authorId;
    delete data._origAuthorId;

    const prismaPost = await this.prisma.post.create({ data });
    const prismaLike = await this.prisma.like.create({ data: {postId: prismaPost.postId, likedByUsersIds: []} })
    await this.prisma.emailNotify.create({data: {postId: prismaPost.postId}});

    return prismaToPost(prismaPost, prismaLike);
  }

  public async destroy(postId: number): Promise<void> {
    await this.prisma.post.delete({
      where: {
        postId,
      }
    });
  }

  public async findById(postId: number): Promise<PostInterface | null> {
    const post = await this.prisma.post.findFirst({
      where: {
        postId
      }
    });
    const prismaLike = await this.getLikesForPost(postId);
    return prismaToPost(post, prismaLike);
  }

  public async find(
    {limit, tag, type, sortBy, sortDirection, page}: GetPostsQuery,
    userIds: string[] = undefined
  ): Promise<PostInterface[]> {
    const queryObject = {
      where: {
        AND: {
          status: PostStatusEnum.Posted,
          type: type as PostTypeEnum,
          tags: undefined,
          authorId: undefined
        }
      },
      take: limit,
      include: {
        comments: true,
      },
      orderBy: [
        { [sortBy]: sortDirection }
      ],
      skip: page > 0 ? limit * (page - 1) : undefined,
    }
    if (tag) {
      queryObject.where.AND.tags = { has: tag };
    }
    if (userIds) {
      queryObject.where.AND.authorId = { in: userIds };
    }

    const posts = await this.prisma.post.findMany(queryObject);
    return await Promise.all(posts.map(async (post) => {
      const prismaLike = await this.getLikesForPost(post.postId);
      return prismaToPost(post, prismaLike)
    }))
  }

  public async update(postId: number, item: BlogPostEntity): Promise<PostInterface> {
    const data = {
      ...item.toObject(),
      authorId: item._authorId,
      origAuthorId: item._origAuthorId
    }
    delete data._id;
    delete data._authorId;
    delete data._origAuthorId;

    const post = await this.prisma.post.update({
      where: {
        postId
      },
      data: { ...data}
    });
    const prismaLike = await this.getLikesForPost(postId);
    return prismaToPost(post, prismaLike);
  }

  public async getLikesForPost(postId: number): Promise<Like> {
    return this.prisma.like.findFirst({
        where: {
          postId
        }
      });
  }

  public async repost(postId: number, userId: string): Promise<PostInterface> {
    const originalPost = await this.findById(postId);
    const data = {
      ...originalPost,
      authorId: userId,
      isReposted: true,
      origAuthorId: originalPost._origAuthorId
    }
    delete data._id
    delete data._authorId;
    delete data._origAuthorId;
    delete data.likesQty;

    const prismaPost = await this.prisma.post.create({ data });
    const prismaLike = await this.prisma.like.create({ data: {postId: prismaPost.postId, likedByUsersIds: []} })
    await this.prisma.emailNotify.create({data: {postId: prismaPost.postId}});

    const repost = prismaToPost(prismaPost, prismaLike);
    Object.keys(repost).forEach((k) => repost[k] == null && delete repost[k]);
    return repost
  }

  public async like(postId: number, userId: string, action: LikePostQueryActionEnum): Promise<LikeInterface> {
    let likesForPost: string[] = (await this.getLikesForPost(postId)).likedByUsersIds;
    if (action === LikePostQueryActionEnum.Like && !likesForPost.includes(userId)) {
      likesForPost.push(userId);
    }
    if (action === LikePostQueryActionEnum.Dislike && likesForPost.includes(userId)) {
      likesForPost = likesForPost.filter((id) => id !== userId)
    }
    await this.prisma.like.update({
      where: {
        postId
      },
      data: {
        likedByUsersIds: likesForPost
      }
    });
    return { postId, likedBy: likesForPost };
  }

  public async getNewsletterPosts() {
    const newsletterPostIds = (await this.prisma.emailNotify.findMany({})).map((id) => id.postId);
    return this.prisma.post.findMany({
      where: {postId: {in: newsletterPostIds},}
    });
  }

  public async clearPostNewsletterList() {
    return this.prisma.emailNotify.deleteMany({})
  }
}
