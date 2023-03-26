import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';

export class CreatePostLinkDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post link',
    example: 'https://google.com/post.html'
  })
  public link: string;

  @ApiProperty({
    description: 'Optional link description',
    example: 'Linky-link'
  })
  public description: string;
}
