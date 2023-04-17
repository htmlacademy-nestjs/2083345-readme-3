import {ApiProperty} from '@nestjs/swagger';
import {UpdatePostDto} from './update-post.dto';
import {IsOptional, IsString, MaxLength, MinLength} from 'class-validator';

export class UpdatePostTextDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Awesome post'
  })
  @IsOptional()
  @IsString()
  @MinLength(20)
  @MaxLength(50)
  public title?: string;

  @ApiProperty({
    description: 'Post announcement',
    example: 'Wow!!!'
  })
  @IsOptional()
  @IsString()
  @MinLength(50)
  @MaxLength(255)
  public announcement?: string;

  @ApiProperty({
    description: 'Post text',
    example: 'Epic information'
  })
  @IsOptional()
  @IsString()
  @MinLength(100)
  @MaxLength(1024)
  public text?: string;
}
