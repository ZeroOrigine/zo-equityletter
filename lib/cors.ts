import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Allowed origins — update for production
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
];

const CORS_HEADERS = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

export function getCorsHeaders(request: NextRequest): Record<string, string> {
  const origin = request.headers.get('origin') || '';
  const headers: Record<string, string> = { ...CORS_HEADERS };

  if (ALLOWED_ORIGINS.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }

  return headers;
}

export function handleCorsPreflightIfNeeded(
  request: NextRequest
): NextResponse | null {
  if (request.method === 'OPTIONS') {
    const headers = getCorsHeaders(request);
    return new NextResponse(null, { status: 204, headers });
  }
  return null;
}

export function addCorsHeaders(
  response: NextResponse,
  request: NextRequest
): NextResponse {
  const headers = getCorsHeaders(request);
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value);
  }
  return response;
}
