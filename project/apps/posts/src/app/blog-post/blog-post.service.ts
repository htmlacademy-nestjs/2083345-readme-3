import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostTextDto} from './dto/create-post-text.dto';
import {CreatePostImageDto} from './dto/create-post-image.dto';
import {CreatePostVideoDto} from './dto/create-post-video.dto';
import {CreatePostLinkDto} from './dto/create-post-link.dto';
import {CreatePostQuoteDto} from './dto/create-post-quote.dto';
import {TypeEntityAdapterObject} from './utils/type-entity-adapter.object';
import dayjs from 'dayjs';
import {POST_NOT_FOUND_ERROR} from './blog-post.const';
import {BlogPostRepository} from './blog-post.repository';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository
  ) {}

  public async create(
    dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto
  ) {
    const blogPost = {
      ...dto,
      _authorId: '',
      _origAuthorId: '',
      creationDate: dayjs().toISOString(),
      postDate: dayjs().toISOString(),
      likesQty: 0,
      commentsQty: 0,
      isReposted: false
    };

    const postEntity = await new TypeEntityAdapterObject[blogPost.type](blogPost);

    return this.blogPostRepository
      .create(postEntity);
  }

  public async update(
    postId: number,
    dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto,
  ) {

    const blogPost = await this.getById(postId);
    const updatedPost = {...blogPost, ...dto}

    const postEntity = await new TypeEntityAdapterObject[updatedPost.type](updatedPost);

    return this.blogPostRepository
      .update(postId, postEntity);
  }

  public async getById(id: number) {
    const post = await this.blogPostRepository.findById(id);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }
    return post;
  }

  public async remove(
    postId: number,
  ) {
    return this.blogPostRepository
      .destroy(postId);
  }

}

