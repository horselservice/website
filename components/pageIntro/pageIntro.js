import Link from "next/link";
import styles from "../../styles/pageIntro.module.css";

export default function PageIntro({
  eyebrow,
  title,
  text,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  tags = [],
  right,
  compact = false,
}) {
  return (
    <section className={styles.introSection}>
      <div className={styles.backgroundOverlay} />
      <div className={styles.contentWrapper}>
        <div className={styles.contentGrid}>
          <div className={styles.textPanel}>
            {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
            <h1 className={compact ? styles.compactTitle : styles.pageTitle}>{title}</h1>
            <p className={styles.introText}>{text}</p>
            {tags.length > 0 ? (
              <div className={styles.tagList}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            {(primaryHref || secondaryHref) && (
              <div className={styles.buttonGroup}>
                {primaryHref ? (
                  <Link className={styles.primaryButton} href={primaryHref}>
                    {primaryLabel}
                  </Link>
                ) : null}
                {secondaryHref ? (
                  <Link className={styles.secondaryButton} href={secondaryHref}>
                    {secondaryLabel}
                  </Link>
                ) : null}
              </div>
            )}
            {!compact ? (
              <div className={styles.scrollIndicator}>
                <span>Scrolla vidare</span>
                <div className={styles.scrollMouse}>
                  <div className={styles.scrollDot} />
                </div>
              </div>
            ) : null}
          </div>
          {right ? <div className={styles.visualPanel}>{right}</div> : null}
        </div>
      </div>
    </section>
  );
}
