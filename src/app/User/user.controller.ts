/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Req } from '@nestjs/common';
import { BaseController } from 'src/ship/Parent/Controller/BaseController';
import { UserService } from './user.service';
import { ResponseWrapper } from 'src/ship/Parent/Transformer/wrapper.transformer';
import { UserTransformer } from './Transformer/user.transformer';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/ship/Decorator/user.decorator';

@ApiTags('User')
@Controller('user')
export class UserController extends BaseController {
  constructor(private userService: UserService) {
    super();
  }

  @Get('/me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get User Profile by Token' })
  async userApi(@User() requestUser): Promise<ResponseWrapper<Object>> {
    const user = await this.userService.getAuthencticatedUser(requestUser);

    return {
      data: this.transform(user, new UserTransformer()),
    };
  }
}
