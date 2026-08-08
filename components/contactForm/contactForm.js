import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/contactForm.module.css";

const ContactForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (!name) validationErrors.name = "Vänligen ange ditt namn";
    if (!email) validationErrors.email = "Vänligen ange din e-post";
    if (!message) validationErrors.message = "Vänligen ange ditt meddelande";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      setName("");
      setEmail("");
      setMessage("");
      router.push("/kontakt?success=true");
    } catch (error) {
      setErrors({ form: "Det gick inte att skicka meddelandet just nu." });
      console.error(error);
    }
  };

  return (
    <section className={styles.contactGrid}>
      <div>
        <div className={styles.eyebrow}>Kontakt</div>
        <h2 className={styles.sectionTitle}>
          Behöver du hjälp att välja rätt lösning?
        </h2>
        <p className={styles.infoText}>
          Vid större beställningar tillämpar vi mängdrabatt. Vi hjälper både
          privatpersoner, företag och kommuner och kan även komma ut för
          installation eller avgjutningar.
        </p>

        <div className={styles.contactInfoList}>
          <div className={styles.contactInfoCard}>
            <strong>Kommun & företag</strong>
            Vi har lösningar för större beställningar och verksamhetsanpassade
            behov.
          </div>
          <div className={styles.contactInfoCard}>
            <strong>Växjö kommun</strong>
            Beställning läggs i Växjö kommuns inköpssystem Marknadsplatsen.
          </div>
        </div>
      </div>

      <form className={styles.formCard} onSubmit={handleSubmit}>
        {errors.form ? <p className={styles.errorText}>{errors.form}</p> : null}

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="contact-name">
            Ditt namn
          </label>
          <input
            id="contact-name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name ? (
            <span className={styles.errorText}>{errors.name}</span>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="contact-email">
            Din e-post
          </label>
          <input
            id="contact-email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email ? (
            <span className={styles.errorText}>{errors.email}</span>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="contact-message">
            Ditt meddelande
          </label>
          <textarea
            id="contact-message"
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {errors.message ? (
            <span className={styles.errorText}>{errors.message}</span>
          ) : null}
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.darkButton}>
            Skicka
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
