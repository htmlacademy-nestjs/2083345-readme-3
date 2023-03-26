import {ApiProperty} from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Commented post ID',
    example: 'hgrg-ergujhi3u4-gredsvr4'
  })
  public postId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Commenting stuff'
  })
  public text: string;
}
