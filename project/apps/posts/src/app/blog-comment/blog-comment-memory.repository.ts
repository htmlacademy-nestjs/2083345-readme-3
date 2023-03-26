import { CrudRepositoryInterface } from '@project/util/util-types';
import { BlogCommentEntity } from './blog-comment.entity';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CommentInterface } from '@project/shared/app-types';


@Injectable()
export class BlogCommentMemoryRepository implements CrudRepositoryInterface<BlogCommentEntity, string, CommentInterface> {
  private repository: {[key: string]: CommentInterface} = {};

  public async create(item: BlogCommentEntity): Promise<CommentInterface> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    console.log(entry);
    return {...entry};
  }

  public async findById(id: string): Promise<CommentInterface> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: BlogCommentEntity): Promise<CommentInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
