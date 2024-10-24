import { Injectable, Req } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';
import { User } from 'src/ship/Decorator/user.decorator';
import { FindUserByIdTask } from '../Task/findUserById.task';

@Injectable()
export class GetAuthenticatedUserAction {
  constructor(
    private findUserByIdTask: FindUserByIdTask
  ) {}

  async run(@User() requestUser): Promise<UserModel> {
    let userModel = await this.findUserByIdTask.run(requestUser.id);

    return userModel;
  }
}
