import { ApiProperty } from '@nestjs/swagger';
import { z, ZodType } from 'zod';

export class LoginUserRequest {
  @ApiProperty({
    type: String,
    description: 'User Email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
  })
  password: string;
}

export class LoginUserValidation {
  static readonly RULES: ZodType = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(20),
  });
}
