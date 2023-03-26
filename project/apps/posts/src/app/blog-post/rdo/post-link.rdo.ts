import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';
import {Expose} from 'class-transformer';

export class PostLinkRdo extends PostRdo {
  @ApiProperty({
    description: 'Post link',
    example: 'https://google.com/post.html'
  })
  @Expose()
  public link: string;

  @ApiProperty({
    description: 'Optional link description',
    example: 'Linky-link'
  })
  @Expose()
  public description: string;
}
