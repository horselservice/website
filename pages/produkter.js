import Head from "next/head";
import styles from "../styles/site.module.css";
import ProductCategoryCard from "../components/productCategoryCard/productCategoryCard";

const categories = [
  {
    href: "/passiva-horselskydd",
    title: "Passiva hörselskydd",
    description:
      "Formgjutna hörselskydd för musik, jakt, industri, motorsport och sömn.",
    image: "/images/musik.webp",
    imageAlt: "Passiva hörselskydd för musik och tal",
    products: [
      {
        href: "/products/formgjutna-horselskydd-musik",
        title: "Musik och tal",
        description: "Dämpar ljudnivån men bevarar ljudkvaliteten för tal och musik.",
        image: "/images/musik.webp",
      },
      {
        href: "/products/formgjutna-horselskydd-jakt",
        title: "Jakt",
        description: "För kraftiga ljudnivåer samtidigt som tal släpps igenom.",
        image: "/images/jakt.webp"
      },
    ],
  },
  {
    href: "/bluetooth-horselskydd",
    title: "Aktiva hörselskydd",
    description:
      "Aktiva hörselskydd och Bluetooth-lösningar för jakt och kommunikation.",
    image: "/images/jagare.webp",
    imageAlt: "Aktiva hörselskydd för jakt",
    products: [
      {
        href: "/bluetooth-products/eartech-active-pro",
        title: "HA Active Pro",
        description: "Aktivt hörselskydd för jakt med förstärkning av tal och svaga ljud.",
        image: "/images/jagare.webp",
      },
      {
        href: "/bluetooth-products/halsslinga",
        title: "Halsslinga",
        description: "Trådlös medhörning till mobiltelefon eller jaktradio.",
        image: "/images/halsslinga.webp",
      },
    ],
  },
  {
    href: "/ljudutjamningssystem",
    title: "Ljudutjämningssystem",
    description:
      "Lösningar för tydligare tal och bättre ljudmiljö i klassrum och offentliga lokaler.",
    image: "/images/konferans.webp",
    imageAlt: "Konferans",
    products: [
      {
        href: "/ljudutjamningssystem/phonak-roger-soundfield-5000",
        title: "Roger Soundfield 5000 V2",
        description: "För mindre lokaler där tydligt tal och delaktighet är viktigt.",
        image: "/images/rogerSpeaker.webp",
      },
      {
        href: "/ljudutjamningssystem/phonak-roger-soundfield-7000",
        title: "Roger Soundfield 7000 V2",
        description: "För större rum och verksamheter med högre krav på räckvidd.",
        image: "/images/rogerSpeaker.webp",
      },
    ],
  },
];

export default function Produkter() {
  return (
    <>
      <Head>
        <title>Produkter | Hörselskydd och ljudutjämningssystem</title>
        <meta name="description" content="Utforska Hörselservice produktkategorier: passiva hörselskydd, aktiva hörselskydd och ljudutjämningssystem." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://horselservice.se/produkter" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Produkter | Hörselskydd och ljudutjämningssystem" />
        <meta property="og:description" content="Utforska Hörselservice produktkategorier: passiva hörselskydd, aktiva hörselskydd och ljudutjämningssystem." />
        <meta property="og:url" content="https://horselservice.se/produkter" />
        <meta property="og:image" content="https://horselservice.se/images/musik.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={styles.page}>
      <section className={styles.lightSection}>
        <div className={styles.cardGrid}>
          {categories.map((category) => (
            <ProductCategoryCard key={category.href} {...category} />
          ))}
        </div>
      </section>
      </main>
    </>
  );
}