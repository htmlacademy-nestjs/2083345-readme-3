import { Expose } from 'class-transformer';
import {ApiProperty} from '@nestjs/swagger';

export class UserRdo {
  @ApiProperty({
    description: 'Unique user ID',
    example: '7aef6925-4fe5-4057-b5cc-cc7cf214df05'
  })
  @Expose({ name: '_id' })
  public id: string;

  @ApiProperty({
    description: 'Unique user email',
    example: 'user@mail.com'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keksus'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Avatar image (WIP)',
    example: ''
  })
  @Expose()
  public avatar: string;
}
