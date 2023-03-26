import {BlogPostTextEntity} from '../blog-post-text.entity';
import {BlogPostImageEntity} from '../blog-post-image.entity';
import {BlogPostVideoEntity} from '../blog-post-video.entity';
import {BlogPostLinkEntity} from '../blog-post-link.entity';
import {BlogPostQuoteEntity} from '../blog-post-quote.entity';

export const TypeEntityAdapterObject = {
  'text': BlogPostTextEntity,
  'image': BlogPostImageEntity,
  'video': BlogPostVideoEntity,
  'link': BlogPostLinkEntity,
  'quote': BlogPostQuoteEntity
}
