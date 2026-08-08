import Head from "next/head";
import Image from "next/image";
import ProductHead from "../components/productHead/productHead";
import ProductCard from "../components/productCard/productCard";
import ContactPanel from "../components/contactPanel/contactPanel";
import { getProducts } from "../lib/products/products";
import { usePrice } from "../context/priceContext";
import { getDisplayPrice } from "../lib/pricing";
import styles from "../styles/site.module.css";

export async function getStaticProps() {
  const products = await getProducts();
  return { props: { products } };
}

export default function Products({ products }) {
  const { customerType } = usePrice();

  return (
    <>
      <Head>
        <title>Formgjutna hörselskydd | Passiva hörselskydd i Växjö</title>
        <meta
          name="description"
          content="Se Hörselservice utbud av passiva formgjutna hörselskydd för musik, jakt, industri, motorsport, bad och sömn."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://horselservice.se/passiva-horselskydd"
        />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Formgjutna hörselskydd | Passiva hörselskydd i Växjö"
        />
        <meta
          property="og:description"
          content="Se Hörselservice utbud av passiva formgjutna hörselskydd för musik, jakt, industri, motorsport, bad och sömn."
        />
        <meta
          property="og:url"
          content="https://horselservice.se/passiva-horselskydd"
        />
        <meta
          property="og:image"
          content="https://horselservice.se/images/passformHorselskydd.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <ProductHead
          eyebrow="Produkter"
          title="Formgjutna hörselskydd"
          text="Hos oss får du professionell hjälp med att välja hörselskydd anpassade efter dina behov. Vi har hörselskydd som passar så väl för arbetet som för fritiden."
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          tags={products.map((product) => ({
            label: product.title,
            href: `/products/${product.slug}`,
          }))}
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image
                src="/images/passformHorselskydd.webp"
                alt="Formgjutet hörselskydd med individuell passform"
                fill
                className={styles.mediaImage}
                priority
              />
            </div>
          }
        />

        <section className={styles.lightSection}>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                href={`/products/${product.slug}`}
                title={product.title}
                description={
                  product.frontPageDescription ?? product.description
                }
                image={product.imgSrc}
                imageAlt={product.imgAlt}
                price={getDisplayPrice(product, customerType)}
                badge="Rekommenderad kategori"
              />
            ))}
          </div>
        </section>

        <ContactPanel text="Våra hörselskydd tillverkas för lång användning, med fokus på passform, hållbarhet och tydlig produktvägledning." />
      </main>
    </>
  );
}
