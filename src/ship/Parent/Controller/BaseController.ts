import { HttpException, HttpStatus } from '@nestjs/common';
import { ParentTransformer } from '../Transformer/parentTransformer';

export class BaseController {
  transform(data: any, transformerClass: any): Array<ParentTransformer> | Array<Object> | Object {
    if (!(transformerClass instanceof ParentTransformer)) {
      throw new HttpException('Invalid transformer class', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (data instanceof Array) {
      return data.map((item) => transformerClass.transform(item));
    } else {
      return transformerClass.transform(data);
    }
  }
}
