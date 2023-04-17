import {ApiProperty} from '@nestjs/swagger';
import {UpdatePostDto} from './update-post.dto';
import {IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength} from 'class-validator';
import {POST_NOT_YOUTUBE_URL} from '../../blog-post.const';

export class UpdatePostVideoDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title?: string;

  @ApiProperty({
    description: 'Post video link',
    example: 'youtube.com/bbbbbbbbbbb'
  })
  @IsOptional()
  @IsString()
  @IsUrl()
  @Matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/, {message: POST_NOT_YOUTUBE_URL})
  public videoLink?: string;
}
