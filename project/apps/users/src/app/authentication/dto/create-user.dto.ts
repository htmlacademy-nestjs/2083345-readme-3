import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';
import {AUTH_USER_EMAIL_NOT_VALID} from '../authentication.const';

export class CreateUserDto {
  @ApiProperty({
    description: 'Unique email address',
    example: 'user@mail.com',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User\'s name',
    example: 'Keksus'
  })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
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
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;
}
