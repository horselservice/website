import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  createSupabaseBrowserClient,
} from "../../lib/supabase/browserClient";

export default function AdminPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
  let isMounted = true;

  async function checkAdminAccess() {
    try {
      const supabase =
        createSupabaseBrowserClient();

      const {
        data: { session },
        error: sessionError,
      } =
        await supabase.auth.getSession();

      if (sessionError) {
        throw sessionError;
      }

      if (!isMounted) {
        return;
      }

      /*
       * Inte inloggad.
       */
      if (!session) {
        await router.replace(
          "/admin/login"
        );

        return;
      }

      const {
        data: aalData,
        error: aalError,
      } =
        await supabase.auth.mfa
          .getAuthenticatorAssuranceLevel();

      if (aalError) {
        throw aalError;
      }

      if (!isMounted) {
        return;
      }

      /*
       * Inloggad med lösenord men ingen MFA registrerad.
       */
      if (
        aalData.nextLevel !== "aal2"
      ) {
        await router.replace(
          "/admin/mfa/setup"
        );

        return;
      }

      /*
       * MFA finns registrerat men inte verifierat för denna sessionen.
       */
      if (
        aalData.currentLevel !== "aal2"
      ) {
        await router.replace(
          "/admin/mfa"
        );

        return;
      }

      /*
       * Användare inloggad.
       */

      setEmail(
        session.user.email ?? ""
      );

      setIsLoading(false);
    } catch (error) {
      console.error(
        "Admin authentication failed:",
        error
      );

      await router.replace(
        "/admin/login"
      );
    }
  }

  checkAdminAccess();

  return () => {
    isMounted = false;
  };
}, [router]);

  async function handleLogout() {
    const supabase =
      createSupabaseBrowserClient();

    await supabase.auth.signOut();

    await router.replace(
      "/admin/login"
    );
  }

  if (isLoading) {
    return (
      <main>
        <p>Kontrollerar inloggning...</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>
          Administration | Hörselservice
        </title>

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>

      <main>
        <h1>Administration - test</h1>

        <p>Inloggad som {email}</p>

        <button
          type="button"
          onClick={handleLogout}
        >
          Logga ut
        </button>
      </main>
    </>
  );
}