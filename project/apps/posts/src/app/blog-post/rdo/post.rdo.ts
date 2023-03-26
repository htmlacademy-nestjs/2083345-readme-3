import {ApiProperty} from '@nestjs/swagger';
import {Expose, Type} from 'class-transformer';
import {UserRdo} from './user.rdo';

export class PostRdo {
  @ApiProperty({
    description: 'Optional post tags',
    example: ['tag1', 'tag2', 'tag3']
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Post id',
    example: 'dfgs-235rbfgh-35efvhnds'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Author id',
    example: 'dfgs-235rbfgh-35efvhnds'
  })
  @Expose()
  @Type(() => UserRdo)
  public author: UserRdo;

  @ApiProperty({
    description: 'Original author id',
    example: 'dfgs-235rbfgh-35efvhnds'
  })
  @Expose()
  @Type(() => UserRdo)
  public origAuthor: UserRdo;

  @ApiProperty({
    description: 'Creation date',
    example: '2000-10-31T01:30:00.000-05:00'
  })
  @Expose()
  public creationDate: string;

  @ApiProperty({
    description: 'Post date',
    example: '2000-10-31T01:30:00.000-05:00'
  })
  @Expose()
  public postedDate: string;

  @ApiProperty({
    description: 'Number of likes',
    example: 53
  })
  @Expose()
  public likesQty: number;

  @ApiProperty({
    description: 'Number of comments',
    example: 4
  })
  @Expose()
  public commentsQty: number;

  @ApiProperty({
    description: 'Post type (enum)',
    example: 'text'
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Post status',
    example: 'draft'
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Repost flag',
    example: false
  })
  @Expose()
  public isReposted: boolean;
}


