-- ============================================================
-- SEDAP RESTAURANT ADMIN DASHBOARD — SUPABASE SCHEMA SETUP
-- Jalankan script ini secara BERURUTAN di Supabase SQL Editor
-- ============================================================


-- ============================================================
-- STEP 1: BUAT TABEL profiles
-- Terhubung ke auth.users, menyimpan data tambahan user
-- ============================================================

CREATE TABLE IF NOT EXISTS public.profiles (
  id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name   text,
  role        text NOT NULL DEFAULT 'Member'
                CHECK (role IN ('Admin', 'Member')),
  tier        text NOT NULL DEFAULT 'Bronze'
                CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  points      integer NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: User yang login bisa membaca profil sendiri
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Policy: User hanya bisa update full_name milik sendiri
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: Admin punya akses penuh ke semua profil
CREATE POLICY "Admin full access to profiles"
  ON public.profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  );


-- ============================================================
-- STEP 2: BUAT TABEL products
-- ============================================================

CREATE TABLE IF NOT EXISTS public.products (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  price       numeric NOT NULL,
  stock       integer NOT NULL DEFAULT 0,
  created_at  timestamptz DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang (termasuk guest/anonymous) bisa membaca produk
CREATE POLICY "Anyone can read products"
  ON public.products
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Hanya Admin yang bisa INSERT, UPDATE, DELETE
CREATE POLICY "Admin can manage products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  );


-- ============================================================
-- STEP 3: BUAT TABEL customers
-- Menyimpan data customer/member selain dari auth.users
-- ============================================================

CREATE TABLE IF NOT EXISTS public.customers (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  email       text UNIQUE NOT NULL,
  phone       text,
  loyalty     text NOT NULL DEFAULT 'Bronze'
                CHECK (loyalty IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  address     text,
  joined      date DEFAULT CURRENT_DATE,
  created_at  timestamptz DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;

-- Policy: Semua authenticated user bisa membaca customers
CREATE POLICY "Authenticated users can read customers"
  ON public.customers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: Hanya Admin yang bisa INSERT, UPDATE, DELETE
CREATE POLICY "Admin can manage customers"
  ON public.customers
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  );


-- ============================================================
-- STEP 4: BUAT TABEL orders
-- ============================================================

CREATE TABLE IF NOT EXISTS public.orders (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  member_id            uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  total_original_price numeric NOT NULL,
  discount_applied     numeric DEFAULT 0,
  total_final_price    numeric NOT NULL,
  points_earned        integer DEFAULT 0,
  status               text NOT NULL DEFAULT 'Pending'
                         CHECK (status IN ('Pending', 'Completed', 'Cancelled')),
  created_at           timestamptz DEFAULT now()
);

-- Aktifkan RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Member hanya bisa membaca order milik sendiri
CREATE POLICY "Members can read own orders"
  ON public.orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = member_id);

-- Policy: Member hanya bisa membuat order atas nama sendiri
CREATE POLICY "Members can insert own orders"
  ON public.orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = member_id);

-- Policy: Admin punya akses penuh ke semua order
CREATE POLICY "Admin full access to orders"
  ON public.orders
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.role = 'Admin'
    )
  );


-- ============================================================
-- STEP 5: FUNGSI & TRIGGER — Auto-create profile saat Register
-- Setiap user baru di auth.users otomatis dibuat profilnya
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role, tier, points)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    'Member',
    'Bronze',
    0
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Hapus trigger lama jika ada, lalu buat ulang
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();


-- ============================================================
-- STEP 6 (OPSIONAL): Jadikan akun pertama sebagai Admin
-- Jalankan ini SETELAH Anda register melalui UI,
-- lalu ganti 'email-anda@example.com' dengan email Anda.
-- ============================================================

-- UPDATE public.profiles
-- SET role = 'Admin'
-- WHERE id = (
--   SELECT id FROM auth.users WHERE email = 'email-anda@example.com'
-- );


-- ============================================================
-- SELESAI — Semua tabel, RLS, dan trigger sudah siap.
-- ============================================================
