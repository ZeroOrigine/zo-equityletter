import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import {
  successResponse,
  unauthorizedResponse,
  notFoundResponse,
  validationErrorResponse,
  internalErrorResponse,
  parsePagination,
  type PaginatedData,
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
  params: { id: string };
}

// ============================================================================
// Validation schemas
// ============================================================================

const letterIdSchema = z
  .string()
  .uuid({ message: 'Letter ID must be a valid UUID.' });

const createRecipientSchema = z.object({
  email: z
    .string({ required_error: 'An email address is required.' })
    .email({ message: 'Please provide a valid email address.' })
    .max(320, { message: 'Email address is too long.' }),
  name: z
    .string()
    .max(255, { message: 'Name must be 255 characters or fewer.' })
    .optional()
    .nullable(),
});

const createRecipientsSchema = z.object({
  recipients: z
    .array(createRecipientSchema, {
      required_error: 'A list of recipients is required.',
    })
    .min(1, { message: 'At least one recipient is required.' })
    .max(500, { message: 'You can add up to 500 recipients at a time.' }),
});

// ============================================================================
// Columns to select — never use select('*')
// ============================================================================

const RECIPIENT_COLUMNS = 'id, letter_id, user_id, email, name, opened_at, clicked_at, created_at, updated_at' as const;

// ============================================================================
// GET /api/letters/[id]/recipients
// List recipients for a specific letter with pagination.
// ============================================================================

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
          },
        },
      }
    );

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

    // Verify the letter exists and belongs to the user
    const { data: letter, error: letterError } = await supabase
      .from('letters')
      .select('id')
      .eq('id', letterId)
      .eq('user_id', session.user.id)
      .single();

    if (letterError || !letter) {
      return notFoundResponse('letter');
    }

    const searchParams = request.nextUrl.searchParams;
    const { page, limit, offset } = parsePagination(searchParams);

    // Count total recipients
    const { count, error: countError } = await supabase
      .from('recipients')
      .select('id', { count: 'exact', head: true })
      .eq('letter_id', letterId)
      .eq('user_id', session.user.id);

    if (countError) {
      console.error('Recipients count query error:', countError.message);
      return internalErrorResponse();
    }

    // Fetch recipients
    const { data: recipients, error: dataError } = await supabase
      .from('recipients')
      .select(RECIPIENT_COLUMNS)
      .eq('letter_id', letterId)
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (dataError) {
      console.error('Recipients list query error:', dataError.message);
      return internalErrorResponse();
    }

    const total = count ?? 0;
    const responseData: PaginatedData<RecipientRow> = {
      items: (recipients as RecipientRow[]) || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return successResponse(responseData);
  } catch (error) {
    console.error('GET /api/letters/[id]/recipients error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}

// ============================================================================
// POST /api/letters/[id]/recipients
// Add one or more recipients to a letter. Accepts a batch payload.
// ============================================================================

export async function POST(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {}
          },
        },
      }
    );

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

    // Verify the letter exists and belongs to the user
    const { data: letter, error: letterError } = await supabase
      .from('letters')
      .select('id, status')
      .eq('id', letterId)
      .eq('user_id', session.user.id)
      .single();

    if (letterError || !letter) {
      return notFoundResponse('letter');
    }

    // Cannot add recipients to sent or failed letters
    if (letter.status === 'sent' || letter.status === 'failed') {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['letter_id'],
            message: `Cannot add recipients to a letter with status "${letter.status}".`,
          },
        ])
      );
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

    const validation = createRecipientsSchema.safeParse(body);
    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    const recipientRows = validation.data.recipients.map((recipient) => ({
      letter_id: letterId,
      user_id: session.user.id,
      email: recipient.email,
      name: recipient.name ?? null,
    }));

    const { data: createdRecipients, error: insertError } = await supabase
      .from('recipients')
      .insert(recipientRows)
      .select(RECIPIENT_COLUMNS);

    if (insertError) {
      console.error('Recipients insert error:', insertError.message);
      return internalErrorResponse();
    }

    return successResponse(
      {
        recipients: (createdRecipients as RecipientRow[]) || [],
        count: createdRecipients?.length ?? 0,
      },
      201
    );
  } catch (error) {
    console.error('POST /api/letters/[id]/recipients error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}
