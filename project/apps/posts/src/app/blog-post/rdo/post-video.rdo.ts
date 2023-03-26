import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';
import {Expose} from 'class-transformer';

export class PostVideoRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post video link',
    example: 'https://youtube.com/aaaaaaa'
  })
  @Expose()
  public videoLink: string;
}
