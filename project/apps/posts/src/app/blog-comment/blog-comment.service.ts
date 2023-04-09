import {Injectable} from '@nestjs/common';
import dayjs from 'dayjs';
import {CreateCommentDto} from './dto/create-comment.dto';
import {BlogCommentEntity} from './blog-comment.entity';
import {BlogPostService} from '../blog-post/blog-post.service';
import {BlogCommentRepository} from './blog-comment.repository';


@Injectable()
export class BlogCommentService {
  constructor(
    private readonly blogCommentRepository: BlogCommentRepository,
    private readonly blogPostService: BlogPostService,
  ) {}

  public async create(
    dto: CreateCommentDto
  ) {
    const blogComment = {
      ...dto,
      _authorId: '',
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
  ) {
    return this.blogCommentRepository
      .findByPostId(postId)
  }

}

