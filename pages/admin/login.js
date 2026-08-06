import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import LoginForm from "../../components/admin/loginForm/LoginForm";

import {
  createSupabaseBrowserClient,
} from "../../lib/supabase/browserClient";

import styles from "../../styles/adminLogin.module.css";

export default function AdminLoginPage() {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] =
    useState(true);

  useEffect(() => {
    let isMounted = true;

    async function checkSession() {
      try {
        const supabase =
          createSupabaseBrowserClient();

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!isMounted) {
          return;
        }

        if (session) {
          await router.replace("/admin");
          return;
        }
      } catch (error) {
        console.error(
          "Could not check admin session:",
          error
        );
      }

      if (isMounted) {
        setIsCheckingSession(false);
      }
    }

    checkSession();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>
          Admininloggning | Hörselservice
        </title>

        <meta
          name="description"
          content="Inloggning till administrativ portal."
        />

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>

      <main className={styles.page}>
        <section
          className={styles.card}
          aria-labelledby="admin-login-title"
        >
          <p className={styles.eyebrow}>
            Administration
          </p>

          <h1
            id="admin-login-title"
            className={styles.title}
          >
            Logga in
          </h1>

          {isCheckingSession ? (
            <p
              className={styles.description}
              role="status"
            >
              Kontrollerar inloggning...
            </p>
          ) : (
            <LoginForm />
          )}
        </section>
      </main>
    </>
  );
}