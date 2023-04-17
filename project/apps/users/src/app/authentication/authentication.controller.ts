import {Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';
import {fillObject} from '@project/util/util-core';
import {LoginUserDto} from './dto/login-user.dto';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {MongoidValidationPipe} from '@project/shared/shared-pipes';
import {JwtAuthGuard} from './strategies/jwt-auth.guard';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService
  ) {
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User already exists.',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    console.log(newUser);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Login successful.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login failed.',
  })
  @HttpCode(200)
  @Post('login')
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User data provided.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found.'
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existingUser = await this.authService.getUser(id);
    return fillObject(UserRdo, existingUser);
  }
}
