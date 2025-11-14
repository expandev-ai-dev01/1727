/**
 * @summary
 * Note creation controller handling HTTP POST requests for creating new notes
 *
 * @api {post} /api/v1/internal/note Create Note
 * @apiName CreateNote
 * @apiGroup Note
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new note with title and content for the authenticated user
 *
 * @apiParam {String} title Note title (max 255 characters, required)
 * @apiParam {String} content Note content (required)
 *
 * @apiSuccess {Number} idNote Identifier of the newly created note
 *
 * @apiError {String} titleRequired Title is required
 * @apiError {String} titleExceedsMaxLength Title exceeds 255 characters
 * @apiError {String} contentRequired Content is required
 * @apiError {String} UnauthorizedError User lacks permission
 * @apiError {String} ServerError Internal server error
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import {
  CrudController,
  errorResponse,
  StatusGeneralError,
  successResponse,
} from '@/middleware/crud';
import { noteCreate } from '@/services/note';

const securable = 'NOTE';

const bodySchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  const operation = new CrudController([{ securable, permission: 'CREATE' }]);

  const [validated, error] = await operation.create(req, bodySchema);

  if (!validated) {
    return next(error);
  }

  try {
    const data = await noteCreate({
      ...validated.credential,
      ...validated.params,
    });

    res.json(successResponse(data));
  } catch (error: any) {
    if (error.number === 51000) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(StatusGeneralError);
    }
  }
}
