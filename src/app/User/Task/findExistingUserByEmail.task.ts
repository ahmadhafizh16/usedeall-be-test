import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
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
