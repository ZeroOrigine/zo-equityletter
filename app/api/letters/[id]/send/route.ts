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
  errorResponse,
} from '@/lib/api-utils';

// ============================================================================
// Type definitions
// ============================================================================

interface RouteContext {
  params: { id: string };
}

// ============================================================================
// Validation schemas
// ============================================================================

const letterIdSchema = z
  .string()
  .uuid({ message: 'Letter ID must be a valid UUID.' });

// ============================================================================
// POST /api/letters/[id]/send
// Mark a letter as "sent". In production, this would trigger an email
// delivery service (SendGrid, Resend, etc.). For now, it updates the status
// and records the sent_at timestamp.
// ============================================================================

export async function POST(
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

    const idValidation = letterIdSchema.safeParse(context.params.id);
    if (!idValidation.success) {
      return validationErrorResponse(idValidation.error);
    }

    const letterId = idValidation.data;

    // Fetch the letter with its current state
    const { data: letter, error: fetchError } = await supabase
      .from('letters')
      .select('id, status, recipient_count, title, body_html')
      .eq('id', letterId)
      .eq('user_id', session.user.id)
      .single();

    if (fetchError || !letter) {
      return notFoundResponse('letter');
    }

    // Validate the letter can be sent
    if (letter.status === 'sent') {
      return errorResponse(
        'This letter has already been sent.',
        'ALREADY_SENT',
        409
      );
    }

    if (letter.status === 'archived') {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['status'],
            message: 'An archived letter cannot be sent. Please restore it to draft first.',
          },
        ])
      );
    }

    if (letter.status === 'failed') {
      // Allow retry of failed letters
    }

    if (letter.recipient_count === 0) {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['recipients'],
            message: 'This letter has no recipients. Please add at least one recipient before sending.',
          },
        ])
      );
    }

    if (!letter.body_html || letter.body_html.trim() === '') {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['body_html'],
            message: 'The letter body is empty. Please add content before sending.',
          },
        ])
      );
    }

    // -----------------------------------------------------------------------
    // In production, you would integrate with an email service here:
    //   - Fetch all recipients for this letter
    //   - Send emails via SendGrid/Resend/SES
    //   - Handle partial failures
    //   - Update individual recipient delivery status
    // For now, we mark the letter as sent.
    // -----------------------------------------------------------------------

    const { data: updatedLetter, error: updateError } = await supabase
      .from('letters')
      .update({
        status: 'sent',
        sent_at: new Date().toISOString(),
      })
      .eq('id', letterId)
      .eq('user_id', session.user.id)
      .select('id, status, sent_at, recipient_count, title')
      .single();

    if (updateError) {
      console.error('Letter send update error:', updateError.message);
      return internalErrorResponse();
    }

    return successResponse({
      letter: updatedLetter,
      message: `Your letter "${letter.title}" has been sent to ${letter.recipient_count} recipient${letter.recipient_count === 1 ? '' : 's'}.`,
    });
  } catch (error) {
    console.error('POST /api/letters/[id]/send error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}
