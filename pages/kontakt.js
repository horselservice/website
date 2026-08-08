import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import PageIntro from "../components/pageIntro/pageIntro";
import ContactForm from "../components/contactForm/contactForm";
import ContactInfoCard from "../components/contactInfoCard/contactInfoCard";
import styles from "../styles/site.module.css";
import telephone from "../public/images/telephone.webp";
export default function Contact() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.success) {
      toast.success("Ditt meddelande har skickats");
    }
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Kontakta Hörselservice | Rådgivning och offert i Växjö</title>
        <meta
          name="description"
          content="Kontakta Hörselservice i Kronoberg för rådgivning, offert eller bokning av formgjutna hörselskydd och ljudutjämningssystem."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://horselservice.se/contact" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Kontakta Hörselservice | Rådgivning och offert i Växjö"
        />
        <meta
          property="og:description"
          content="Kontakta Hörselservice i Kronoberg för rådgivning, offert eller bokning av formgjutna hörselskydd och ljudutjämningssystem."
        />
        <meta property="og:url" content="https://horselservice.se/contact" />
        <meta
          property="og:image"
          content="https://horselservice.se/images/telephone.webp"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className={styles.page}>
        <PageIntro
          compact
          eyebrow="Kontakt"
          title="Kontakta oss för rådgivning och offert"
          text="Har du frågor om hörselskydd, ljudutjämningssystem eller vill boka en tid för avgjutning? Hör av dig så hjälper vi dig att hitta rätt lösning utifrån dina behov."
          primaryHref="#kontaktform"
          primaryLabel="Skriv till oss"
          secondaryHref="/produkter"
          secondaryLabel="Se produkter"
          right={
            <div className={styles.mapCard}>
              <Image
                src={telephone}
                alt="Telefon och kontakt med Hörselservice i Kronoberg"
                fill
                className={styles.mapImage}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
          }
        />

        <section id="kontaktform" className={styles.contactStrip}>
          <ContactForm />
        </section>

        <ContactInfoCard />
      </main>
    </>
  );
}
