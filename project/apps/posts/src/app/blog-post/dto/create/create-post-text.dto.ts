import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {IsString, MaxLength, MinLength} from 'class-validator';

export class CreatePostTextDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Wow!!!'
  })
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  public announcement: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Epic information'
  })
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  public text: string;
}
