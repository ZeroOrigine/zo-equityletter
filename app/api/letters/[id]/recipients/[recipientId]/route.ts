import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationErrorResponse,
  internalErrorResponse,
} from '@/lib/api-utils';

// ============================================================================
// Type definitions
// ============================================================================

interface RecipientRow {
  id: string;
  letter_id: string;
  user_id: string;
  email: string;
  name: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  created_at: string;
  updated_at: string;
}

interface RouteContext {
  params: { id: string; recipientId: string };
}

// ============================================================================
// Validation schemas
// ============================================================================

const uuidSchema = z
  .string()
  .uuid({ message: 'ID must be a valid UUID.' });

const updateRecipientSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please provide a valid email address.' })
    .max(320, { message: 'Email address is too long.' })
    .optional(),
  name: z
    .string()
    .max(255, { message: 'Name must be 255 characters or fewer.' })
    .optional()
    .nullable(),
});

// ============================================================================
// Columns to select — never use select('*')
// ============================================================================

const RECIPIENT_COLUMNS = 'id, letter_id, user_id, email, name, opened_at, clicked_at, created_at, updated_at' as const;

// ============================================================================
// GET /api/letters/[id]/recipients/[recipientId]
// Fetch a single recipient.
// ============================================================================

export async function GET(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return unauthorizedResponse();
    }

    const letterIdValidation = uuidSchema.safeParse(context.params.id);
    const recipientIdValidation = uuidSchema.safeParse(context.params.recipientId);

    if (!letterIdValidation.success) {
      return validationErrorResponse(letterIdValidation.error);
    }
    if (!recipientIdValidation.success) {
      return validationErrorResponse(recipientIdValidation.error);
    }

    const { data: recipient, error } = await supabase
      .from('recipients')
      .select(RECIPIENT_COLUMNS)
      .eq('id', recipientIdValidation.data)
      .eq('letter_id', letterIdValidation.data)
      .eq('user_id', session.user.id)
      .single();

    if (error || !recipient) {
      return notFoundResponse('recipient');
    }

    return successResponse(recipient as RecipientRow);
  } catch (error) {
    console.error('GET /api/letters/[id]/recipients/[recipientId] error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}

// ============================================================================
// PATCH /api/letters/[id]/recipients/[recipientId]
// Update a recipient's email or name.
// ============================================================================

export async function PATCH(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return unauthorizedResponse();
    }

    const letterIdValidation = uuidSchema.safeParse(context.params.id);
    const recipientIdValidation = uuidSchema.safeParse(context.params.recipientId);

    if (!letterIdValidation.success) {
      return validationErrorResponse(letterIdValidation.error);
    }
    if (!recipientIdValidation.success) {
      return validationErrorResponse(recipientIdValidation.error);
    }

    // Verify the recipient exists and belongs to the user
    const { data: existingRecipient, error: fetchError } = await supabase
      .from('recipients')
      .select('id')
      .eq('id', recipientIdValidation.data)
      .eq('letter_id', letterIdValidation.data)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !existingRecipient) {
      return notFoundResponse('recipient');
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['body'],
            message: 'Request body must be valid JSON.',
          },
        ])
      );
    }

    const validation = updateRecipientSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    const updateData = validation.data;

    // Remove undefined fields
    const cleanedUpdate: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (value !== undefined) {
        cleanedUpdate[key] = value;
      }
    }

    if (Object.keys(cleanedUpdate).length === 0) {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['body'],
            message: 'At least one field must be provided to update.',
          },
        ])
      );
    }

    const { data: updatedRecipient, error: updateError } = await supabase
      .from('recipients')
      .update(cleanedUpdate)
      .eq('id', recipientIdValidation.data)
      .eq('letter_id', letterIdValidation.data)
      .eq('user_id', session.user.id)
      .select(RECIPIENT_COLUMNS)
      .single();

    if (updateError) {
      console.error('Recipient update error:', updateError.message);
      return internalErrorResponse();
    }

    return successResponse(updatedRecipient as RecipientRow);
  } catch (error) {
    console.error('PATCH /api/letters/[id]/recipients/[recipientId] error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}

// ============================================================================
// DELETE /api/letters/[id]/recipients/[recipientId]
// Remove a recipient from a letter.
// ============================================================================

export async function DELETE(
  _request: NextRequest,
  context: RouteContext
) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return unauthorizedResponse();
    }

    const letterIdValidation = uuidSchema.safeParse(context.params.id);
    const recipientIdValidation = uuidSchema.safeParse(context.params.recipientId);

    if (!letterIdValidation.success) {
      return validationErrorResponse(letterIdValidation.error);
    }
    if (!recipientIdValidation.success) {
      return validationErrorResponse(recipientIdValidation.error);
    }

    // Verify the recipient exists before deleting
    const { data: existingRecipient, error: fetchError } = await supabase
      .from('recipients')
      .select('id')
      .eq('id', recipientIdValidation.data)
      .eq('letter_id', letterIdValidation.data)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !existingRecipient) {
      return notFoundResponse('recipient');
    }

    const { error: deleteError } = await supabase
      .from('recipients')
      .delete()
      .eq('id', recipientIdValidation.data)
      .eq('letter_id', letterIdValidation.data)
      .eq('user_id', session.user.id);

    if (deleteError) {
      console.error('Recipient delete error:', deleteError.message);
      return internalErrorResponse();
    }

    return successResponse({ id: recipientIdValidation.data, deleted: true });
  } catch (error) {
    console.error('DELETE /api/letters/[id]/recipients/[recipientId] error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}
