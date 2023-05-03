import {Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards} from '@nestjs/common';
import {AuthenticationService} from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import {UserRdo} from './rdo/user.rdo';
import {fillObject} from '@project/util/util-core';
import {LoggedUserRdo} from './rdo/logged-user.rdo';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {NotifyService} from '../notify/notify.service';
import {LocalAuthGuard} from './guards/local-auth.guard';
import {RequestWithUserInterface} from '@project/shared/app-types';
import {JwtRefreshGuard} from './guards/jwt-refresh.guard';
import {BlogUserService} from '../blog-user/blog-user.service';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly userService: BlogUserService,
    private readonly notifyService: NotifyService,
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
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name })
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
  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  public async login(@Req() { user }: RequestWithUserInterface) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access/refresh tokens'
  })
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  public async refreshToken(@Req() { user }: RequestWithUserInterface) {
    return this.authService.createUserToken(user);
  }
}
