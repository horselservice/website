import Head from "next/head";
import Link from "next/link";
import AdminLayout from "../../components/admin/adminLayout/adminLayout";
import styles from "../../styles/adminIndex.module.css";

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Administration | Hörselservice</title>

        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout title="Översikt">
        <section className={styles.intro}>
          <h2>Vad vill du ändra?</h2>
        </section>

        <section className={styles.grid}>
          <Link href="/admin/produkter" className={styles.card}>
            <span className={styles.eyebrow}>Innehåll</span>

            <h3>Produkter</h3>

            <p>Ändra produkttexter, priser och bilder.</p>

            <strong>Hantera produkter</strong>
          </Link>
        </section>
      </AdminLayout>
    </>
  );
}
