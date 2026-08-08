import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  getAllProductSlugs,
  getProductBySlug,
} from "../../lib/products/products";
import { usePrice } from "../../context/priceContext";
import { getDisplayPrice, getOfferPriceNumber } from "../../lib/pricing";
import styles from "../../styles/site.module.css";

export async function getStaticPaths() {
  const slugs = await getAllProductSlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = await getProductBySlug(params.slug);
  if (!product) return { notFound: true };
  return { props: { product } };
}

export default function ProductPage({ product }) {
  const { customerType } = usePrice();
  const displayPrice = getDisplayPrice(product, customerType);
  const schemaPrice = getOfferPriceNumber(product, "business");

  return (
    <>
      <Head>
        <title>{product.title} | Hörselservice</title>
        <meta name="description" content={product.description} />
        <link
          rel="canonical"
          href={`https://horselservice.se/products/${product.slug}`}
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
          content={`https://horselservice.se/products/${product.slug}`}
        />
        <meta
          property="og:image"
          content={`https://horselservice.se${product.imgSrc}`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org/",
              "@type": "Product",
              name: product.title,
              image: [product.imgSrc],
              description: product.description,
              offers: {
                "@type": "Offer",
                url: `https://horselservice.se/products/${product.slug}`,
                price: Number(schemaPrice).toFixed(2),
                priceCurrency: "SEK",
                availability: "https://schema.org/InStoreOnly",
              },
            }),
          }}
        />
      </Head>

      <main className={styles.page}>
        <section className={styles.detailLayout}>
          <div className={styles.detailOverlay} />
          <div className={styles.detailInner}>
            <div className={styles.detailGrid}>
              <div>
                <div className={styles.eyebrow}>Produkter</div>
                <h1 className={styles.detailTitle}>{product.title}</h1>
                <p className={styles.sectionText}>{product.description}</p>
                <div className={styles.buttonRow}>
                  <Link href="/kontakt" className={styles.primaryButton}>
                    Kontakta oss
                  </Link>
                  <Link href="/produkter" className={styles.secondaryButton}>
                    Tillbaka till produkter
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
                    <div className={styles.metricTitle}>Komfort</div>
                    <div className={styles.productMeta}>
                      Individuellt anpassad passform
                    </div>
                  </div>
                  <div className={styles.metric}>
                    <div className={styles.metricTitle}>Användning</div>
                    <div className={styles.productMeta}>
                      Anpassas efter miljö och behov
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
