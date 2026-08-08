import Head from "next/head";

import MfaForm from "../../../components/admin/mfaForm/mfaForm";

export default function AdminMfaPage() {
  return (
    <>
      <Head>
        <title>Verifiera inloggning | Hörselservice</title>

        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main>
        <MfaForm />
      </main>
    </>
  );
}
