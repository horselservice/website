import Head from "next/head";
import Image from "next/image";
import PageIntro from "../components/pageIntro/pageIntro";
import styles from "../styles/site.module.css";
import formgjutningOra from "../public/images/formgjutningOra.webp";

export default function BeforeAppointment() {
  return (
    <>
      <Head>
        <title>Så går en avgjutning till | Hörselservice Växjö</title>
        <meta name="description" content="Information inför besök hos Hörselservice: så görs en avgjutning för formgjutna hörselskydd och detta bör du tänka på innan besöket." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://horselservice.se/fore-besok" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Så går en avgjutning till | Hörselservice Växjö" />
        <meta property="og:description" content="Information inför besök hos Hörselservice: så görs en avgjutning för formgjutna hörselskydd och detta bör du tänka på innan besöket." />
        <meta property="og:url" content="https://horselservice.se/fore-besok" />
        <meta property="og:image" content="https://horselservice.se/images/formgjutningOra.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <PageIntro
          compact
          eyebrow="Om Hörselservice"
          title="Såhär går det till"
          text="För att dina formgjutna hörselskydd ska passa så bra som möjligt görs en avgjutning av öron och hörselgångar. Örat fylls med en silikonmassa som får stelna i några minuter. Därefter tas massan försiktigt ut ur örat och en avgjutning av örat har utförts. Avgjutningarna skickas därefter till tillverkare och efter ca 3 veckor är hörselskydden klara. Inför avtryckstagning är det viktigt att öronen är fria från vax."
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          secondaryHref="/produkter"
          secondaryLabel="Se produkter"
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image src={formgjutningOra} alt="Formgjutning av Öra" fill className={styles.mediaImage} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          }
        />
      </main>
    </>
  );
}