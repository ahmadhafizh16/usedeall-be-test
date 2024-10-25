import { HttpException, HttpStatus } from '@nestjs/common';
import { isEmpty, isNull } from 'lodash';

export class ParentTransformer {
  private response: object = {};
  transform(_data: any): any {}

  transformArray(data: Array<any>, transformerClass): Array<ParentTransformer> | Array<object> {
    this.checkInstanceOfTransformerClass(transformerClass);

    return data.map((item) => transformerClass.transform(item));
  }

  loadHasMany(data, relationName: string, transformerClass: any): void {
    this.checkInstanceOfTransformerClass(transformerClass);

    delete this.response[relationName];

    if (isEmpty(data[relationName])) {
      this.response[relationName] = [];
    } else {
      this.response[relationName] = this.transformArray(data[relationName], transformerClass);
    }
  }

  loadHasOne(data, relationName: string, transformerClass: any): void {
    this.checkInstanceOfTransformerClass(transformerClass);

    delete this.response[relationName];

    if (isNull(data[relationName])) {
      this.response[relationName] = null;
    }

    if (!isEmpty(data[relationName])) {
      this.response[relationName] = transformerClass.transform(data[relationName]);
    }
  }

  buildResponse(dataToTransform: object): object {
    return {
      ...dataToTransform,
      ...this.response,
    };
  }

  private checkInstanceOfTransformerClass(transformerClass) {
    if (!(transformerClass instanceof ParentTransformer)) {
      throw new HttpException('Invalid transformer class', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
