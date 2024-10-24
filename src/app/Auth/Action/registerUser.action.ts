import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterUserRequest } from '../Request/registerUser.request';
import { CreateUserTask } from '../../User/Task/createUser.task';
import { FindExisitingUserByEmailTask } from '../../User/Task/findExistingUserByEmail.task';
import { User } from '@prisma/client';

@Injectable()
export class RegisterUserAction {
  constructor(
    private findExistingUserByEmailTask: FindExisitingUserByEmailTask,
    private createUserTask: CreateUserTask,
  ) {}

  async run(request: RegisterUserRequest): Promise<User> {
    let { email } = request;

    const userExists = await this.findExistingUserByEmailTask.run(email);

    if (userExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const createdUser = await this.createUserTask.run(request);

    return createdUser;
  }
}
