import Head from "next/head";
import Image from "next/image";
import ProductHead from "../components/productHead/productHead";
import ProductCard from "../components/productCard/productCard";
import ContactPanel from "../components/contactPanel/contactPanel";
import { getBluetoothProducts } from "../lib/bluetoothProducts/products";
import { usePrice } from "../context/priceContext";
import { getDisplayPrice } from "../lib/pricing";
import styles from "../styles/site.module.css";

export async function getStaticProps() {
  const products = await getBluetoothProducts();
  return { props: { products } };
}

export default function BluetoothProducts({ products }) {
  const { customerType } = usePrice();

  return (
    <>
      <Head>
        <title>Aktiva hörselskydd | Bluetooth och jakt i Växjö</title>
        <meta
          name="description"
          content="Aktiva hörselskydd med elektronik och Bluetooth-lösningar för jakt, arbete och miljöer där du behöver skydd men ändå höra viktiga ljud."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://horselservice.se/bluetooth-horselskydd"
        />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Aktiva hörselskydd | Bluetooth och jakt i Växjö"
        />
        <meta
          property="og:description"
          content="Aktiva hörselskydd med elektronik och Bluetooth-lösningar för jakt, arbete och miljöer där du behöver skydd men ändå höra viktiga ljud."
        />
        <meta
          property="og:url"
          content="https://horselservice.se/bluetooth-horselskydd"
        />
        <meta
          property="og:image"
          content="https://horselservice.se/images/haactivepro.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <ProductHead
          eyebrow="Aktiva hörselskydd"
          title="Skydd som låter dig höra det viktiga."
          text="Aktiva hörselskydd är hörselskydd som använder elektronik för att blockera skadliga ljud som t ex buller, smällar och andra höga ljud. Svaga ljud förstärks vilket gör att du hör det du vill och behöver höra. De kan användas för att skydda mot starka ljudnivåer på arbetsplatser, jakt eller andra ljudintensiva evenemang. De aktiva hörselskydden kan kopplas mot annan elektronik som t ex telefon och jaktradio med hjälp av halsslinga."
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          tags={products.map((product) => ({
            label: product.title,
            href: `/bluetooth-products/${product.slug}`,
          }))}
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image
                src="/images/haactivepro.webp"
                alt="Aktivt hörselskydd med Bluetooth och medhörning"
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
                href={`/bluetooth-products/${product.slug}`}
                title={product.title}
                description={product.description}
                image={product.images?.[0]?.src ?? product.imgSrc}
                imageAlt={
                  product.images?.[0]?.alt ?? product.imgAlt ?? product.title
                }
                price={getDisplayPrice(product, customerType)}
                badge="För jakt & arbete"
              />
            ))}
          </div>
        </section>

        <ContactPanel />
      </main>
    </>
  );
}
