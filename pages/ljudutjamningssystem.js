import Head from "next/head";
import Image from "next/image";
import ProductHead from "../components/productHead/productHead";
import ProductCard from "../components/productCard/productCard";
import ContactPanel from "../components/contactPanel/contactPanel";
import { getSoundfieldProducts } from "../lib/ljudutjamningssystem/products";
import { usePrice } from "../context/priceContext";
import { getDisplayPrice } from "../lib/pricing";
import styles from "../styles/site.module.css";

export async function getStaticProps() {
  const products = await getSoundfieldProducts();
  return { props: { products } };
}

export default function SoundfieldProducts({ products }) {
  const { customerType } = usePrice();

  return (
    <>
      <Head>
        <title>
          Ljudutjämningssystem | Röstförstärkning för skola och möten
        </title>
        <meta
          name="description"
          content="Ljudutjämningssystem och röstförstärkning för klassrum, konferensrum och offentliga lokaler där tydligt tal och bättre ljudmiljö behövs."
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://horselservice.se/ljudutjamningssystem"
        />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Ljudutjämningssystem | Röstförstärkning för skola och möten"
        />
        <meta
          property="og:description"
          content="Ljudutjämningssystem och röstförstärkning för klassrum, konferensrum och offentliga lokaler där tydligt tal och bättre ljudmiljö behövs."
        />
        <meta
          property="og:url"
          content="https://horselservice.se/ljudutjamningssystem"
        />
        <meta
          property="og:image"
          content="https://horselservice.se/images/rogerSoundfield2.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <ProductHead
          compact
          eyebrow="Ljudutjämningssystem"
          title="Jämnare taluppfattning i hela rummet."
          text="Ljudutjämning eller röstförstärkning är en mikrofon och högtalare som är specialutformade för att sprida ljudet av en röst jämnt i en lokal med främst fokus på de frekvenser som är viktigast för taluppfattningen. Resultatet blir en mindre röstansträngning hos talaren och talarens röst hörs lika bra var man än sitter i rummet. Ljudutjämningssystem kan installeras i alla typer av lokaler där det finns en talare och lyssnare. Röstförstärkningen gynnar inte bara talaren, även lyssnaren får en behagligare lyssningsupplevelse med mindre ansträngning. Det är därför lättare att fokusera och lyssna på en talare under en längre tid. Rummets storlek spelar ingen roll, ljudutjämning kan installeras i både små och stora lokaler.

Systemen har 30 dagars öppet köp, det är tillåtet att använda och testa produkten under denna tiden."
          primaryHref="/kontakt"
          primaryLabel="Kontakta oss"
          tags={products.map((product) => ({
            label: product.title,
            href: `/ljudutjamningssystem/${product.slug}`,
          }))}
          right={
            <div className={styles.mediaCard} style={{ position: "relative" }}>
              <Image
                src="/images/rogerSoundfield2.webp"
                alt="Roger Soundfield ljudutjämningssystem"
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
                href={`/ljudutjamningssystem/${product.slug}`}
                title={product.title}
                description={product.description}
                image={product.imgSrcTwo}
                imageAlt={product.imgAltTwo}
                price={getDisplayPrice(product, customerType)}
                badge="Professionell användning"
              />
            ))}
          </div>
        </section>

        <ContactPanel />
      </main>
    </>
  );
}
