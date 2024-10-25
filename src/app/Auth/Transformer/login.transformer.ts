import { ParentTransformer } from 'src/ship/Parent/Transformer/parentTransformer';
import { Token } from '../Interface/token.interface';

export class LoginTransformer extends ParentTransformer {
  transform(data: Token): object {
    return this.buildResponse({
      access_token: data.access_token,
      token_expired_at: data.expired_at,
      token_created_at: data.created_at,
    });
  }
}
