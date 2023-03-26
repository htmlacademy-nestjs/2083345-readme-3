import {ApiProperty} from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique email address',
    example: 'user@mail.com'
  })
  public email: string;

  @ApiProperty({
    description: 'User\'s name',
    example: 'Keksus'
  })
  public name: string;

  @ApiProperty({
    description: 'Avatar image (WIP)',
    example: ''
  })
  public avatar: string;

  @ApiProperty({
    description: 'User\'s password',
    example: '123456'
  })
  public password: string;
}
