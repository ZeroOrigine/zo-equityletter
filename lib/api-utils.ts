import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// ============================================================================
// Consistent API response shape — every endpoint returns this structure
// ============================================================================

export interface ApiSuccessResponse<T> {
  data: T;
  error: null;
  status: number;
}

export interface ApiErrorResponse {
  data: null;
  error: string;
  status: number;
  code: string;
  details?: Record<string, string[]>;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(data: T, status: number = 200): NextResponse {
  const body: ApiSuccessResponse<T> = {
    data,
    error: null,
    status,
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  code: string,
  status: number,
  details?: Record<string, string[]>
): NextResponse {
  const body: ApiErrorResponse = {
    data: null,
    error: message,
    status,
    code,
    ...(details && { details }),
  };
  return NextResponse.json(body, { status });
}

export function validationErrorResponse(zodError: ZodError): NextResponse {
  const fieldErrors: Record<string, string[]> = {};
  for (const issue of zodError.issues) {
    const path = issue.path.join('.');
    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }
    fieldErrors[path].push(issue.message);
  }
  return errorResponse(
    'Please check your input and try again.',
    'VALIDATION_ERROR',
    400,
    fieldErrors
  );
}

export function unauthorizedResponse(): NextResponse {
  return errorResponse(
    'You must be signed in to access this resource.',
    'UNAUTHORIZED',
    401
  );
}

export function forbiddenResponse(): NextResponse {
  return errorResponse(
    'You do not have permission to access this resource.',
    'FORBIDDEN',
    403
  );
}

export function notFoundResponse(resource: string): NextResponse {
  return errorResponse(
    `The requested ${resource} could not be found.`,
    'NOT_FOUND',
    404
  );
}

export function internalErrorResponse(): NextResponse {
  return errorResponse(
    'Something went wrong on our end. Please try again later.',
    'INTERNAL_ERROR',
    500
  );
}

// ============================================================================
// Pagination helpers
// ============================================================================

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  const rawPage = parseInt(searchParams.get('page') || '1', 10);
  const rawLimit = parseInt(searchParams.get('limit') || '20', 10);

  const page = Math.max(1, isNaN(rawPage) ? 1 : rawPage);
  const limit = Math.min(100, Math.max(1, isNaN(rawLimit) ? 20 : rawLimit));
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

export interface PaginatedData<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
