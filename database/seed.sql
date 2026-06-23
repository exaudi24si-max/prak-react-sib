-- ============================================================
-- SEED DATA — Buat User Admin & Member untuk Testing
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Script ini akan:
-- 1. Membuat user langsung di auth.users
-- 2. Trigger handle_new_user otomatis membuat baris di public.profiles
-- 3. Update role user pertama menjadi Admin


-- ============================================================
-- USER 1: Admin Sedap (role = Admin)
-- Email   : admin@sedap.com
-- Password: password123
-- ============================================================
DO $$
DECLARE
  admin_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    admin_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'admin@sedap.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"full_name": "Admin Sedap"}'::jsonb,
    now(),
    now()
  );

  -- Trigger handle_new_user otomatis membuat profil dengan role Member
  -- Kita update ke Admin setelah profil terbentuk
  UPDATE public.profiles
  SET role = 'Admin'
  WHERE id = admin_id;

  RAISE NOTICE '✅ Admin created — ID: %, Email: admin@sedap.com', admin_id;
END;
$$;


-- ============================================================
-- USER 2: Budi Member (role = Member, tier = Silver)
-- Email   : budi@sedap.com
-- Password: password123
-- ============================================================
DO $$
DECLARE
  member_id uuid := gen_random_uuid();
BEGIN
  INSERT INTO auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
  ) VALUES (
    member_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'budi@sedap.com',
    crypt('password123', gen_salt('bf')),
    now(),
    '{"full_name": "Budi Member"}'::jsonb,
    now(),
    now()
  );

  -- Update poin dan tier agar lebih menarik untuk demo
  UPDATE public.profiles
  SET tier = 'Silver', points = 1500
  WHERE id = member_id;

  RAISE NOTICE '✅ Member created — ID: %, Email: budi@sedap.com', member_id;
END;
$$;


-- ============================================================
-- SEED CUSTOMERS — Data customer untuk demo CRUD
-- ============================================================
INSERT INTO public.customers (name, email, phone, loyalty, address, joined) VALUES
  ('Andi 1', 'andi1@example.com', '08121231201', 'Bronze', 'Jl. Contoh No.1, Jakarta', '2025-01-15'),
  ('Budi 2', 'budi2@example.com', '08121231202', 'Silver', 'Jl. Contoh No.2, Jakarta', '2025-02-15'),
  ('Cici 3', 'cici3@example.com', '08121231203', 'Gold',   'Jl. Contoh No.3, Jakarta', '2025-03-15'),
  ('Dodi 4', 'dodi4@example.com', '08121231204', 'Bronze', 'Jl. Contoh No.4, Jakarta', '2025-04-15'),
  ('Eka 5',  'eka5@example.com',  '08121231205', 'Silver', 'Jl. Contoh No.5, Jakarta', '2025-05-15'),
  ('Fani 6', 'fani6@example.com', '08121231206', 'Gold',   'Jl. Contoh No.6, Jakarta', '2025-06-15'),
  ('Gita 7', 'gita7@example.com', '08121231207', 'Bronze', 'Jl. Contoh No.7, Jakarta', '2025-01-15'),
  ('Hadi 8', 'hadi8@example.com', '08121231208', 'Silver', 'Jl. Contoh No.8, Jakarta', '2025-02-15'),
  ('Indah 9','indah9@example.com','08121231209', 'Gold',   'Jl. Contoh No.9, Jakarta', '2025-03-15'),
  ('Joko 10','joko10@example.com','08121231210', 'Bronze', 'Jl. Contoh No.10, Jakarta','2025-04-15');


-- ============================================================
-- VERIFIKASI — Cek hasil insert
-- ============================================================
SELECT
  p.id,
  p.full_name,
  p.role,
  p.tier,
  p.points,
  u.email,
  p.created_at
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
ORDER BY p.created_at DESC;

SELECT id, name, email, loyalty FROM public.customers ORDER BY id;
