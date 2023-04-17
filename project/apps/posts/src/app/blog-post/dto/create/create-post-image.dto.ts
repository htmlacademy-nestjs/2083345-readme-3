import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {IsString, MaxLength, MinLength} from 'class-validator';

export class CreatePostImageDto extends CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @MinLength(20)
  @MaxLength(50)
  public title: string;

  @ApiProperty({
    description: 'Post image link',
    example: '/imgs/image.png'
  })
  @IsString()
  public imageLink: string;
}
