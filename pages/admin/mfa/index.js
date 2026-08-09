import Head from "next/head";
import MfaForm from "../../../components/admin/mfaForm/mfaForm";
import styles from "../../../styles/mfaIndex.module.css";

export default function AdminMfaPage() {
  return (
    <>
      <Head>
        <title>
          Verifiera inloggning | Hörselservice
        </title>

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>

      <main className={styles.page}>
        <section
          className={styles.card}
          aria-labelledby="mfa-title"
        >
          <p className={styles.eyebrow}>
            Administration
          </p>

          <h1
            id="mfa-title"
            className={styles.title}
          >
            Verifiera inloggning
          </h1>

          <p className={styles.description}>
            Ange den sexsiffriga koden från
            din autentiseringsapp.
          </p>

          <MfaForm />
        </section>
      </main>
    </>
  );
}