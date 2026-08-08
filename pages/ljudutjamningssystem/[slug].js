import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  getAllSoundfieldProductSlugs,
  getSoundfieldProductBySlug,
} from "../../lib/ljudutjamningssystem/products";
import { usePrice } from "../../context/priceContext";
import {
  getDisplayPrice,
  getOfferPriceNumber,
  getRentDisplayPrice,
} from "../../lib/pricing";
import styles from "../../styles/site.module.css";

export async function getStaticPaths() {
  const slugs = await getAllSoundfieldProductSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getSoundfieldProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

export default function SoundfieldProductPage({ product }) {
  const { customerType } = usePrice();
  const displayPrice = getDisplayPrice(product, customerType);
  const rentDisplayPrice = getRentDisplayPrice(product, customerType);
  const schemaPrice = getOfferPriceNumber(product, "business");

  return (
    <>
      <Head>
        <title>{product.title} | Ljudutjämningssystem</title>
        <meta name="description" content={product.description} />
        <link
          rel="canonical"
          href={`https://horselservice.se/ljudutjamningssystem/${product.slug}`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content={`${product.title} | Hörselservice`}
        />
        <meta property="og:description" content={product.description} />
        <meta
          property="og:url"
          content={`https://horselservice.se/ljudutjamningssystem/${product.slug}`}
        />
        <meta
          property="og:image"
          content={`https://horselservice.se${product.imgSrc}`}
        />
      </Head>

      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          image: [product.imgSrc],
          description: product.description,
          offers: {
            "@type": "Offer",
            url: `https://horselservice.se/ljudutjamningssystem/${product.slug}`,
            price: Number(schemaPrice).toFixed(2),
            priceCurrency: "SEK",
            availability: "https://schema.org/InStoreOnly",
          },
        }).replace(/</g, "\\u003c")}
      </Script>

      <main className={styles.page}>
        <section className={styles.detailLayout}>
          <div className={styles.detailOverlay} />
          <div className={styles.detailInner}>
            <div className={styles.detailGrid}>
              <div>
                <div className={styles.eyebrow}>Ljudutjämningssystem</div>
                <h1 className={styles.detailTitle}>{product.title}</h1>
                <p className={styles.sectionText}>
                  {product.description} Systemet är inte bara en vanlig höjning
                  av ljudet, utan skapar också bättre tydlighet och
                  lyssningskomfort i hela rummet.
                </p>
                <div className={styles.buttonRow}>
                  <Link href="/kontakt" className={styles.primaryButton}>
                    Kontakta oss
                  </Link>
                  <Link
                    href="/ljudutjamningssystem"
                    className={styles.secondaryButton}
                  >
                    Tillbaka
                  </Link>
                </div>
              </div>

              <div className={styles.detailCard}>
                <div className={styles.detailImage}>
                  <Image
                    src={product.imgSrc}
                    alt={product.imgAlt}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.metaGrid}>
                  <div className={styles.metric}>
                    <div className={styles.metricTitle}>Pris</div>
                    <div className={styles.productTitle}>{displayPrice}</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricTitle}>Hyra</div>
                    <div className={styles.productMeta}>{rentDisplayPrice}</div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricTitle}>Användning</div>
                    <div className={styles.productMeta}>
                      Skola, möten och offentliga lokaler
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.techCard}>
          <div className={styles.eyebrow}>Teknisk data</div>
          <pre className={styles.techText}>{product.technicalInformation}</pre>
        </section>
      </main>
    </>
  );
}
