import Head from "next/head";
import Image from "next/image";
import PageIntro from "../components/pageIntro/pageIntro";
import styles from "../styles/site.module.css";
import formgjutetHorselskydd from "../public/images/horselskydd.webp";

export default function OmFormgjutnaHorselskydd() {
  return (
    <>
      <Head>
        <title>Om formgjutna hörselskydd | Komfort och ljudkvalitet</title>
        <meta name="description" content="Lär dig mer om formgjutna hörselskydd, individuell passform, filter, komfort och när formgjutna öronproppar är ett bra val." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://horselservice.se/om-formgjutna-horselskydd" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Om formgjutna hörselskydd | Komfort och ljudkvalitet" />
        <meta property="og:description" content="Lär dig mer om formgjutna hörselskydd, individuell passform, filter, komfort och när formgjutna öronproppar är ett bra val." />
        <meta property="og:url" content="https://horselservice.se/om-formgjutna-horselskydd" />
        <meta property="og:image" content="https://horselservice.se/images/horselskydd.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <PageIntro
          compact
          eyebrow="Om Hörselservice"
          title="Om formgjutna hörselskydd"
          text="Om du vet med dig att du kommer använda dina hörselskydd ofta och har höga krav på ljudkvalitet och komfort är det en god idé att skaffa formgjutna hörselskydd. Formgjutna hörselskydd tillverkas individuellt utifrån en exakt avgjutning av dina hörselgångar. På så vis sitter hörselskydden perfekt på plats och är mycket bekväma att bära. Filtren i hörselskydden andas vilket motverkar lockkänsla och fukt i öronen. Våra formgjutna hörselskydd är speciellt utvecklade för att dämpa ljudnivån utan att ge avkall på ljudkvaliteten. Hörselskyddens filter släpper igenom tal men dämpar skadliga ljud. Detta gör att man kan höra tal trots att man befinner sig i en bullrig miljö. Filtren finns i olika dämpningsgrader och anpassas efter den ljudmiljö du befinner dig i. Alla skydd är CE- godkända och görs i allergivänligt material."
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          secondaryHref="/produkter"
          secondaryLabel="Se produkter"
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image src={formgjutetHorselskydd} alt="Formgjutet hörselskydd" fill className={styles.mediaImage} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
          }
        />
      </main>
    </>
  );
}