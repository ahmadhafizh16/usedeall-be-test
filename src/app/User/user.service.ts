/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { GetAuthenticatedUserAction } from './Action/getAuthenticatedUser.action';
import { User } from 'src/ship/Decorator/user.decorator';

@Injectable()
export class UserService {
  constructor(private getAuthenticatedUserAction: GetAuthenticatedUserAction) {}
  async getAuthencticatedUser(@User() requestUser): Promise<UserModel> {
    const user = await this.getAuthenticatedUserAction.run(requestUser);

    return user;
  }
}
