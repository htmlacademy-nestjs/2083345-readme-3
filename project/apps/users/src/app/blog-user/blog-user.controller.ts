import {Controller, Get, HttpException, HttpStatus, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {CurrentUser, JwtAuthGuard} from '@project/util/util-auth';
import {SubscribeToUserQuery} from './query/subscribe-to-user.query';
import {BlogUserService} from './blog-user.service';
import {TokenPayloadInterface} from '@project/shared/app-types';
import {string} from 'joi';
import {UserRdo} from '../authentication/rdo/user.rdo';
import {MongoidValidationPipe} from '@project/shared/shared-pipes';
import {fillObject} from '@project/util/util-core';

@ApiTags('user')
@Controller('user')
export class BlogUserController {
  constructor(
    private readonly userService: BlogUserService,
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Subscribe/unsubscrube successful.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Subscribe/unsubscrube unsuccessful.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'You cannot subscribe to yourself.',
  })
  @UseGuards(JwtAuthGuard)
  @Post(':userId/subscribe')
  public async subscribe(
    @Query() query: SubscribeToUserQuery,
    @Param('userId') userId: string,
    @CurrentUser() currentUser: TokenPayloadInterface,
  ) {
    if (userId === currentUser.sub) {
      throw new HttpException('You cannot subscribe to yourself.', HttpStatus.BAD_REQUEST)
    }
    return await this.userService.subscribe(userId, currentUser.sub, query);
  }

  @ApiResponse({
    type: string,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Subscriptions (user ids) provided.',
  })
  @UseGuards(JwtAuthGuard)
  @Get('subscriptions')
  public async getSubscriptions(
    @CurrentUser() currentUser: TokenPayloadInterface,
  ) {
    return (await this.userService.getUser(currentUser.sub)).subscribedTo;
  }

  @ApiResponse({
    type: UserRdo,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Subscribers provided.',
  })
  @Get(':userId/subscribers')
  public async getSubscribers(
    @Param('userId') userId: string,
  ) {
    return await this.userService.getSubscribers(userId);
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
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existingUser = await this.userService.getUser(id);
    return fillObject(UserRdo, existingUser);
  }
}
