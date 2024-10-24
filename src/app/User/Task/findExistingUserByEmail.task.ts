import { Global, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserTransformer } from 'src/app/User/Transformer/user.transformer';
import { HttpNotFoundException } from 'src/ship/Exception/httpNotFound.exception';
import { PrismaService } from 'src/ship/Module/prisma.service';

@Injectable()
export class FindExisitingUserByEmailTask {
  constructor(private prismaService: PrismaService) {}

  async run(email: string): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}
