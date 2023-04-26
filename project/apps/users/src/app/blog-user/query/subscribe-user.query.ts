import {IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';
import {DEFAULT_USER_SUBSCRIBE_ACTION} from '../blog-user.const';

export class SubscribeUserQuery {
  @Transform(({ value } ) => +value || DEFAULT_USER_SUBSCRIBE_ACTION)
  @IsNumber()
  @IsOptional()
  public action = DEFAULT_USER_SUBSCRIBE_ACTION;
}
