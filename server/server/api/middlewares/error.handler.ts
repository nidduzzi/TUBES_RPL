import { Request, Response, NextFunction } from 'express';

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.warn(err);
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
}
