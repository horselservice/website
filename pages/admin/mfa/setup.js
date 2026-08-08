import Head from "next/head";

import MfaSetup from "../../../components/admin/mfaSetup/mfaSetup";

export default function AdminMfaSetupPage() {
  return (
    <>
      <Head>
        <title>Aktivera MFA | Hörselservice</title>

        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main>
        <MfaSetup />
      </main>
    </>
  );
}
