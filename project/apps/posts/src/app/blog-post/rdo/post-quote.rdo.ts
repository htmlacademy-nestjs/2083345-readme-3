import {ApiProperty} from '@nestjs/swagger';
import {PostRdo} from './post.rdo';
import {Expose} from 'class-transformer';

export class PostQuoteRdo extends PostRdo {
  @ApiProperty({
    description: 'Post quote',
    example: 'Certified BRUH (c) moment.'
  })
  @Expose()
  public quote: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Me.'
  })
  @Expose()
  public quoteAuthor: string;
}
