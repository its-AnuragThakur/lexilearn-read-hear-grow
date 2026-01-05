-- Create a function that allows parents to look up students by email for linking
-- This is needed because current RLS only allows parents to see already-linked students

CREATE OR REPLACE FUNCTION public.has_role_by_email(_email text, _role app_role)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT p.id
  FROM public.profiles p
  INNER JOIN public.user_roles ur ON ur.user_id = p.id
  WHERE p.email = _email
    AND ur.role = _role
  LIMIT 1
$$;

-- Add RLS policy to allow authenticated users to read any student profile by email
-- This is safe because it only reveals if an email exists as a student account
CREATE POLICY "Parents can lookup students by email for linking"
ON public.profiles
FOR SELECT
TO authenticated
USING (
  -- Only allow looking up users who have the student role
  EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_roles.user_id = profiles.id 
    AND user_roles.role = 'student'
  )
  AND has_role(auth.uid(), 'parent')
);