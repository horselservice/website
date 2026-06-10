import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/productCard.module.css";

export default function ProductCard({
  href,
  title,
  description = "",
  image,
  imageAlt,
  price,
  badge,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const shouldShowReadMore = description.length > 140;

  return (
    <article className={styles.productCard}>
      <Link href={href} className={styles.cardLink} aria-label={`Visa produkten ${title}`}>
        <div className={styles.productImageWrap}>
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.productImage}
          />
        </div>

        <h2 className={styles.productTitle}>{title}</h2>

        {price ? <div className={styles.priceBadge}>{price}</div> : null}
      </Link>

      <p
        className={`${styles.productDescription} ${
          isExpanded ? styles.descriptionExpanded : styles.descriptionCollapsed
        }`}
      >
        {description}
      </p>

      {shouldShowReadMore ? (
        <button
          type="button"
          className={styles.readMoreButton}
          onClick={() => setIsExpanded((value) => !value)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Visa mindre" : "Läs mer"}
        </button>
      ) : null}

      <div className={styles.productFooter}>
        <Link href={href} className={styles.darkButton}>
          Visa produkt
        </Link>
      </div>
    </article>
  );
}