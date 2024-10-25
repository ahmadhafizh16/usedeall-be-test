import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ResponseWrapper } from 'src/ship/Parent/Transformer/wrapper.transformer';
import { UserTransformer } from '../User/Transformer/user.transformer';
import { RegisterUserRequest } from './Request/registerUser.request';
import { BaseController } from 'src/ship/Parent/Controller/BaseController';
import { LoginUserRequest } from './Request/loginUser.request';
import { LoginTransformer } from './Transformer/login.transformer';
import { Public } from './Guard/public-strategy';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Token } from './Interface/token.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register New User' })
  @ApiBody({
    type: RegisterUserRequest,
  })
  async register(@Body() request: RegisterUserRequest): Promise<ResponseWrapper<object>> {
    const user = await this.authService.registerUser(request);

    return {
      data: this.transform(user, new UserTransformer()),
    };
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Authenticate User' })
  @ApiBody({
    type: LoginUserRequest,
  })
  async login(@Body() request: LoginUserRequest): Promise<ResponseWrapper<object>> {
    const token: Token = await this.authService.login(request);

    return {
      data: this.transform(token, new LoginTransformer()),
    };
  }
}
