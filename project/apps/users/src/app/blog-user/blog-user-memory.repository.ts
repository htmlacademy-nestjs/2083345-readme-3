import { CrudRepositoryInterface } from '@project/util/util-types';
import { BlogUserEntity } from './blog-user.entity';
import { UserInterface } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class BlogUserMemoryRepository implements CrudRepositoryInterface<BlogUserEntity, string, UserInterface> {
  private repository: {[key: string]: UserInterface} = {};

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const entry = { ...item.toObject(), _id: randomUUID()};
    this.repository[entry._id] = entry;

    return {...entry};
  }

  public async findById(id: string): Promise<UserInterface> {
    if (this.repository[id]) {
      return {...this.repository[id]};
    }

    return null;
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    const existUserInterface = Object.values(this.repository)
      .find((userInterfaceItem) => userInterfaceItem.email === email);

    if (! existUserInterface) {
      return null;
    }

    return { ...existUserInterface};
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    this.repository[id] = {...item.toObject(), _id: id};
    return this.findById(id);
  }
}
