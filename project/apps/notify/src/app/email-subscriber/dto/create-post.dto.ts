import {ApiProperty} from '@nestjs/swagger';
import {ArrayMaxSize, IsEnum, IsOptional, Matches, MaxLength, MinLength} from 'class-validator';
import {PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';

export class CreatePostDto {
  @ApiProperty({
    description: 'Status (draft/posted)',
    example: 'draft'
  })
  @IsOptional()
  @IsEnum(PostStatusEnum)
  public status?: string;

  @ApiProperty({
    description: 'Fixed post type',
    example: 'video'
  })
  @IsEnum(PostTypeEnum)
  public type: string;

  @ApiProperty({
    description: 'Optional post tags',
    example: ['taggg1', 'taggg2', 'taggg3']
  })
  @IsOptional()
  @MinLength(3, {each: true})
  @MaxLength(10, {each: true})
  @Matches(/^[A-Za-z]*[A-Za-z][A-Za-z0-9-. _]*$/g, {each: true})
  @ArrayMaxSize(8, )
  public tags?: string[];
}
