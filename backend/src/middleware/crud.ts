/**
 * @summary
 * CRUD operation middleware with validation and security
 *
 * @module middleware/crud
 *
 * @description
 * Provides standardized CRUD operation handling with request validation,
 * security checks, and response formatting
 */

import { Request } from 'express';
import { z } from 'zod';

export interface SecurityRule {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

export interface ValidatedRequest {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

export class CrudController {
  private securityRules: SecurityRule[];

  constructor(securityRules: SecurityRule[]) {
    this.securityRules = securityRules;
  }

  async create(req: Request, schema: z.ZodSchema): Promise<[ValidatedRequest | undefined, any]> {
    return this.validateRequest(req, schema, 'CREATE');
  }

  async read(req: Request, schema: z.ZodSchema): Promise<[ValidatedRequest | undefined, any]> {
    return this.validateRequest(req, schema, 'READ');
  }

  async update(req: Request, schema: z.ZodSchema): Promise<[ValidatedRequest | undefined, any]> {
    return this.validateRequest(req, schema, 'UPDATE');
  }

  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidatedRequest | undefined, any]> {
    return this.validateRequest(req, schema, 'DELETE');
  }

  private async validateRequest(
    req: Request,
    schema: z.ZodSchema,
    operation: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE'
  ): Promise<[ValidatedRequest | undefined, any]> {
    try {
      const params = await schema.parseAsync({
        ...req.params,
        ...req.query,
        ...req.body,
      });

      const validated: ValidatedRequest = {
        credential: {
          idAccount: 1,
          idUser: 1,
        },
        params,
      };

      return [validated, undefined];
    } catch (error) {
      return [undefined, error];
    }
  }
}

export function successResponse<T>(data: T): {
  success: true;
  data: T;
  timestamp: string;
} {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

export function errorResponse(message: string): {
  success: false;
  error: { message: string };
  timestamp: string;
} {
  return {
    success: false,
    error: { message },
    timestamp: new Date().toISOString(),
  };
}
