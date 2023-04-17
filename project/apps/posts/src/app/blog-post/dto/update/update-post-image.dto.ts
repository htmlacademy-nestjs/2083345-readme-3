import {ApiProperty} from '@nestjs/swagger';
import {UpdatePostDto} from './update-post.dto';
import {IsOptional, IsString, MaxLength, MinLength} from 'class-validator';

export class UpdatePostImageDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsOptional()
  @MinLength(20)
  @MaxLength(50)
  public title?: string;

  @ApiProperty({
    description: 'Post image link',
    example: '/imgs/image.png'
  })
  @IsOptional()
  @IsString()
  public imageLink?: string;
}
