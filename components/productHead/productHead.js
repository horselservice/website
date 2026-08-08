import Link from "next/link";
import styles from "../../styles/productHead.module.css";

export default function ProductHead({
  eyebrow,
  title,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  tags = [],
  right,
}) {
  return (
    <section className={styles.productIntro}>
      <div className={styles.backgroundOverlay} />

      <div className={styles.contentWrapper}>
        <div className={styles.contentGrid}>
          <div className={styles.textPanel}>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}

            <h1 className={styles.productTitle}>{title}</h1>

            {text ? <p className={styles.introText}>{text}</p> : null}

            {(primaryHref && primaryLabel) ||
            (secondaryHref && secondaryLabel) ? (
              <div className={styles.buttonGroup}>
                {primaryHref && primaryLabel ? (
                  <Link href={primaryHref} className={styles.primaryButton}>
                    {primaryLabel}
                  </Link>
                ) : null}

                {secondaryHref && secondaryLabel ? (
                  <Link href={secondaryHref} className={styles.secondaryButton}>
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            ) : null}

            {tags.length > 0 ? (
              <div className={styles.tagList}>
                {tags.map((tag) => (
                  <Link key={tag.href} href={tag.href} className={styles.tag}>
                    {tag.label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>

          {right ? <div className={styles.visualPanel}>{right}</div> : null}
        </div>
      </div>
    </section>
  );
}
