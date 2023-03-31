import { CrudRepositoryInterface } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { BlogUserEntity } from './blog-user.entity';
import { UserInterface } from '@project/shared/app-types';
import { BlogUserModel } from './blog-user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogUserRepository implements CrudRepositoryInterface<BlogUserEntity, string, UserInterface> {
  constructor(
    @InjectModel(BlogUserModel.name) private readonly blogUserModel: Model<BlogUserModel>) {
  }

  public async create(item: BlogUserEntity): Promise<UserInterface> {
    const newBlogUser = new this.blogUserModel({...item, postsQty: 0, subscribersQty: 0});
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({id});
  }

  public async findById(id: string): Promise<UserInterface | null> {
    const result = this.blogUserModel
      .findOne({'_id': id})
      .exec();
    console.log(await result);
    return result;
  }

  public async findByEmail(email: string): Promise<UserInterface | null> {
    return this.blogUserModel
      .findOne({email})
      .exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<UserInterface> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), {new: true})
      .exec();
  }
}
