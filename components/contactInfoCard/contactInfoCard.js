import styles from "../../styles/site.module.css";

export default function ContactInfoCard() {
  return (
    <section className={styles.contactInfoGrid}>
      <div className={styles.contactMapCard}>
        <iframe
          title="Google Maps - Hörselservice i Kronoberg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2180.0072731566315!2d14.781411798595377!3d56.88011833633606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465725d85b32116d%3A0xd6354e87c60ec503!2sH%C3%B6rselservice%20i%20Kronoberg!5e0!3m2!1ssv!2sse!4v1696270822232!5m2!1ssv!2sse"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className={styles.contactMapIframe}
        />
      </div>

      <div className={styles.contactInfoPanel}>
        <div className={styles.eyebrow} style={{ color: "#7c3aed" }}>
          Kontakt
        </div>

        <h2 className={styles.sectionTitle}>
          Besök mottagningen eller kontakta oss direkt
        </h2>

        <p className={styles.infoText}>
          Här hittar du adress, e-post och telefonnummer.
        </p>

        <div className={styles.contactTileRow}>
          <div className={styles.placeholderTile}>
            <strong>Adress</strong>
            <span>Riddaregatan 43, 352 36 Växjö</span>
          </div>

          <div className={styles.placeholderTile}>
            <strong>E-post</strong>
            <span>
              <a
                href="mailto:info@horselservice.se"
                className={styles.contactLink}
              >
                info@horselservice.se
              </a>
            </span>
          </div>

          <div className={styles.placeholderTile}>
            <strong>Telefonnummer</strong>
            <span>
              <a href="tel:+46766353653" className={styles.contactLink}>
                076-635 36 53
              </a>
              <br />
              Nås säkrast kl. 16–18
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
