export interface UserInterface {
  _id?: string;
  email: string;
  name: string;
  avatar: string;
  passwordHash?: string;
  createdAt?: string;
  updatedAt?: string;
  postsQty?: number;
  subscribersQty?: number;
}
