import {Controller, HttpStatus, Param, Post, Query, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtAuthGuard} from '@project/util/util-auth';
import {SubscribeUserQuery} from './query/subscribe-user.query';
import {BlogUserService} from './blog-user.service';

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
  @UseGuards(JwtAuthGuard)
  @Post(':id/subscribe')
  public async subscribe(
    @Query() query: SubscribeUserQuery,
    @Param('id') id: number
  ) {
    return await this.userService.subscribe(id, query.action);
  }
}
