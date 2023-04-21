import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import {CreatePostTextDto} from './dto/create/create-post-text.dto';
import {ApiExtraModels, ApiResponse, ApiTags} from '@nestjs/swagger';
import {BlogPostService} from './blog-post.service';
import {PostRdo} from './rdo/post.rdo';
import {fillRdoForPost} from './utils/fill-rdo-for-post';
import {PostTextRdo} from './rdo/post-text.rdo';
import {PostImageRdo} from './rdo/post-image.rdo';
import {PostVideoRdo} from './rdo/post-video.rdo';
import {PostLinkRdo} from './rdo/post-link.rdo';
import {PostQuoteRdo} from './rdo/post-quote.rdo';
import {CreatePostDto} from './dto/create/create-post.dto';
import {CreatePostImageDto} from './dto/create/create-post-image.dto';
import {CreatePostVideoDto} from './dto/create/create-post-video.dto';
import {CreatePostLinkDto} from './dto/create/create-post-link.dto';
import {CreatePostQuoteDto} from './dto/create/create-post-quote.dto';
import {GetPostsQuery} from './query/get-posts.query';
import {CustomCreatePostValidationPipe} from './validators/custom-create-post-validation.pipe';
import {CustomUpdatePostValidationPipe} from './validators/custom-update-post-validation.pipe';
import {UpdatePostDto} from './dto/update/update-post.dto';
import {LikePostQuery} from './query/like-post.query';
import {CurrentUser, JwtAuthGuard} from '@project/util/util-auth';
import {TokenPayloadInterface} from '@project/shared/app-types';
import {POST_NOT_CREATOR} from './blog-post.const';

@ApiTags('posts')
@ApiExtraModels(
  PostRdo,
  PostTextRdo,
  PostImageRdo,
  PostVideoRdo,
  PostLinkRdo,
  PostQuoteRdo
)
@ApiExtraModels(
  CreatePostDto,
  CreatePostTextDto,
  CreatePostImageDto,
  CreatePostVideoDto,
  CreatePostLinkDto,
  CreatePostQuoteDto
)
@Controller('post')
export class BlogPostController {
  constructor(
    private readonly postService: BlogPostService
  ) {
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully created.',
  })
  @UseGuards(JwtAuthGuard)
  @Post('new')
  public async create(
    @CurrentUser() currentUser: TokenPayloadInterface,
    @Body(CustomCreatePostValidationPipe)
      dto: CreatePostDto,
  ) {
    const newPost = await this.postService.create(dto, currentUser);
    return fillRdoForPost(newPost);
  }

  @ApiResponse({
    type: PostRdo,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Posts data provided.'
  })
  @Get('/')
  async show(@Query() query: GetPostsQuery) {
    const posts = await this.postService.get(query);
    return posts.map((post) => fillRdoForPost(post));
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
  @Get(':id')
  public async showById(@Param('id') id: number) {
    const post = await this.postService.getById(id);
    return fillRdoForPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  public async update(
    @CurrentUser() currentUser: TokenPayloadInterface,
    @Param('id')
      id: number,
    @Body(CustomUpdatePostValidationPipe)
      dto: UpdatePostDto
  ) {
    const authorId = (await this.postService.getById(id))._authorId
    if (authorId !== currentUser.sub) {
      throw new UnauthorizedException(POST_NOT_CREATOR);
    }

    const updatedPost = await this.postService.update(id, dto);
    return fillRdoForPost(updatedPost);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post successfully deleted.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Post could not be deleted.'
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(
    @CurrentUser() currentUser: TokenPayloadInterface,
    @Param('id') id: number
  ) {
    const authorId = (await this.postService.getById(id))._authorId
    if (authorId !== currentUser.sub) {
      throw new UnauthorizedException(POST_NOT_CREATOR);
    }
    return await this.postService.remove(id);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Post successfully liked/disliked.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Post could not be liked/disliked.'
  })
  @UseGuards(JwtAuthGuard)
  @Post(':id/like')
  public async like(
    @Query() query: LikePostQuery,
    @Param('id') id: number
  ) {
    return await this.postService.like(id, query.action);
  }
}
