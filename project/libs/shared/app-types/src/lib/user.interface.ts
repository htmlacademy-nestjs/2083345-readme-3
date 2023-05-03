export interface UserInterface {
  _id?: string;
  email: string;
  name: string;
  avatar: string;
  passwordHash?: string;
  createdAt?: string;
  updatedAt?: string;
  subscribedTo?: string[];
}

