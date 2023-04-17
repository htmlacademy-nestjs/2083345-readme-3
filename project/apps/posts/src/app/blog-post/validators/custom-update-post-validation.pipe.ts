import { ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import {PostTypeEnum} from '@project/shared/app-types';
import {UpdatePostTextDto} from '../dto/update/update-post-text.dto';
import {UpdatePostImageDto} from '../dto/update/update-post-image.dto';
import {UpdatePostVideoDto} from '../dto/update/update-post-video.dto';
import {UpdatePostLinkDto} from '../dto/update/update-post-link.dto';
import {UpdatePostQuoteDto} from '../dto/update/update-post-quote.dto';

export class CustomUpdatePostValidationPipe implements PipeTransform<any> {
  async transform(
    dto: UpdatePostTextDto | UpdatePostImageDto | UpdatePostVideoDto | UpdatePostLinkDto | UpdatePostQuoteDto,
    { metatype, type }: ArgumentMetadata
  ): Promise<any> {
    if (type === 'body') {
      let errors = [];
      switch (dto.type) {
        case PostTypeEnum.Text:
          const postTextDto = plainToInstance(UpdatePostTextDto, dto);
          errors = errors.concat(await validate(postTextDto));
          break;
        case PostTypeEnum.Image:
          const postImageDto = plainToInstance(UpdatePostImageDto, dto);
          console.log(postImageDto);
          errors = errors.concat(await validate(postImageDto));
          break;
        case PostTypeEnum.Video:
          const postVideoDto = plainToInstance(UpdatePostVideoDto, dto);
          errors = errors.concat(await validate(postVideoDto));
          break;
        case PostTypeEnum.Link:
          const postLinkDto = plainToInstance(UpdatePostLinkDto, dto);
          errors = errors.concat(await validate(postLinkDto));
          break;
        case PostTypeEnum.Quote:
          const postQuoteDto = plainToInstance(UpdatePostQuoteDto, dto);
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
