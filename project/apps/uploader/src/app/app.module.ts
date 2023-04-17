import { Module } from '@nestjs/common';
import { FileModule } from './file/file.module';
import { ConfigUploaderModule } from '@project/config/config-uploader';
import { MongooseModule } from '@nestjs/mongoose';
import {getMongooseOptions} from '@project/config/config-users';

@Module({
  imports: [
    FileModule,
    ConfigUploaderModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    )
  ],
  controllers: [],
  providers: [],
})

export class AppModule {}
