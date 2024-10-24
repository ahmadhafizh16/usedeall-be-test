import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { RegisterUserAction } from './Action/registerUser.action';
import { FindExisitingUserByEmailTask } from '../User/Task/findExistingUserByEmail.task';
import { CreateUserTask } from '../User/Task/createUser.task';
import { LoginUserAction } from './Action/loginUser.action';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './Guard/auth.guard';
import { FindUserByIdTask } from '../User/Task/findUserById.task';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.APP_SECRET || 'd3f4ult!',
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,

    // Action
    LoginUserAction,
    RegisterUserAction,

    // Task
    FindExisitingUserByEmailTask,
    FindUserByIdTask,
    CreateUserTask,
  ],
})
export class AuthModule {}
