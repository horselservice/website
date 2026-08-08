import Head from "next/head";
import Image from "next/image";
import PageIntro from "../components/pageIntro/pageIntro";
import styles from "../styles/site.module.css";
import staffImage from "../public/images/hearing-section-1600.webp";

export default function About() {
  return (
    <>
      <Head>
        <title>Om Hörselservice | Hörsellösningar i Växjö och Kronoberg</title>
        <meta
          name="description"
          content="Läs mer om Hörselservice i Kronoberg, vår erfarenhet av hörsellösningar och hur vi hjälper privatpersoner, företag och verksamheter."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://horselservice.se/about" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Om Hörselservice | Hörsellösningar i Växjö och Kronoberg"
        />
        <meta
          property="og:description"
          content="Läs mer om Hörselservice i Kronoberg, vår erfarenhet av hörsellösningar och hur vi hjälper privatpersoner, företag och verksamheter."
        />
        <meta property="og:url" content="https://horselservice.se/about" />
        <meta
          property="og:image"
          content="https://horselservice.se/images/hearing-section-1600.webp"
        />
      </Head>

      <main className={styles.page}>
        <PageIntro
          compact
          eyebrow="Om Hörselservice"
          title="Specialister på hörsellösningar med personlig rådgivning."
          text="Vi hjälper kunder i Växjö och Kronoberg med formgjutna hörselskydd, aktiva hörselskydd och ljudutjämningssystem anpassade efter verkliga behov."
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          secondaryHref="/produkter"
          secondaryLabel="Se produkter"
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image
                src={staffImage}
                alt="Personal hos Hörselservice i Kronoberg"
                fill
                className={styles.mediaImage}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          }
        />

        <section className={styles.infoGrid}>
          <div>
            <div className={styles.eyebrow}>Vår bakgrund</div>
            <h2 className={styles.sectionTitle}>
              Erfarenhet, trygghet och ett tydligare kundmöte.
            </h2>
            <p className={styles.sectionText}>
              Vi på Hörselservice i Kronoberg är experter på ljudlösningar, med
              lång erfarenhet inom området kan vi hjälpa våra kunder till bättre
              komfort, tydligare ljudmiljöer och hållbara lösningar. Alla
              avgjtuningar utförs av en legitimerad audionom.
            </p>
          </div>
          <div className={styles.detailCard}>
            <div className={styles.contactInfoList}>
              <div className={styles.contactInfoCard}>
                <strong>Plats</strong>Centrala Växjö med bra
                parkeringsmöjligheter och kollektivtrafik.
              </div>
              <div className={styles.contactInfoCard}>
                <strong>Fokus</strong>Individuellt anpassade lösningar för
                privatpersoner och verksamheter.
              </div>
              <div className={styles.contactInfoCard}>
                <strong>Arbetssätt</strong>Rådgivning, avgjutning, produktval
                och uppföljning i ett tydligare flöde.
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
