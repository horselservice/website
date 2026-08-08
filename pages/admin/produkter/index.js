import { useEffect, useMemo, useState } from "react";

import Head from "next/head";
import Link from "next/link";
import AdminLayout from "../../../components/admin/adminLayout/adminLayout";
import { getAdminProducts } from "../../../lib/admin/productAdminRepository";
import styles from "../../../styles/productsAdmin.module.css";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const loadedProducts = await getAdminProducts();

        if (mounted) {
          setProducts(loadedProducts);
        }
      } catch (error) {
        console.error("Could not load products:", error);

        if (mounted) {
          setErrorMessage("Det gick inte att hämta produkterna.");
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category?.name?.toLowerCase().includes(query),
    );
  }, [products, search]);

  return (
    <>
      <Head>
        <title>Produkter | Administration</title>

        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <AdminLayout title="Produkter">
        <section className={styles.toolbar}>
          <div>
            <h2>Produktinnehåll</h2>

            <p>Välj en produkt för att ändra text, pris eller bilder.</p>
          </div>

          <label className={styles.searchField}>
            <span>Sök produkt</span>

            <input
              type="search"
              value={search}
              placeholder="Skriv produktnamn..."
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </section>

        {isLoading ? <p>Hämtar produkter...</p> : null}

        {errorMessage ? (
          <div className={styles.error} role="alert">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && !errorMessage ? (
          <div className={styles.productList}>
            {filteredProducts.map((product) => {
              const image =
                product.images.find((item) => item.isPrimary) ??
                product.images[0];

              return (
                <Link
                  href={`/admin/produkter/${product.id}`}
                  key={product.id}
                  className={styles.productRow}
                >
                  <div className={styles.image}>
                    {image ? (
                      <img src={image.src} alt="" />
                    ) : (
                      <span>Ingen bild</span>
                    )}
                  </div>

                  <div className={styles.content}>
                    <span className={styles.category}>
                      {product.category?.name}
                    </span>

                    <strong>{product.name}</strong>

                    <span
                      className={
                        product.isPublished ? styles.published : styles.hidden
                      }
                    >
                      {product.isPublished ? "Publicerad" : "Dold"}
                    </span>
                  </div>

                  <span className={styles.edit}>Redigera →</span>
                </Link>
              );
            })}
          </div>
        ) : null}

        {!isLoading && !errorMessage && filteredProducts.length === 0 ? (
          <p>Inga produkter matchar sökningen.</p>
        ) : null}
      </AdminLayout>
    </>
  );
}
