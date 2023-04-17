import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {MaxLength, MinLength} from 'class-validator';

export class CreatePostQuoteDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post quote',
    example: 'Certified BRUH (c) moment.'
  })
  @MinLength(20)
  @MaxLength(300)
  public quote: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Me.'
  })
  @MinLength(3)
  @MaxLength(50)
  public author: string;
}
