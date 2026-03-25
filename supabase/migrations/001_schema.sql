-- ============================================================================
-- EquityLetter — Production-Ready PostgreSQL Schema for Supabase
-- ============================================================================
-- KERNEL: Users create, manage, and send equity-related letters/documents
-- (cap table updates, investor updates, equity grant notifications, etc.)
-- Build order: enums → tables → indexes → RLS → functions → triggers → seed
-- ============================================================================

-- ============================================================================
-- 0. ENUMS
-- ============================================================================

CREATE TYPE user_role AS ENUM ('user', 'admin');

CREATE TYPE subscription_status AS ENUM (
  'trialing',
  'active',
  'past_due',
  'canceled',
  'unpaid',
  'incomplete',
  'incomplete_expired',
  'paused'
);

CREATE TYPE subscription_plan AS ENUM ('free', 'starter', 'pro', 'enterprise');

CREATE TYPE letter_status AS ENUM ('draft', 'scheduled', 'sent', 'failed', 'archived');

-- ============================================================================
-- 1. TABLES
-- ============================================================================

-- ---------------------------------------------------------------------------
-- profiles — extends Supabase auth.users (1:1)
-- ---------------------------------------------------------------------------
CREATE TABLE profiles (
  id            uuid PRIMARY KEY REFERENCES auth.users (id) ON DELETE CASCADE,
  email         text NOT NULL,
  full_name     text,
  company_name  text,
  role          user_role NOT NULL DEFAULT 'user',
  avatar_url    text,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE profiles IS 'User profile extending Supabase auth.users';

-- ---------------------------------------------------------------------------
-- subscriptions — Stripe billing state (1 active per user)
-- ---------------------------------------------------------------------------
CREATE TABLE subscriptions (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id             uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  stripe_customer_id  text,
  stripe_subscription_id text UNIQUE,
  plan                subscription_plan NOT NULL DEFAULT 'free',
  status              subscription_status NOT NULL DEFAULT 'active',
  current_period_start timestamptz,
  current_period_end  timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_subscriptions_user UNIQUE (user_id)
);

COMMENT ON TABLE subscriptions IS 'One subscription row per user — mirrors Stripe state';

-- ---------------------------------------------------------------------------
-- letters — the KERNEL entity: equity letters users create & send
-- ---------------------------------------------------------------------------
CREATE TABLE letters (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id       uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  title         text NOT NULL,
  slug          text NOT NULL,
  subject_line  text,
  body_html     text NOT NULL DEFAULT '',
  body_text     text NOT NULL DEFAULT '',
  status        letter_status NOT NULL DEFAULT 'draft',
  recipient_count integer NOT NULL DEFAULT 0,
  scheduled_at  timestamptz,
  sent_at       timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT uq_letters_user_slug UNIQUE (user_id, slug)
);

COMMENT ON TABLE letters IS 'Core entity — equity letters/updates authored by users';

-- ---------------------------------------------------------------------------
-- recipients — people a letter is addressed to
-- ---------------------------------------------------------------------------
CREATE TABLE recipients (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  letter_id     uuid NOT NULL REFERENCES letters (id) ON DELETE CASCADE,
  user_id       uuid NOT NULL REFERENCES profiles (id) ON DELETE CASCADE,
  email         text NOT NULL,
  name          text,
  opened_at     timestamptz,
  clicked_at    timestamptz,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE recipients IS 'Delivery targets for each letter — tracks open/click';

-- ============================================================================
-- 2. INDEXES
-- ============================================================================

-- profiles
CREATE INDEX idx_profiles_email ON profiles (email);

-- subscriptions
CREATE INDEX idx_subscriptions_user_id ON subscriptions (user_id);
CREATE INDEX idx_subscriptions_stripe_customer ON subscriptions (stripe_customer_id);
CREATE INDEX idx_subscriptions_status ON subscriptions (status);
CREATE INDEX idx_subscriptions_active ON subscriptions (user_id)
  WHERE status = 'active';

-- letters
CREATE INDEX idx_letters_user_id ON letters (user_id);
CREATE INDEX idx_letters_status ON letters (status);
CREATE INDEX idx_letters_user_status ON letters (user_id, status);
CREATE INDEX idx_letters_slug ON letters (slug);
CREATE INDEX idx_letters_scheduled ON letters (scheduled_at)
  WHERE status = 'scheduled';

-- recipients
CREATE INDEX idx_recipients_letter_id ON recipients (letter_id);
CREATE INDEX idx_recipients_user_id ON recipients (user_id);
CREATE INDEX idx_recipients_email ON recipients (email);

-- ============================================================================
-- 3. ROW-LEVEL SECURITY
-- ============================================================================

-- Enable RLS on every table
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- profiles policies
-- ---------------------------------------------------------------------------
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
-- subscriptions policies
-- ---------------------------------------------------------------------------
CREATE POLICY "Users can read own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription"
  ON subscriptions FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can read all subscriptions"
  ON subscriptions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
-- letters policies
-- ---------------------------------------------------------------------------
CREATE POLICY "Users can read own letters"
  ON letters FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own letters"
  ON letters FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own letters"
  ON letters FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own letters"
  ON letters FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all letters"
  ON letters FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ---------------------------------------------------------------------------
-- recipients policies
-- ---------------------------------------------------------------------------
CREATE POLICY "Users can read own recipients"
  ON recipients FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own recipients"
  ON recipients FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own recipients"
  ON recipients FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipients"
  ON recipients FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can read all recipients"
  ON recipients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles p WHERE p.id = auth.uid() AND p.role = 'admin'
    )
  );

