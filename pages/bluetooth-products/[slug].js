import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import {
  getAllBluetoothProductSlugs,
  getBluetoothProductBySlug,
} from "../../lib/bluetoothProducts/products";
import { usePrice } from "../../context/priceContext";
import { getDisplayPrice, getOfferPriceNumber } from "../../lib/pricing";
import styles from "../../styles/site.module.css";

export async function getStaticPaths() {
  const slugs = await getAllBluetoothProductSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getBluetoothProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

export default function BluetoothProductPage({ product }) {
  const { customerType } = usePrice();
  const imageSrc = product.images?.[0]?.src ?? product.imgSrc;
  const imageAlt = product.images?.[0]?.alt ?? product.imgAlt ?? product.title;
  const displayPrice = getDisplayPrice(product, customerType);
  const schemaPrice = getOfferPriceNumber(product, "business");

  return (
    <>
      <Head>
        <title>{product.title} | Aktiva hörselskydd</title>
        <meta name="description" content={product.description} />
        <link
          rel="canonical"
          href={`https://horselservice.se/bluetooth-products/${product.slug}`}
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
          content={`https://horselservice.se/bluetooth-products/${product.slug}`}
        />
        <meta
          property="og:image"
          content={`https://horselservice.se${imageSrc}`}
        />
      </Head>

      <Script id="product-jsonld" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          image: [imageSrc],
          description: product.description,
          offers: {
            "@type": "Offer",
            url: `https://horselservice.se/bluetooth-products/${product.slug}`,
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
                <div className={styles.eyebrow}>Aktiva hörselskydd</div>
                <h1 className={styles.detailTitle}>{product.title}</h1>
                <p className={styles.sectionText}>{product.description}</p>
                <div className={styles.buttonRow}>
                  <Link href="/kontakt" className={styles.primaryButton}>
                    Kontakta oss
                  </Link>
                  <Link
                    href="/bluetooth-horselskydd"
                    className={styles.secondaryButton}
                  >
                    Tillbaka
                  </Link>
                </div>
              </div>

              <div className={styles.detailCard}>
                <div className={styles.detailImage}>
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
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
                    <div className={styles.metricTitle}>Fördel</div>
                    <div className={styles.productMeta}>
                      Skydd och uppfattning av viktiga ljud
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricTitle}>Miljö</div>
                    <div className={styles.productMeta}>
                      Jakt, arbete och aktiv användning
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
