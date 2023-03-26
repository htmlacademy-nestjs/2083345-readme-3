import { CrudRepositoryInterface } from '@project/util/util-types';
import { BlogPostEntity } from './blog-post.entity';
import {
  PostImageInterface,
  PostInterface,
  PostLinkInterface, PostQuoteInterface,
  PostTextInterface,
  PostVideoInterface
} from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';


@Injectable()
export class BlogPostMemoryRepository implements CrudRepositoryInterface<BlogPostEntity, string, PostInterface> {
  private repository: {[key: string]: PostInterface} = {};

  public async create(item: BlogPostEntity): Promise<PostInterface> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    console.log(entry);
    return {...entry};
  }

  public async findById(id: string): Promise<PostInterface> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: BlogPostEntity): Promise<PostInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
