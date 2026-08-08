import { useEffect, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { createSupabaseBrowserClient } from "../../../lib/supabase/browserClient";
import { requireAdmin } from "../../../lib/admin/requireAdmin";
import styles from "../../../styles/adminLayout.module.css";

export default function AdminLayout({ children, title }) {
  const router = useRouter();

  const [session, setSession] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkAccess() {
      try {
        const supabase = createSupabaseBrowserClient();

        const adminSession = await requireAdmin({
          supabase,
          router,
        });

        if (mounted && adminSession) {
          setSession(adminSession);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Admin access check failed:", error);

        if (mounted) {
          await router.replace("/admin/login");
        }
      }
    }

    checkAccess();

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handleLogout() {
    const supabase = createSupabaseBrowserClient();

    await supabase.auth.signOut();

    await router.replace("/admin/login");
  }

  if (isLoading) {
    return (
      <main className={styles.loadingPage}>
        <p>Kontrollerar inloggning...</p>
      </main>
    );
  }

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <div>
          <Link href="/admin" className={styles.adminBrand}>
            Hörselservice
            <span>Administration</span>
          </Link>

          <nav className={styles.adminNav} aria-label="Administration">
            <Link
              href="/admin"
              className={
                router.pathname === "/admin"
                  ? styles.activeNavLink
                  : styles.navLink
              }
            >
              Översikt
            </Link>

            <Link
              href="/admin/produkter"
              className={
                router.pathname.startsWith("/admin/produkter")
                  ? styles.activeNavLink
                  : styles.navLink
              }
            >
              Produkter
            </Link>
          </nav>
        </div>

        <div className={styles.sidebarFooter}>
          <span>{session?.user?.email}</span>

          <button
            type="button"
            className={styles.logoutButton}
            onClick={handleLogout}
          >
            Logga ut
          </button>
        </div>
      </aside>

      <div className={styles.adminContent}>
        <header className={styles.adminHeader}>
          <h1>{title}</h1>
        </header>

        <main className={styles.adminMain}>{children}</main>
      </div>
    </div>
  );
}
