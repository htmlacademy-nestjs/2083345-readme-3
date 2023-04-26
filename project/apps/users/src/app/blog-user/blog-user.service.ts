import { Injectable } from '@nestjs/common';
import {BlogUserRepository} from './blog-user.repository';

@Injectable()
export class BlogUserService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,
  ) {}

  public async subscribe(id: number, action: number) {
    // WIP
  }



}
