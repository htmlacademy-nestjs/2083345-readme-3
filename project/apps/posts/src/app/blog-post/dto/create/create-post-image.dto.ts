import {ApiProperty} from '@nestjs/swagger';
import {CreatePostDto} from './create-post.dto';
import {IsString, MaxLength, MinLength, Validate} from 'class-validator';
import {ImageFormatValidator} from '../../validators/image-format.validator';

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
  @Validate(ImageFormatValidator)
  public imageLink: string;
}
