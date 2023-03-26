import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';

export class CreatePostVideoDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  public title: string;

  @ApiProperty({
    description: 'Post video link',
    example: 'https://youtube.com/aaaaaaa'
  })
  public videoLink: string;
}
