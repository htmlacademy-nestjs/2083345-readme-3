import {IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';

export enum LikePostQueryActionEnum {
  Dislike = 0,
  Like = 1,
}

export const DEFAULT_POST_LIKE_ACTION = LikePostQueryActionEnum.Like

export class LikePostQuery {
  @Transform(({ value } ) => Number(value))
  @IsNumber()
  @IsOptional()
  public action = DEFAULT_POST_LIKE_ACTION;
}


