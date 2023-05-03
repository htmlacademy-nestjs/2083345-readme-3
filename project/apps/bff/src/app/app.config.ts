export enum ApplicationServiceURL {
  Auth = 'http://localhost:3000/api/auth',
  BlogUser = 'http://localhost:3000/api/user',
  BlogPost = 'http://localhost:3332/api/post',
  BlogComment = 'http://localhost:3332/api/comment',
  Files = 'http://localhost:3333/api/files'
}

export const HTTP_CLIENT_MAX_REDIRECTS = 5;
export const HTTP_CLIENT_TIMEOUT = 5000;
