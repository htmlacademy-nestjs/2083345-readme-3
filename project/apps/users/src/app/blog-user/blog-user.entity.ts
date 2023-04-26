import { UserInterface } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.const';

export class BlogUserEntity implements UserInterface {
  public _id?: string;
  public email: string;
  public name: string;
  public avatar: string;
  public passwordHash: string;
  public createdAt: string;
  public postsQty: number;
  public subscribersQty: number;

  constructor(blogUser: UserInterface) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(blogUser: UserInterface) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.avatar = blogUser.avatar;
    this.name = blogUser.name;
    this.passwordHash = blogUser.passwordHash;
    this.createdAt = blogUser.createdAt;
    this.postsQty = blogUser.postsQty;
    this.subscribersQty = blogUser.subscribersQty;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
