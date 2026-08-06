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

    async function checkSession() {
      const supabase =
        createSupabaseBrowserClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (!session) {
        await router.replace(
          "/admin/login"
        );

        return;
      }

      setEmail(
        session.user.email ?? ""
      );

      setIsLoading(false);
    }

    checkSession();

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