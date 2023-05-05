import {Injectable, NotFoundException} from '@nestjs/common';
import {TypeEntityAdapterObject} from './utils/type-entity-adapter.object';
import dayjs from 'dayjs';
import {POST_NOT_FOUND_ERROR} from './blog-post.const';
import {BlogPostRepository} from './blog-post.repository';
import {PostInterface, PostStatusEnum, TokenPayloadInterface} from '@project/shared/app-types';
import {GetPostsQuery} from './query/get-posts.query';
import {CreatePostDto} from './dto/create/create-post.dto';
import {UpdatePostDto} from './dto/update/update-post.dto';
import {LikePostQuery} from './query/like-post.query';
import {CommentQuery} from '../blog-comment/query/comment.query';
import {BlogCommentRepository} from '../blog-comment/blog-comment.repository';
import {SearchPostsQuery} from './query/search-posts.query';


@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCommentRepository: BlogCommentRepository,
  ) {}

  public async create(
    dto: CreatePostDto,
    user: TokenPayloadInterface
  ) {
    const blogPost = {
      status: PostStatusEnum.Posted,
      ...dto,
      tags: [...new Set(dto.tags.map((tag) => tag.toLowerCase()))],
      _authorId: user.sub,
      _origAuthorId: user.sub,
      creationDate: dayjs().toISOString(),
      postDate: dayjs().toISOString(),
      likedByIds: [] as string[],
      isReposted: false
    };

    const postEntity = await new TypeEntityAdapterObject[blogPost.type](blogPost);

    return this.blogPostRepository
      .create(postEntity);
  }

  public async update(
    postId: number,
    dto: UpdatePostDto,
  ) {

    const blogPost = await this.getById(postId);
    const updatedPost = {...blogPost, ...dto}

    const postEntity = await new TypeEntityAdapterObject[updatedPost.type](updatedPost);
    const comments = await this.blogCommentRepository.findByPostId(postId, new CommentQuery())
    return {...await this.blogPostRepository.update(postId, postEntity), commentsQty: comments.length};
  }

  public async getById(postId: number) {
    const post = await this.blogPostRepository.findById(postId);
    if (!post) {
      throw new NotFoundException(POST_NOT_FOUND_ERROR);
    }

    const comments = await this.blogCommentRepository.findByPostId(postId, new CommentQuery())
    return {...post, commentsQty: comments.length};
  }

  async get(query: GetPostsQuery): Promise<PostInterface[]> {
    const posts = await this.blogPostRepository.find(query);
    return Promise.all(posts.map(async (post) => {
      const comments = await this.blogCommentRepository.findByPostId(post._id, new CommentQuery())
      return {...post, commentsQty: comments.length}
    }))
  }

  async searchTitle(query: SearchPostsQuery): Promise<PostInterface[]> {
    const posts = await this.blogPostRepository.searchTitle(query);
    return Promise.all(posts.map(async (post) => {
      const comments = await this.blogCommentRepository.findByPostId(post._id, new CommentQuery())
      return {...post, commentsQty: comments.length}
    }))
  }

  async getPostsFromUsers(query: GetPostsQuery, userIds: string[]): Promise<PostInterface[]> {
    const posts = await this.blogPostRepository.find(query, userIds);
    return Promise.all(posts.map(async (post) => {
      const comments = await this.blogCommentRepository.findByPostId(post._id, new CommentQuery())
      return {...post, commentsQty: comments.length}
    }))
  }

  public async remove(
    postId: number,
  ) {
    return this.blogPostRepository
      .destroy(postId);
  }

  public async repost(
    postId: number,
    userId: string,
  ) {
    return this.blogPostRepository
      .repost(postId, userId);
  }

  public async like(
    postId: number,
    userId: string,
    query: LikePostQuery
  ) {
    return this.blogPostRepository
      .like(postId, userId, query.action);
  }

  public async getPostNewsletterList() {
    return this.blogPostRepository.getNewsletterPosts();
  }

  public async clearPostNewsletterList() {
    return this.blogPostRepository.clearPostNewsletterList();
  }

}

