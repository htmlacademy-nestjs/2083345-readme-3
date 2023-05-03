import {Module} from '@nestjs/common';
import {BlogUserRepository} from './blog-user.repository';
import {BlogUserModel, BlogUserSchema} from './blog-user.model';
import {MongooseModule} from '@nestjs/mongoose';
import {BlogUserController} from './blog-user.controller';
import {BlogUserService} from './blog-user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: BlogUserModel.name,
      schema: BlogUserSchema
    }]),
  ],
  controllers: [BlogUserController],
  providers: [BlogUserService, BlogUserRepository],
  exports: [BlogUserService, BlogUserRepository]
})
@Module({})
export class BlogUserModule {}
