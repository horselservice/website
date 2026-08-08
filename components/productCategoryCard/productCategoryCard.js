import Link from "next/link";
import ProductCard from "../productCard/productCard";
import styles from "../../styles/productCategoryCard.module.css";
import Image from "next/image";

export default function ProductCategoryCard({
  href,
  title,
  description,
  image,
  imageAlt,
  products = [],
  cta = "Visa alla produkter",
}) {
  return (
    <article className={styles.card}>
      <div className={styles.top}>
        <div className={styles.imageWrap}>
          <Image
            src={image}
            alt={imageAlt || title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.image}
          />
        </div>

        <div className={styles.topOverlay} />

        <div className={styles.topContent}>
          <h2 className={styles.topTitle}>{title}</h2>

          <Link href={href} className={styles.categoryLink}>
            <span>{cta}</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className={styles.body}>
        <p className={styles.description}>{description}</p>

        {products.length > 0 ? (
          <div className={styles.productCardGrid}>
            {products.slice(0, 2).map((product) => (
              <ProductCard
                key={product.href}
                href={product.href}
                title={product.title}
                description={product.description}
                image={product.image}
                imageAlt={product.imageAlt || product.title}
                price={product.price}
                badge={product.badge}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
