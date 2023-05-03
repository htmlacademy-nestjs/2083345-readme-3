import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {LoginUserDto} from './dto/login-user.dto';
import {ApplicationServiceURL} from './app.config';
import {AxiosExceptionFilter} from './filters/axios-exception.filter';
import {CreateUserDto} from './dto/create-user.dto';
import {ApiResponse} from '@nestjs/swagger';
import {UserRdo} from '../../../users/src/app/authentication/rdo/user.rdo';
import {LoggedUserRdo} from '../../../users/src/app/authentication/rdo/logged-user.rdo';
import {SubscribeToUserQuery} from '../../../users/src/app/blog-user/query/subscribe-to-user.query';

@Controller('users')
@UseFilters(AxiosExceptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'Login successful.'
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Login failed.',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/login`, loginUserDto);
      return data;
    } catch (err) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

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
  public async register(@Body() createUserDto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/register`, createUserDto);
    return data;
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
  @Get(':id')
  public async getUser(
    @Req() req: Request,
    @Param('id') id: string,
  ) {
    const userData = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/${id}`)).data;
    const postsQty = (await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.BlogPost}/by-users`,
      {ids: [id]})
    ).data.length;
    const subscribersQty = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/${id}/get-subscribers`)).data.length;
    return {...userData, postsQty, subscribersQty};
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access/refresh tokens'
  })
  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Auth}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get new access/refresh tokens'
  })
  @Post(':userId/subscribe')
  public async subscribeToUser(
    @Req() req: Request,
    @Query() query: SubscribeToUserQuery,
    @Param('userId') userId: string,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogUser}/${userId}/subscribe`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      },
      params: query,
    });
    return data;
  }
}
