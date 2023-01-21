import { NextFunction, Request, Response } from 'express';
import { HttpCode } from '../utils/httpCode';

class ErrorHandler extends Error {
  public static handle(
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
    next();
  }
}

export default ErrorHandler;