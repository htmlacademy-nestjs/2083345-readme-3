import {Injectable} from '@nestjs/common';
import {CreateCommentDto} from './dto/create-comment.dto';
import {BlogCommentEntity} from './blog-comment.entity';
import {BlogCommentRepository} from './blog-comment.repository';
import {CommentQuery} from './query/comment.query';
import {TokenPayloadInterface} from '@project/shared/app-types';


@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
  ) {}

  public async create(
    dto: CreateCommentDto,
    user: TokenPayloadInterface,
  ) {
    const blogComment = {
      ...dto,
      _authorId: user.sub,
    };

    const commentEntity = new BlogCommentEntity(blogComment);

    return this.blogCommentRepository
      .create(commentEntity);
  }

  public async remove(
    commentId: number,
  ) {
    return this.blogCommentRepository
      .destroy(Number(commentId));
  }

  public async getByPostId(
    postId: number,
    query: CommentQuery
  ) {
    return this.blogCommentRepository
      .findByPostId(postId, query)
  }

  public async getById(
    commentId: number,
  ) {
    return this.blogCommentRepository
      .findById(commentId)
  }

}

