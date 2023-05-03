import {Body, Controller, Delete, Get, Param, Post, Req} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApplicationServiceURL} from './app.config';
import {CreateCommentDto} from './dto/create-comment.dto';


@Controller('comments')
export class CommentsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get('post/:postId')
  public async getCommentsByPostId(@Param('postId') postId) {
    const { data } = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogComment}/post/${postId}`));
    return data
  }

  @Post('new')
  public async createComment(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogComment}/new`, createCommentDto, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @Delete(':commentId')
  public async deleteComment(
    @Req() req: Request,
    @Param('commentId') commentId
  ) {
    const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.BlogComment}/${commentId}`, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }
}
