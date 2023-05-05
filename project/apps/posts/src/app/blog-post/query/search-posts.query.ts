import {IsInt, IsOptional, IsString} from 'class-validator';
import {Transform} from 'class-transformer';

export const POST_SEARCH_LIMIT = 50

export class SearchPostsQuery {
  @Transform(({value}) => decodeURIComponent(value))
  @IsString()
  public searchRequest: string;

  @IsInt()
  @IsOptional()
  public limit: number = POST_SEARCH_LIMIT;
}
