import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(private errors: ValidationError[]) {
    super('Invalid request'); //must call parent constructor

    // because we are extending from a child from the built in class Error
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    const formattedErrors = this.errors.map((error) => {
      return {
        message: error.msg,
        field: error.type === 'field' ? error.path : null,
      };
    });
    return formattedErrors;
  }
}
