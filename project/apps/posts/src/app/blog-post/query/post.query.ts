import {IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
import {DEFAULT_POST_COUNT_LIMIT, DEFAULT_SORT_BY, DEFAULT_SORT_DIRECTION, POST_BAD_TAGS} from '../blog-post.const';
import {PostTypeEnum} from '@project/shared/app-types';

export class PostQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => value.toLowerCase())
  @MinLength(3, {each: true})
  @MaxLength(10, {each: true, message: POST_BAD_TAGS})
  @IsOptional()
  public tag?: string;

  @IsString()
  @IsMongoId()
  @IsOptional()
  public user?: string;

  @IsEnum(PostTypeEnum)
  @IsOptional()
  public type?: string;

  @IsIn(['creationDate', 'likesQty', 'commentsQty'])
  @IsOptional()
  public sortBy?: 'creationDate' | 'likesQty' | 'commentsQty' = DEFAULT_SORT_BY;

  @IsIn(['asc', 'desc'])
  @IsOptional()
  public sortDirection: 'desc' | 'asc' = DEFAULT_SORT_DIRECTION;

  @Transform(({ value }) => +value)
  @IsOptional()
  public page: number;
}
