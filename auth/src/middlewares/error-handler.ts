import { Request, Response, NextFunction } from 'express';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/db-connection-error';

interface customErrorFormat {
  message: string;
  field?: string | null;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof RequestValidationError) {
    console.log('Handling req validation error');
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }
  if (err instanceof DatabaseConnectionError) {
    res.status(err.statusCode).send({ errors: err.serializeErrors() });
    return;
  }

  console.log('Something went wrong', err);
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
