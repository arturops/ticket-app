import { CustomError } from './custom-error';

export class DatabaseConnectionError extends CustomError {
  statusCode = 503;
  constructor(public message: string = 'Failed to connect to db') {
    super('Failed to connect to db');

    // because we are extending from a child from the built in class Error
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
