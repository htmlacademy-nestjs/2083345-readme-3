import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';
import {Expose} from 'class-transformer';

export class PostTextRdo extends PostRdo {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Wow!!!'
  })
  @Expose()
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Epic information'
  })
  @Expose()
  public text: string;
}
