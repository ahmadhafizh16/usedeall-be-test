import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { HttpNotFoundException } from 'src/ship/Exception/httpNotFound.exception';
import { PrismaService } from 'src/ship/Module/prisma.service';

@Injectable()
export class FindUserByIdTask {
  constructor(private prismaService: PrismaService) {}

  async run(userId: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: userId,
        },
      });

      return user;
    } catch (Error) {
      throw new HttpNotFoundException();
    }
  }
}
