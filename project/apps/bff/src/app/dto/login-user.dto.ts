import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength, MinLength} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@mail.com'
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  @IsString()
  @MinLength(6)
  @MaxLength(12)
  public password: string;
}
