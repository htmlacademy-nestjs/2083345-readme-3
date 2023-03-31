import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {UserInterface} from '@project/shared/app-types';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements UserInterface {
  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
  })
  public name: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop()
  public registrationDate: string;

  @Prop({
    required: true,
    type: Number,
  })
  public postsQty: number;

  @Prop({
    required: true,
    type: Number,
  })
  public subscribersQty: number;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
