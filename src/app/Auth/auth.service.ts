import { Injectable } from '@nestjs/common';
import { RegisterUserRequest, RegisterUserValidation } from './Request/registerUser.request';
import { ValidationService } from '../../ship/Module/validation.service';
import { RegisterUserAction } from './Action/registerUser.action';
import { User } from '@prisma/client';
import { LoginUserRequest, LoginUserValidation } from './Request/loginUser.request';
import { LoginUserAction } from './Action/loginUser.action';
import { Token } from './Interface/token.interface';

@Injectable()
export class AuthService {
  constructor(
    private validationService: ValidationService,
    private registurUserAction: RegisterUserAction,
    private loginUserAction: LoginUserAction,
  ) {}

  async registerUser(request: RegisterUserRequest): Promise<User> {
    const registerRequest: RegisterUserRequest = this.validationService.validate(RegisterUserValidation.RULES, request);

    const registerUser = await this.registurUserAction.run(registerRequest);

    return registerUser;
  }

  async login(request: LoginUserRequest): Promise<Token> {
    const loginRequest: LoginUserRequest = this.validationService.validate(LoginUserValidation.RULES, request);

    return await this.loginUserAction.run(loginRequest);
  }
}
