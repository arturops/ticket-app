export class DatabaseConnectionError extends Error {
  statusCode = 503;
  constructor(public reason: string = 'Failed to connect to db') {
    super();

    // because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
