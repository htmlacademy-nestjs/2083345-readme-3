import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {ApplicationServiceURL} from './app.config';
import {FileInterceptor} from '@nestjs/platform-express';
import FormData from 'form-data'
import {Multer} from 'multer';

@Controller('files')
export class FileController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @Get(':fileId')
  public async getFileById(@Param('fileId') fileId) {
    const { data } = (await this.httpService.axiosRef.get(`${ApplicationServiceURL.Files}/${fileId}`));
    return data
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadFile(
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const formData = new FormData()
    formData.append('file', Buffer.from(file.buffer), file.originalname)
    try {
      const { data } = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Files}/upload`, formData, {
        headers: {
          'Content-Type': req.headers['content-type'],
          ...formData.getHeaders()
        }
      });
      return data;
    } catch (err) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
}
