/**
 * @summary
 * 404 Not Found middleware
 *
 * @module middleware/notFound
 *
 * @description
 * Handles requests to undefined routes with proper 404 response
 */

import { Request, Response } from 'express';

export async function notFoundMiddleware(req: Request, res: Response): Promise<void> {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
    },
    timestamp: new Date().toISOString(),
  });
}
