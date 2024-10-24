import { HttpException } from '@nestjs/common';

export class ModelCreateFailedException extends HttpException {
  constructor(message?: string) {
    super(message || 'Failed to create resource', 400);
  }
}
