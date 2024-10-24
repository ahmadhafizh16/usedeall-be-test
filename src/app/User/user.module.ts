import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';
import { GetAuthenticatedUserAction } from './Action/getAuthenticatedUser.action';
import { FindUserByIdTask } from './Task/findUserById.task';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,

    // Action
    GetAuthenticatedUserAction,

    // Task
    FindUserByIdTask,
  ],
})
export class UserModule {}
