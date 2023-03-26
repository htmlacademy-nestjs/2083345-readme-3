import {ApiProperty} from '@nestjs/swagger';
import {Expose} from 'class-transformer';
import {PostRdo} from './post.rdo';

export class PostImageRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post image link',
    example: '/imgs/image.png'
  })
  @Expose()
  public imageLink: string;
}


