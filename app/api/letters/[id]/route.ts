import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationErrorResponse,
  internalErrorResponse,
} from '@/lib/api-utils';

interface LetterRow {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  subject_line: string | null;
  body_html: string;
  body_text: string;
  status: string;
  recipient_count: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

interface RouteContext {
  params: Promise<{ id: string }>;
}

const letterIdSchema = z
  .string()
  .uuid({ message: 'Letter ID must be a valid UUID.' });

const updateLetterSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  subject_line: z.string().max(500).optional().nullable(),
  body_html: z.string().max(500000).optional(),
  body_text: z.string().max(500000).optional(),
  status: z.enum(['draft', 'scheduled', 'archived']).optional(),
  scheduled_at: z.string().datetime().optional().nullable(),
});

const LETTER_COLUMNS = 'id, user_id, title, slug, subject_line, body_html, body_text, status, recipient_count, scheduled_at, sent_at, created_at, updated_at' as const;

export async function GET(_request: NextRequest, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    const { id } = await context.params;
    const idValidation = letterIdSchema.safeParse(id);
    if (!idValidation.success) return validationErrorResponse(idValidation.error);

    const { data: letter, error } = await supabase
      .from('letters')
      .select(LETTER_COLUMNS)
      .eq('id', idValidation.data)
      .eq('user_id', user.id)
      .single();

    if (error || !letter) return notFoundResponse('letter');
    return successResponse(letter as LetterRow);
  } catch (error) {
    console.error('GET /api/letters/[id] error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    const { id } = await context.params;
    const idValidation = letterIdSchema.safeParse(id);
    if (!idValidation.success) return validationErrorResponse(idValidation.error);

    const { data: existingLetter, error: fetchError } = await supabase
      .from('letters')
      .select('id, status, scheduled_at')
      .eq('id', idValidation.data)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingLetter) return notFoundResponse('letter');

    if (existingLetter.status === 'sent' || existingLetter.status === 'failed') {
      return validationErrorResponse(
        new z.ZodError([{ code: 'custom', path: ['status'], message: `A letter with status "${existingLetter.status}" cannot be edited.` }])
      );
    }

    let body: unknown;
    try { body = await request.json(); } catch {
      return validationErrorResponse(new z.ZodError([{ code: 'custom', path: ['body'], message: 'Request body must be valid JSON.' }]));
    }

    const validation = updateLetterSchema.safeParse(body);
    if (!validation.success) return validationErrorResponse(validation.error);

    const updateData = validation.data;

    if (updateData.status === 'scheduled' && !updateData.scheduled_at && !existingLetter.scheduled_at) {
      return validationErrorResponse(
        new z.ZodError([{ code: 'custom', path: ['scheduled_at'], message: 'A scheduled date is required when status is "scheduled".' }])
      );
    }

    const cleanedUpdate: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) cleanedUpdate[key] = value;
    }

    if (Object.keys(cleanedUpdate).length === 0) {
      return validationErrorResponse(new z.ZodError([{ code: 'custom', path: ['body'], message: 'At least one field must be provided to update.' }]));
    }

    const { data: updatedLetter, error: updateError } = await supabase
      .from('letters')
      .update(cleanedUpdate)
      .eq('id', idValidation.data)
      .eq('user_id', user.id)
      .select(LETTER_COLUMNS)
      .single();

    if (updateError) {
      if (updateError.code === '23505') {
        return validationErrorResponse(new z.ZodError([{ code: 'custom', path: ['slug'], message: 'You already have a letter with this slug.' }]));
      }
      console.error('Letter update error:', updateError.message);
      return internalErrorResponse();
    }

    return successResponse(updatedLetter as LetterRow);
  } catch (error) {
    console.error('PATCH /api/letters/[id] error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    const { id } = await context.params;
    const idValidation = letterIdSchema.safeParse(id);
    if (!idValidation.success) return validationErrorResponse(idValidation.error);

    const { data: existingLetter, error: fetchError } = await supabase
      .from('letters')
      .select('id')
      .eq('id', idValidation.data)
      .eq('user_id', user.id)
      .single();

    if (fetchError || !existingLetter) return notFoundResponse('letter');

    const { error: deleteError } = await supabase
      .from('letters')
      .delete()
      .eq('id', idValidation.data)
      .eq('user_id', user.id);

    if (deleteError) {
      console.error('Letter delete error:', deleteError.message);
      return internalErrorResponse();
    }

    return successResponse({ id: idValidation.data, deleted: true });
  } catch (error) {
    console.error('DELETE /api/letters/[id] error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}
