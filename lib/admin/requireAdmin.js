export async function requireAdmin({ supabase, router }) {
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw sessionError;
  }

  if (!session) {
    await router.replace("/admin/login");
    return null;
  }

  const { data: aalData, error: aalError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (aalError) {
    throw aalError;
  }

  if (aalData.nextLevel !== "aal2") {
    await router.replace("/admin/mfa/setup");

    return null;
  }

  if (aalData.currentLevel !== "aal2") {
    await router.replace("/admin/mfa");

    return null;
  }

  const { data: isAdmin, error: adminError } = await supabase.rpc("is_admin");

  if (adminError) {
    throw adminError;
  }

  if (!isAdmin) {
    await supabase.auth.signOut();

    await router.replace("/admin/login");

    return null;
  }

  return session;
}
