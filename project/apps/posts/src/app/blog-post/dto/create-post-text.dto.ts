import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';

export class CreatePostTextDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  public title: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Wow!!!'
  })
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Epic information'
  })
  public text: string;
}
