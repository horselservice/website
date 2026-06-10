import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ContactPanel from "../components/contactPanel/contactPanel";
import ProductCategoryCard from "../components/productCategoryCard/productCategoryCard";
import { getProducts } from "../lib/products/products";
import { getBluetoothProducts } from "../lib/bluetoothProducts/products";
import { getSoundfieldProducts } from "../lib/ljudutjamningssystem/products";
import { usePrice } from "../context/priceContext";
import { getDisplayPrice } from "../lib/pricing";
import styles from "../styles/site.module.css";
import earbudInEar from "../public/images/passformHorselskydd.webp";
import HomeVideo from "../components/homeVideo/homeVideo";

const productCategories = [
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
    image: "/images/rogerSpeaker.webp",
    imageAlt: "Roger Soundfield ljudutjämningssystem",
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

export async function getStaticProps() {
  const [products, bluetoothProducts, soundfieldProducts] = await Promise.all([
    getProducts(),
    getBluetoothProducts(),
    getSoundfieldProducts(),
  ]);

  return {
    props: {
      featuredProducts: products.slice(0, 3),
      bluetoothProduct: bluetoothProducts[0] ?? null,
      soundfieldProduct: soundfieldProducts[0] ?? null,
    },
  };
}

export default function Home({ featuredProducts, bluetoothProduct, soundfieldProduct }) {
  const { customerType } = usePrice();

  return (
    <>
      <Head>
        <title>Hörselservice Växjö | Formgjutna hörselskydd och ljudutjämningssystem</title>
        <meta name="description" content="Hörselservice i Kronoberg erbjuder formgjutna hörselskydd, aktiva hörselskydd och ljudutjämningssystem med personlig rådgivning i Växjö." />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://horselservice.se/" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hörselservice Växjö | Formgjutna hörselskydd och ljudutjämningssystem" />
        <meta property="og:description" content="Hörselservice i Kronoberg erbjuder formgjutna hörselskydd, aktiva hörselskydd och ljudutjämningssystem med personlig rådgivning i Växjö." />
        <meta property="og:url" content="https://horselservice.se/" />
        <meta property="og:image" content="https://horselservice.se/images/passformHorselskydd.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <HomeVideo />

        <section className={styles.lightSection}>
          <div className={styles.sectionHeader}>
            <div>
              <div className={styles.eyebrow} style={{ color: "#7c3aed" }}>
                Produktkategorier
              </div>
              <h2 className={styles.sectionTitle}>Välj rätt kategori direkt</h2>
            </div>

            <div className={styles.infoText}>
              Hitta rätt lösning utifrån behov: passiva hörselskydd, aktiva hörselskydd
              eller ljudutjämningssystem.
            </div>
          </div>

          <div className={styles.cardGrid}>
            {productCategories.map((category) => (
              <ProductCategoryCard key={category.href} {...category} />
            ))}
          </div>
        </section>

        <section className={styles.infoGrid}>
          <div>
            <div className={styles.eyebrow}>Information om produkter och besök</div>
            <h2 className={styles.sectionTitle}>Allt du behöver veta om formgjutna hörselskydd och ljudutjämningssystem</h2>
            <p className={styles.sectionText}>
              Här hittar du mer information om hur en avgjutning går till, om formgjutna hörselskydd och ljudutjämningssystem.
            </p>
            <div className={styles.featureGrid}>
              {[
                {
                  href: "/fore-besok",
                  label: "Såhär görs en avgjutning",
                },
                {
                  href: "/om-formgjutna-horselskydd",
                  label: "Om formgjutna hörselskydd",
                },
                {
                  href: "/om-ljudutjamningssystem",
                  label: "Om ljudutjämningssystem",
                },
              ].map((item) => (
                <Link key={item.href} href={item.href} className={styles.infoPill}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.placeholderCard}>
            <div className={styles.placeholderBlock} style={{ position: "relative", overflow: "hidden" }}>
              <Image src={earbudInEar} alt="Formgjutet hörselskydd i öra" fill className={styles.productImage} sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className={styles.placeholderRow}>
              <div className={styles.placeholderTile}>
                <strong>Skydd som passar dig</strong>
                <span>
                  Formgjutna hörselskydd anpassas efter örat för hög komfort och säker passform.
                </span>
              </div>

              <div className={styles.placeholderTile}>
                <strong>Bevarar viktiga ljud</strong>
                <span>
                  Skadligt buller dämpas samtidigt som tal och omgivningsljud kan uppfattas tydligt.
                </span>
              </div>

              <div className={styles.placeholderTile}>
                <strong>Bättre ljudmiljö</strong>
                <span>
                  Ljudutjämningssystem gör tal tydligare och skapar bättre förutsättningar för koncentration.
                </span>
              </div>
            </div>
          </div>
        </section>

        <ContactPanel />
      </main>
    </>
  );
}
