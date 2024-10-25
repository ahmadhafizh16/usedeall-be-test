export class ResponseWrapper<T> {
  data: T;
  errors?: Array<T>;
  meta?: object;
  pagination?: object;
}
