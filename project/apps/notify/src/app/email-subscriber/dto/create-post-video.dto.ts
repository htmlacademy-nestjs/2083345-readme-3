import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {IsString, IsUrl, Matches, MaxLength, MinLength} from 'class-validator';

export class CreatePostVideoDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Post video link',
    example: 'youtube.com/bbbbbbbbbbb'
  })
  @IsString()
  @IsUrl()
  @Matches(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/, )
  public videoLink: string;
}
