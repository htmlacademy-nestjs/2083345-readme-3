import { ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {CreatePostTextDto} from '../dto/create/create-post-text.dto';
import {CreatePostImageDto} from '../dto/create/create-post-image.dto';
import {CreatePostVideoDto} from '../dto/create/create-post-video.dto';
import {CreatePostLinkDto} from '../dto/create/create-post-link.dto';
import {CreatePostQuoteDto} from '../dto/create/create-post-quote.dto';
import {PostTypeEnum} from '@project/shared/app-types';

export class CustomCreatePostValidationPipe implements PipeTransform<any> {
  async transform(
    dto: CreatePostTextDto | CreatePostImageDto | CreatePostVideoDto | CreatePostLinkDto | CreatePostQuoteDto,
    { metatype, type }: ArgumentMetadata
  ): Promise<any> {
    if (type === 'body') {
      let errors = [];
      switch (dto.type) {
        case PostTypeEnum.Text:
          const postTextDto = plainToInstance(CreatePostTextDto, dto);
          errors = errors.concat(await validate(postTextDto));
          break;
        case PostTypeEnum.Image:
          const postImageDto = plainToInstance(CreatePostImageDto, dto);
          console.log(postImageDto);
          errors = errors.concat(await validate(postImageDto));
          break;
        case PostTypeEnum.Video:
          const postVideoDto = plainToInstance(CreatePostVideoDto, dto);
          errors = errors.concat(await validate(postVideoDto));
          break;
        case PostTypeEnum.Link:
          const postLinkDto = plainToInstance(CreatePostLinkDto, dto);
          errors = errors.concat(await validate(postLinkDto));
          break;
        case PostTypeEnum.Quote:
          const postQuoteDto = plainToInstance(CreatePostQuoteDto, dto);
          errors = errors.concat(await validate(postQuoteDto));
          break;
      }
      if (errors.length > 0) {
        errors.forEach((err) => {
          throw new BadRequestException(err)
        });
      }
    }
    return dto;
  }
}
