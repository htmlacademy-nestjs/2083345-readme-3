import {ApiProperty} from '@nestjs/swagger';
import {ArrayMaxSize, IsEnum, IsOptional, Matches, MaxLength, MinLength} from 'class-validator';
import {PostStatusEnum, PostTypeEnum} from '@project/shared/app-types';
import {POST_BAD_TAGS} from '../../blog-post.const';

export class UpdatePostDto {
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
  @MaxLength(10, {each: true, message: POST_BAD_TAGS})
  @Matches(/^[A-Za-z]*[A-Za-z][A-Za-z0-9-. _]*$/g, {each: true, message: POST_BAD_TAGS})
  @ArrayMaxSize(8, {message: POST_BAD_TAGS})
  public tags?: string[];
}
