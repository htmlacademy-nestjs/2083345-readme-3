import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, ValidationPipe} from '@nestjs/common';
import {CreatePostTextDto} from './dto/create-post-text.dto';
import {ApiExtraModels, ApiResponse, ApiTags} from '@nestjs/swagger';
import {BlogPostService} from './blog-post.service';
import {PostRdo} from './rdo/post.rdo';
import {fillRdoForPost} from './utils/fill-rdo-for-post';
import {PostTextRdo} from './rdo/post-text.rdo';
import {PostImageRdo} from './rdo/post-image.rdo';
import {PostVideoRdo} from './rdo/post-video.rdo';
import {PostLinkRdo} from './rdo/post-link.rdo';
import {PostQuoteRdo} from './rdo/post-quote.rdo';
import {CreatePostDto} from './dto/create-post.dto';
import {CreatePostImageDto} from './dto/create-post-image.dto';
import {CreatePostVideoDto} from './dto/create-post-video.dto';
import {CreatePostLinkDto} from './dto/create-post-link.dto';
import {CreatePostQuoteDto} from './dto/create-post-quote.dto';
import {PostQuery} from './query/post.query';
import {CustomPostValidationPipe} from './validators/custom-post-validation.pipe';

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
  @Post('new')
  public async create(
    @Body()
      dto: CreatePostDto,
  ) {
    const newPost = await this.postService.create(dto);
    return fillRdoForPost(newPost);
  }

  @ApiResponse({
    type: PostRdo,
    isArray: true,
    status: HttpStatus.OK,
    description: 'Posts data provided.'
  })
  @Get('/')
  async index(@Query() query: PostQuery) {
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
  public async show(@Param('id') id: number) {
    const post = await this.postService.getById(id);
    return fillRdoForPost(post);
  }

  @ApiResponse({
    type: PostRdo,
    status: HttpStatus.CREATED,
    description: 'Post successfully updated.',
  })
  @Patch(':id')
  public async update(
    @Param('id')
      id: number,
    @Body()
      dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto
  ) {
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
  @Delete(':id')
  public async delete(@Param('id') id: number) {
    return await this.postService.remove(id);
  }
}
