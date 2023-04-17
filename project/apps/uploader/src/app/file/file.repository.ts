import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileModel } from './file.model';
import { Model } from 'mongoose';
import { FileEntity } from './file.entity';
import { FileInterface } from '@project/shared/app-types';

@Injectable()
export class FileRepository {
  constructor(
    @InjectModel(FileModel.name) private readonly fileModel: Model<FileModel>
  ) {}

  public async create(item: FileEntity): Promise<FileInterface> {
    const file = new this.fileModel(item);
    return file.save();
  }

  public async findById(id: string): Promise<FileInterface | null> {
    return this.fileModel
      .findOne({ _id: id})
      .exec();
  }
}
