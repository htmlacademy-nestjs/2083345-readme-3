import {ApiProperty} from '@nestjs/swagger';
import {IsInt, MaxLength, MinLength} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Commented post ID',
    example: 'hgrg-ergujhi3u4-gredsvr4'
  })
  @IsInt()
  public postId: number;

  @ApiProperty({
    description: 'Comment text',
    example: 'Commenting stuff'
  })
  @MinLength(10)
  @MaxLength(300)
  public text: string;
}