-- ============================================================================
-- 4. FUNCTIONS & TRIGGERS
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Auto-update updated_at on every table
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_letters_updated_at
  BEFORE UPDATE ON letters
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_recipients_updated_at
  BEFORE UPDATE ON recipients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create profile + free subscription when a new user signs up
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', '')
  );

  -- Create free subscription
  INSERT INTO public.subscriptions (user_id, plan, status)
  VALUES (NEW.id, 'free', 'active');

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ---------------------------------------------------------------------------
-- Sync recipient_count on letters when recipients change
-- ---------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION sync_recipient_count()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  target_letter_id uuid;
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_letter_id := OLD.letter_id;
  ELSE
    target_letter_id := NEW.letter_id;
  END IF;

  UPDATE letters
  SET recipient_count = (
    SELECT count(*) FROM recipients WHERE letter_id = target_letter_id
  )
  WHERE id = target_letter_id;

  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_recipients_count_insert
  AFTER INSERT ON recipients
  FOR EACH ROW EXECUTE FUNCTION sync_recipient_count();

CREATE TRIGGER trg_recipients_count_delete
  AFTER DELETE ON recipients
  FOR EACH ROW EXECUTE FUNCTION sync_recipient_count();

-- ============================================================================
-- 5. SEED DATA
-- ============================================================================

-- No lookup tables needed — plans are an enum on subscriptions.
-- Free plan is the default via handle_new_user().
-- Seed is intentionally minimal: real data comes from Stripe webhooks + user actions.

-- Self-validation patches
-- ==========================================================================
-- PATCH: Fix admin RLS infinite recursion on profiles table
-- The admin policies query profiles to check role, which triggers RLS again.
-- Solution: Use a SECURITY DEFINER function to check admin status.
-- ==========================================================================

-- Drop the recursive admin policies
DROP POLICY IF EXISTS "Admins can read all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can read all subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Admins can read all letters" ON letters;
DROP POLICY IF EXISTS "Admins can read all recipients" ON recipients;

-- Create a SECURITY DEFINER function that bypasses RLS to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Recreate admin policies using the safe function
CREATE POLICY "Admins can read all profiles"
  ON profiles FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can read all subscriptions"
  ON subscriptions FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can read all letters"
  ON letters FOR SELECT
  USING (is_admin());

CREATE POLICY "Admins can read all recipients"
  ON recipients FOR SELECT
  USING (is_admin());
