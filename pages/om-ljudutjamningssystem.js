import Head from "next/head";
import Image from "next/image";
import PageIntro from "../components/pageIntro/pageIntro";
import styles from "../styles/site.module.css";
import rogerSoundfield from "../public/images/rogerSoundfield.webp";

export default function AboutSoundBalacingSystem() {
  return (
    <>
      <Head>
        <title>
          Om ljudutjämningssystem | Tydligare tal i klassrum och lokaler
        </title>
        <meta
          name="description"
          content="Läs om fördelarna med ljudutjämningssystem för taluppfattning, koncentration och bättre ljudmiljö i klassrum och offentliga lokaler."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://horselservice.se/om-ljudutjamningssystem"
        />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Om ljudutjämningssystem | Tydligare tal i klassrum och lokaler"
        />
        <meta
          property="og:description"
          content="Läs om fördelarna med ljudutjämningssystem för taluppfattning, koncentration och bättre ljudmiljö i klassrum och offentliga lokaler."
        />
        <meta
          property="og:url"
          content="https://horselservice.se/om-ljudutjamningssystem"
        />
        <meta
          property="og:image"
          content="https://horselservice.se/images/rogerSoundfield.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <PageIntro
          compact
          eyebrow="Om Hörselservice"
          title="Fördelar med ljudutjämningssystem"
          text={
            <ul className={styles.list}>
              <li>
                Tydligare taluppfattning: förstärker de ljud som är viktigast
                för talförståelsen, särskilt konsonanter som bär mycket av
                språkets information.
              </li>
              <li>
                Ökad koncentration: genom att minska bakgrundsstörningar kan
                elever fokusera bättre.
              </li>
              <li>
                Främjar taluppfattning för språkligt sårbara grupper, till
                exempel elever med språkstörning, annat modersmål,
                neuropsykiatriska funktionsnedsättningar och synnedsättningar.
              </li>
              <li>
                Går att ansluta till annan teknik via Bluetooth, till exempel
                hörlurar, TV eller dator.
              </li>
              <li>Sparar lärarens röst.</li>
              <li>
                För elever som behöver avskilja sig från andra ljudintryck och
                bara höra lärarens röst och datorljud finns en teknisk lösning
                för detta.
              </li>
            </ul>
          }
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          secondaryHref="/produkter"
          secondaryLabel="Se produkter"
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image
                src={rogerSoundfield}
                alt="Roger Soundfield"
                fill
                className={styles.mediaImage}
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </div>
          }
        />
      </main>
    </>
  );
}
