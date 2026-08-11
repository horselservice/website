import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import {
  getProductBySlug,
  getPublishedProductSlugsByCategory,
} from "../../lib/products/productRepository";

import { getAbsoluteUrl } from "../../lib/seo/url";
import { usePrice } from "../../context/priceContext";
import { getDisplayPrice, getOfferPriceNumber } from "../../lib/pricing";
import styles from "../../styles/site.module.css";

const CATEGORY_SLUG = "aktiva-horselskydd";

const SITE_URL = "https://horselservice.se";

export async function getStaticPaths() {
  const slugs = await getPublishedProductSlugsByCategory(CATEGORY_SLUG);

  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),

    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug);

  if (!product || product.category?.slug !== CATEGORY_SLUG) {
    return {
      notFound: true,
      revalidate: 60,
    };
  }

  return {
    props: {
      product,
    },

    revalidate: 60,
  };
}

export default function BluetoothProductPage({ product }) {
  const { customerType } = usePrice();

  const imageSrc = product.imgSrc || "/images/logoHorselservice.webp";

  const imageAlt = product.imgAlt || product.title;

  const imageUrl = getAbsoluteUrl(imageSrc);

  const productUrl = `${SITE_URL}/bluetooth-products/${product.slug}`;

  const displayPrice = getDisplayPrice(product, customerType);

  const schemaPrice = getOfferPriceNumber(product, "business");

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: imageUrl ? [imageUrl] : [],
    description: product.description,
    url: productUrl,
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: Number(schemaPrice).toFixed(2),
      priceCurrency: "SEK",
      availability: "https://schema.org/InStoreOnly",
    },
  };

  return (
    <>
      <Head>
        <title>{product.title} | Aktiva hörselskydd</title>
        <meta name="description" content={product.shortDescription} />
        <link rel="canonical" href={productUrl} />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="product" />
        <meta
          property="og:title"
          content={`${product.title} | Hörselservice`}
        />
        <meta property="og:description" content={product.shortDescription} />
        <meta property="og:url" content={productUrl} />
        {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </Head>

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
                    priority
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
                    <div className={styles.metricTitle}>Användning</div>

                    <div className={styles.productMeta}>
                      {product.usageText || "Jakt, arbete och aktiv användning"}
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
