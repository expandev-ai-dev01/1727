/**
 * @summary
 * Global error handling middleware
 *
 * @module middleware/error
 *
 * @description
 * Catches and processes all application errors with proper HTTP status codes
 * and formatted error responses
 */

import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}

export async function errorMiddleware(
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const statusCode = error.statusCode || 500;
  const errorCode = error.code || 'INTERNAL_SERVER_ERROR';

  console.error('Error:', {
    code: errorCode,
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
  });

  res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: error.message,
      details: error.details || undefined,
    },
    timestamp: new Date().toISOString(),
  });
}

export const StatusGeneralError: AppError = {
  name: 'GeneralError',
  message: 'An unexpected error occurred',
  statusCode: 500,
  code: 'GENERAL_ERROR',
};
