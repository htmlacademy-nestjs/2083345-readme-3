import { BlogCommentEntity } from './blog-comment.entity';
import { CommentInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import {prismaCommentToComment} from './utils/prisma-comment-to-comment';
import {CommentQuery} from './query/comment.query';

@Injectable()
export class BlogCommentRepository implements CrudRepositoryInterface<BlogCommentEntity, number, CommentInterface> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: BlogCommentEntity): Promise<CommentInterface> {
    const data = {
      ...item.toObject(),
      authorId: item._authorId,
    }
    delete data._authorId;
    delete data._id;

    const comment = await this.prisma.comment.create({data});
    const postedDate = comment.postedDate.toISOString();
    return {...comment, postedDate}
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      }
    });
  }

  public async findById(commentId: number): Promise<CommentInterface | null> {
    const comment = await this.prisma.comment.findFirst({
      where: {
        commentId
      }
    });
    return prismaCommentToComment(comment);
  }

  public async findByPostId(postId: number, {limit, page}: CommentQuery): Promise<CommentInterface[]> {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId
      },
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
    return comments.map((item) => {
      return prismaCommentToComment(item);
    })
  }

  public async update(commentId: number, item: BlogCommentEntity): Promise<CommentInterface> {
    const comment = await this.prisma.comment.update({
      where: {
        commentId
      },
      data: {...item.toObject(), commentId}
    });
    return prismaCommentToComment(comment);

  }
}
