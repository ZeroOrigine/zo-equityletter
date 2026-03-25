import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import {
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
  internalErrorResponse,
} from '@/lib/api-utils';

interface ProfileRow {
  id: string;
  email: string;
  full_name: string | null;
  company_name: string | null;
  role: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

const updateProfileSchema = z.object({
  full_name: z.string().max(255).optional().nullable(),
  company_name: z.string().max(255).optional().nullable(),
  avatar_url: z.string().url().max(2048).optional().nullable(),
});

const PROFILE_COLUMNS = 'id, email, full_name, company_name, role, avatar_url, created_at, updated_at' as const;

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    const { data: profile, error } = await supabase
      .from('profiles')
      .select(PROFILE_COLUMNS)
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      console.error('Profile fetch error:', error?.message || 'Profile not found');
      return internalErrorResponse();
    }

    return successResponse(profile as ProfileRow);
  } catch (error) {
    console.error('GET /api/profile error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    let body: unknown;
    try { body = await request.json(); } catch {
      return validationErrorResponse(new z.ZodError([{ code: 'custom', path: ['body'], message: 'Request body must be valid JSON.' }]));
    }

    const validation = updateProfileSchema.safeParse(body);
    if (!validation.success) return validationErrorResponse(validation.error);

    const cleanedUpdate: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(validation.data)) {
      if (value !== undefined) cleanedUpdate[key] = value;
    }

    if (Object.keys(cleanedUpdate).length === 0) {
      return validationErrorResponse(new z.ZodError([{ code: 'custom', path: ['body'], message: 'At least one field must be provided.' }]));
    }

    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update(cleanedUpdate)
      .eq('id', user.id)
      .select(PROFILE_COLUMNS)
      .single();

    if (error) {
      console.error('Profile update error:', error.message);
      return internalErrorResponse();
    }

    return successResponse(updatedProfile as ProfileRow);
  } catch (error) {
    console.error('PATCH /api/profile error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}
