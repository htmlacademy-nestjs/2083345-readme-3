import {ApiProperty} from '@nestjs/swagger';
import {UpdatePostDto} from './update-post.dto';
import {IsOptional, IsUrl, MaxLength} from 'class-validator';

export class UpdatePostLinkDto extends UpdatePostDto {
  @ApiProperty({
    description: 'Post link',
    example: 'https://google.com/post.html'
  })
  @IsOptional()
  @IsUrl()
  public link?: string;

  @ApiProperty({
    description: 'Optional link description',
    example: 'Linky-link'
  })
  @IsOptional()
  @MaxLength(300)
  public description?: string;
}
