import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';

export class CreatePostImageDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  public title: string;

  @ApiProperty({
    description: 'Post image link',
    example: '/imgs/image.png'
  })
  public imageLink: string;
}
