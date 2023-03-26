import { ApiProperty } from "@nestjs/swagger";
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment ID',
    example: 'hgrg-ergujhi3u4-gredsvr4'
  })
  @Expose({name: '_id'})
  public id: string;

  @ApiProperty({
    description: 'Commented post ID',
    example: 'hgrg-ergujhi3u4-gredsvr4'
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Author ID',
    example: 'hgrg-ergujhi3u4-gredsvr4'
  })
  @Expose({name: '_authorId'})
  public authorId: string;

  @ApiProperty({
    description: 'Comment post date (ISO)',
    example: '2000-10-31T01:30:00.000-05:00'
  })
  @Expose()
  public postedDate: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Commenting stuff'
  })
  @Expose()
  public text: string;
}


