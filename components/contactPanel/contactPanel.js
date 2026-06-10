import Link from "next/link";
import styles from "../../styles/contactPanel.module.css";

export default function ContactPanel({
  title = "Behöver du hjälp att välja rätt lösning?",
  text = "Kontakta oss så hjälper vi dig att hitta rätt hörselskydd eller ljudlösning utifrån användningsområde, komfort och budget.",
}) {
  return (
    <section className={styles.contactStrip}>
      <div className={styles.contactGrid}>
        <div>
          <div className={styles.eyebrow}>
            Kontakt
          </div>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.infoText}>{text}</p>
          <div className={styles.buttonRow}>
            <Link href="/kontakt" className={styles.darkButton}>
              Kontakta oss
            </Link>
            <Link href="/produkter" className={styles.ghostButton}>
              Se alla produkter
            </Link>
          </div>
        </div>

        <div className={styles.formCard}>
          <div className={styles.contactInfoList}>
            <div className={styles.contactInfoCard}>
              <strong>Personlig rådgivning</strong>
              Vi guidar dig till rätt lösning utifrån miljö, användning och komfort.
            </div>
            <div className={styles.contactInfoCard}>
              <strong>För privatpersoner och verksamheter</strong>
              Vi hjälper både enskilda kunder, företag och kommuner.
            </div>
            <div className={styles.contactInfoCard}>
              <strong>Tydlig väg vidare</strong>
              Hör av dig för offert, intresseanmälan eller produktfrågor.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
