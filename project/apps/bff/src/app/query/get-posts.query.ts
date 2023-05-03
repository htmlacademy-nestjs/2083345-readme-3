import {IsEnum, IsIn, IsMongoId, IsNumber, IsOptional, IsString, MaxLength, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
import {PostTypeEnum} from '@project/shared/app-types';

export const DEFAULT_POST_COUNT_LIMIT = 25;
export const DEFAULT_SORT_BY = 'creationDate';
export const DEFAULT_SORT_DIRECTION = 'desc';

export class GetPostsQuery {
  @Transform(({ value } ) => +value || DEFAULT_POST_COUNT_LIMIT)
  @IsNumber()
  @IsOptional()
  public limit = DEFAULT_POST_COUNT_LIMIT;

  @Transform(({ value }) => value.toLowerCase())
  @MinLength(3, {each: true})
  @MaxLength(10, {each: true})
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
