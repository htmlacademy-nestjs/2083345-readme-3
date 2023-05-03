import { TokenPayloadInterface } from './token-payload.interface';

export interface RefreshTokenPayload extends TokenPayloadInterface {
  tokenId: string;
}
