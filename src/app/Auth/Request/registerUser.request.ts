import { ApiProperty } from '@nestjs/swagger';
import { z, ZodType } from 'zod';

export class RegisterUserRequest {
  @ApiProperty({
    type: String,
    description: 'User Email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'User Name',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'User Password',
  })
  password: string;

  @ApiProperty({
    type: String,
    description: 'Date of Birth',
  })
  dob: string;

  @ApiProperty({
    enum: ['m', 'f'],
    description: 'Date of Birth',
  })
  gender: string;

  @ApiProperty({
    type: String,
    description: 'City',
  })
  city: string;
}

export class RegisterUserValidation {
  static readonly RULES: ZodType = z.object({
    email: z.string().email(),
    name: z.string().min(1).max(40),
    password: z.string().min(8).max(20),
    dob: z.preprocess((input) => {
      if (typeof input === 'string') {
        const parsedDate = new Date(input);
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
      }
      return input;
    }, z.date()),
    gender: z.enum(['m', 'f']),
    city: z.string().min(1).max(30),
  });
}
