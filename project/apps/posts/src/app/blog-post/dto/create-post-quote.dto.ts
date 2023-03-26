import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';

export class CreatePostQuoteDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post quote',
    example: 'Certified BRUH (c) moment.'
  })
  public quote: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Me.'
  })
  public author: string;
}
