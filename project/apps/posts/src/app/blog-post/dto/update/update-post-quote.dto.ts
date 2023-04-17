import {ApiProperty} from '@nestjs/swagger';
import {UpdatePostDto} from './update-post.dto';
import {IsOptional, MaxLength, MinLength} from 'class-validator';

export class UpdatePostQuoteDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Post quote',
    example: 'Certified BRUH (c) moment.'
  })
  @IsOptional()
  @MinLength(20)
  @MaxLength(300)
  public quote?: string;

  @ApiProperty({
    description: 'Quote author',
    example: 'Me.'
  })
  @IsOptional()
  @MinLength(3)
  @MaxLength(50)
  public author?: string;
}
