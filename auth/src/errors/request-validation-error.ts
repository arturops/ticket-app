import { ValidationError } from 'express-validator';

export class RequestValidationError extends Error {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super(); //must call parent constructor

    // because we are extending a built in class
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
