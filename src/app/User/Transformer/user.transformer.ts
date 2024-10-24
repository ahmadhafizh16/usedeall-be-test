import { User } from '@prisma/client';
import { ParentTransformer } from 'src/ship/Parent/Transformer/parentTransformer';
import { Gender } from '../Enum/user.enum';

export class UserTransformer extends ParentTransformer {
  transform(user: User): Object {
    return this.buildResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      gender: Gender[user.gender],
      dob: user.dob.toDateString(),
      city: user.city,
    });
  }
}
