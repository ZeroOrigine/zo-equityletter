import { NextRequest } from 'next/server';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import {
  successResponse,
  unauthorizedResponse,
  validationErrorResponse,
  internalErrorResponse,
  parsePagination,
  type PaginatedData,
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

const createLetterSchema = z.object({
  title: z
    .string({ required_error: 'A title is required for your letter.' })
    .min(1, { message: 'A title is required for your letter.' })
    .max(255, { message: 'Title must be 255 characters or fewer.' }),
  slug: z
    .string({ required_error: 'A URL slug is required.' })
    .min(1, { message: 'A URL slug is required.' })
    .max(255, { message: 'Slug must be 255 characters or fewer.' })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
      message: 'Slug must contain only lowercase letters, numbers, and hyphens.',
    }),
  subject_line: z
    .string()
    .max(500, { message: 'Subject line must be 500 characters or fewer.' })
    .optional()
    .nullable(),
  body_html: z
    .string()
    .max(500000, { message: 'Letter body is too long.' })
    .optional()
    .default(''),
  body_text: z
    .string()
    .max(500000, { message: 'Letter body is too long.' })
    .optional()
    .default(''),
  status: z
    .enum(['draft', 'scheduled'], {
      errorMap: () => ({ message: 'Status must be either "draft" or "scheduled".' }),
    })
    .optional()
    .default('draft'),
  scheduled_at: z
    .string()
    .datetime({ message: 'Scheduled date must be a valid ISO 8601 datetime.' })
    .optional()
    .nullable(),
});

const LETTER_COLUMNS = 'id, user_id, title, slug, subject_line, body_html, body_text, status, recipient_count, scheduled_at, sent_at, created_at, updated_at' as const;

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return unauthorizedResponse();
    }

    const searchParams = request.nextUrl.searchParams;
    const { page, limit, offset } = parsePagination(searchParams);
    const statusFilter = searchParams.get('status');

    let countQuery = supabase
      .from('letters')
      .select('id', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (statusFilter) {
      countQuery = countQuery.eq('status', statusFilter);
    }

    const { count, error: countError } = await countQuery;

    if (countError) {
      console.error('Letters count query error:', countError.message);
      return internalErrorResponse();
    }

    let dataQuery = supabase
      .from('letters')
      .select(LETTER_COLUMNS)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (statusFilter) {
      dataQuery = dataQuery.eq('status', statusFilter);
    }

    const { data: letters, error: dataError } = await dataQuery;

    if (dataError) {
      console.error('Letters list query error:', dataError.message);
      return internalErrorResponse();
    }

    const total = count ?? 0;
    const responseData: PaginatedData<LetterRow> = {
      items: (letters as LetterRow[]) || [],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return successResponse(responseData);
  } catch (error) {
    console.error('GET /api/letters error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return unauthorizedResponse();
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

    const validation = createLetterSchema.safeParse(body);

    if (!validation.success) {
      return validationErrorResponse(validation.error);
    }

    const { title, slug, subject_line, body_html, body_text, status, scheduled_at } = validation.data;

    if (status === 'scheduled' && !scheduled_at) {
      return validationErrorResponse(
        new z.ZodError([
          {
            code: 'custom',
            path: ['scheduled_at'],
            message: 'A scheduled date is required when status is "scheduled".',
          },
        ])
      );
    }

    const { data: letter, error } = await supabase
      .from('letters')
      .insert({
        user_id: user.id,
        title,
        slug,
        subject_line: subject_line ?? null,
        body_html,
        body_text,
        status,
        scheduled_at: scheduled_at ?? null,
      })
      .select(LETTER_COLUMNS)
      .single();

    if (error) {
      if (error.code === '23505') {
        return validationErrorResponse(
          new z.ZodError([
            {
              code: 'custom',
              path: ['slug'],
              message: 'You already have a letter with this slug. Please choose a different one.',
            },
          ])
        );
      }
      console.error('Letter insert error:', error.message);
      return internalErrorResponse();
    }

    return successResponse(letter as LetterRow, 201);
  } catch (error) {
    console.error('POST /api/letters error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}
