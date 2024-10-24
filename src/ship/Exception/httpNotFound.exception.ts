import { HttpException } from '@nestjs/common';

export class HttpNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message || 'Resource Not Found !', 404);
  }
}
