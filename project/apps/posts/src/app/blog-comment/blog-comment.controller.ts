import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {CommentRdo} from './rdo/comment.rdo';
import {CreateCommentDto} from './dto/create-comment.dto';
import {fillObject} from '@project/util/util-core';
import {BlogCommentService} from './blog-comment.service';
import {CommentQuery} from './query/comment.query';
import {JwtAuthGuard, CurrentUser} from '@project/util/util-auth';
import {TokenPayloadInterface} from '@project/shared/app-types';
import {COMMENT_NOT_CREATOR} from '../blog-post/blog-post.const';


@ApiTags('comments')
@Controller('comment')
export class BlogCommentController {
  constructor(
    private readonly commentService: BlogCommentService
  ) {
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: 'Comment successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  public async create(
    @CurrentUser() currentUser: TokenPayloadInterface,
    @Body() dto: CreateCommentDto
  ) {
    const newComment = await this.commentService.create(dto, currentUser);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.OK,
    description: 'Comment data provided.'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Post not found.'
  })
  @Get('post/:postId')
  public async showByPostId(
    @Param('postId')
      postId: number,
    @Query()
      query: CommentQuery
  ) {
    const comments = await this.commentService.getByPostId(postId, query);
    return fillObject(CommentRdo, comments);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment successfully deleted.',
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':commentId')
  public async remove(
    @CurrentUser() currentUser: TokenPayloadInterface,
    @Param('commentId') commentId: number,
  ) {
    const authorId = (await this.commentService.getById(commentId))._authorId
    if (authorId !== currentUser.sub) {
      throw new UnauthorizedException(COMMENT_NOT_CREATOR);
    }
    return await this.commentService.remove(commentId);
  }
}
