-- Fix RLS for parent lookup: avoid referencing user_roles directly (blocked by its RLS)

DROP POLICY IF EXISTS "Parents can lookup students by email for linking" ON public.profiles;

-- Allow parents to read student profiles (limited) for linking by leveraging SECURITY DEFINER role check
CREATE POLICY "Parents can lookup student profiles for linking"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  has_role(auth.uid(), 'parent'::app_role)
  AND has_role(profiles.id, 'student'::app_role)
);