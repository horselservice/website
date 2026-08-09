import Head from "next/head";
import MfaSetup from "../../../components/admin/mfaSetup/mfaSetup";
import styles from "../../../styles/mfaSetupPage.module.css";

export default function AdminMfaSetupPage() {
  return (
    <>
      <Head>
        <title>
          Aktivera MFA | Hörselservice
        </title>

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>

      <main className={styles.page}>
        <section
          className={styles.card}
          aria-labelledby="mfa-setup-title"
        >
          <p className={styles.eyebrow}>
            Administration
          </p>

          <h1
            id="mfa-setup-title"
            className={styles.title}
          >
            Aktivera tvåstegsverifiering
          </h1>

          <p className={styles.description}>
            Skanna QR-koden med din
            autentiseringsapp och ange sedan
            den sexsiffriga koden.
          </p>

          <MfaSetup />
        </section>
      </main>
    </>
  );
}