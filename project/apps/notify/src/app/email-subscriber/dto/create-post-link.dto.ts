import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {IsUrl, MaxLength} from 'class-validator';

export class CreatePostLinkDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post link',
    example: 'https://google.com/post.html'
  })
  @IsUrl()
  public link: string;

  @ApiProperty({
    description: 'Optional link description',
    example: 'Linky-link'
  })
  @MaxLength(300)
  public description: string;
}
