import { Injectable } from '@nestjs/common';
import { RegisterUserRequest } from 'src/app/Auth/Request/registerUser.request';
import { ModelCreateFailedException } from 'src/ship/Exception/modelCreateFailed.exception';
import { PrismaService } from 'src/ship/Module/prisma.service';
import * as bcrypt from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class CreateUserTask {
  constructor(private prismaService: PrismaService) { }

  async run(dataUser: RegisterUserRequest): Promise<User> {
    try {
      dataUser.password = await bcrypt.hash(dataUser.password, 10);
      const user = await this.prismaService.user.create({
        data: dataUser,
      });

      return user;
    } catch (err) {
      throw new ModelCreateFailedException(err.message);
    }
  }
}
