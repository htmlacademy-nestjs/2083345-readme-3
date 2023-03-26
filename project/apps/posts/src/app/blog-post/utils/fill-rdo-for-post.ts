import {PostInterface, PostTypeEnum} from '@project/shared/app-types';
import {fillObject} from '@project/util/util-core';
import {PostTextRdo} from '../rdo/post-text.rdo';
import {PostImageRdo} from '../rdo/post-image.rdo';
import {PostVideoRdo} from '../rdo/post-video.rdo';
import {PostLinkRdo} from '../rdo/post-link.rdo';
import {PostQuoteRdo} from '../rdo/post-quote.rdo';

export function fillRdoForPost(post: PostInterface) {
  switch (post.type) {
    case PostTypeEnum.Text:
      return fillObject(PostTextRdo, post);
    case PostTypeEnum.Image:
      return fillObject(PostImageRdo, post);
    case PostTypeEnum.Video:
      return fillObject(PostVideoRdo, post);
    case PostTypeEnum.Link:
      return fillObject(PostLinkRdo, post);
    case PostTypeEnum.Quote:
      return fillObject(PostQuoteRdo, post);
  }
}
