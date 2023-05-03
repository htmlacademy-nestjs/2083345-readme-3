import {IsNumber, IsOptional} from 'class-validator';
import { Transform } from 'class-transformer';

export enum SubscribeToUserQueryActionEnum {
  Unsub = 0,
  Sub = 1,
}

export const DEFAULT_USER_SUBSCRIBE_ACTION = SubscribeToUserQueryActionEnum.Sub;


export class SubscribeToUserQuery {
  @Transform(({ value } ) => Number(value))
  @IsNumber()
  @IsOptional()
  public action = DEFAULT_USER_SUBSCRIBE_ACTION;
}
