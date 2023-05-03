import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException, HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApplicationServiceURL} from './app.config';
import {PostRdo} from './rdo/post.rdo';
import {fillAuthorData} from './utils/fill-author-data.util';
import {GetPostsQuery} from './query/get-posts.query';
import {LikePostQuery} from './query/like-post.query';
import {ApiResponse} from '@nestjs/swagger';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    type: PostRdo,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Posts data provided.'
  })
  @Post('feed')
  async getFeed(
    @Req() req: Request,
    @Param('postId') postId,
    @Query() query: GetPostsQuery,
  ) {
    try {
      const subscribedTo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogUser}/subscriptions`, {
        headers: {
          'Authorization': req.headers['authorization']
        },
      })).data;
      const posts = (await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/by-users`,
        { ids: subscribedTo },
        { params: query }
      )).data;
      return await Promise.all(posts.map( (post) => fillAuthorData(post, this.httpService)));
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.statusCode)
    }
  }


  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.OK,
    description: 'Post data provided.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.'
  })
  @Get(':postId')
  public async getPost(@Param('postId') postId) {
    try {
      const post: PostRdo = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogPost}/${postId}`)).data;
      return await fillAuthorData(post, this.httpService);
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Post could not be deleted.'
  })
  @Delete(':postId')
  public async deletePost(
    @Req() req: Request,
    @Param('postId') postId
  ) {
    try {
      const { data } = await this.httpService.axiosRef.delete(`${ApplicationServiceURL.BlogPost}/${postId}`, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      });
      return data;
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
  })
  @Post('new')
  public async createPost(
    @Req() req: Request,
    @Body() createPostDto
  ) {
    try {
      const post = (await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/new`, createPostDto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })).data;
      return fillAuthorData(post, this.httpService);
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully updated.',
  })
  @Patch(':postId')
  public async updatePost(
    @Req() req: Request,
    @Param('postId') postId,
    @Body() updatePostDto
  ) {
    try {
      const post = (await this.httpService.axiosRef.patch(`${ApplicationServiceURL.BlogPost}/${postId}`, updatePostDto, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })).data;
      return fillAuthorData(post, this.httpService);
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
  }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post successfully reposted.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'You cannot repost your own posts.'
  })
  @Post(':postId/repost')
  public async repost(
    @Req() req: Request,
    @Param('postId') postId,
  ) {
    try {
      const post = (await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/${postId}/repost`, null, {
        headers: {
          'Authorization': req.headers['authorization']
        }
      })).data;
      return fillAuthorData(post, this.httpService);
    } catch (err) {
      throw new HttpException(err.response.statusText, err.response.status);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post successfully liked/disliked.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Post could not be liked/disliked.'
  })
  @Post(':postId/like')
  public async likePost(
    @Req() req: Request,
    @Param('postId') postId,
    @Query() query: LikePostQuery,
  ) {
    try {
      const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/${postId}/like`, null, {
        headers: {
          'Authorization': req.headers['authorization']
        },
        params: query
      });
      return data;
    } catch (err) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Newsletter sent.',
  })
  @Post('news')
  public async sendNewsletters(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.BlogPost}/news`, null, {
      headers: {
        'Authorization': req.headers['authorization']
      }
    });
    return data;
  }

  @ApiResponse({
    type: PostRdo,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Posts data provided.'
  })
  @Get('/')
  public async getPosts(
    @Query() query: GetPostsQuery
  ) {
    const posts: PostRdo[] = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.BlogPost}`, {
      params: query
    })).data;
    return await Promise.all(posts.map( (post) => fillAuthorData(post, this.httpService)));
  }
}
