export class ResponseWrapper<T> {
  data: T;
  errors?: Array<T>;
  meta?: Object;
  pagination?: Object;
}
