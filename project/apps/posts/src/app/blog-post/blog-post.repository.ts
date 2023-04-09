import { BlogPostEntity } from './blog-post.entity';
import { PostInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CrudRepositoryInterface } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { prismaPostToPost } from './utils/prisma-post-to-post';

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

    const post = await this.prisma.post.create({data});
    return prismaPostToPost(post);
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
    return prismaPostToPost(post);
  }

  public async find(ids: number[] = []): Promise<PostInterface[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        postId: {
          in: ids.length > 0 ? ids : undefined
        }
      }
    });
    return posts.map((item) => {
      return prismaPostToPost(item);
    })
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
    return prismaPostToPost(post);
  }
}
