import { TokenPayloadInterface, UserInterface } from '@project/shared/app-types';

export function createJWTPayload(user: UserInterface): TokenPayloadInterface {
  return {
    sub: user._id,
    email: user.email,
    name: user.name,
  };
}
