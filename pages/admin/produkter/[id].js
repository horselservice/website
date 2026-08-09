import {
  useEffect,
  useState,
} from "react";

import {
  getAdminProduct,
} from "../../../lib/admin/productAdminRepository";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import AdminLayout from "../../../components/admin/adminLayout/adminLayout";
import ProductEditor from "../../../components/admin/productEditor/productEditor";
import ImageManager from "../../../components/admin/imageManager/imageManager";
import styles from "../../../styles/productAdmin.module.css";

export default function AdminProductPage() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    if (
      !router.isReady ||
      !id
    ) {
      return;
    }

    let mounted = true;

    async function loadProduct() {
      try {
        const loadedProduct =
          await getAdminProduct(id);

        if (mounted) {
          setProduct(
            loadedProduct
          );
        }
      } catch (error) {
        console.error(
          "Could not load product:",
          error
        );

        if (mounted) {
          setErrorMessage(
            "Det gick inte att hämta produkten."
          );
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [
    router.isReady,
    id,
  ]);

  return (
    <>
      <Head>
        <title>
          {product
            ? `${product.name} | Administration`
            : "Redigera produkt | Administration"}
        </title>

        <meta
          name="robots"
          content="noindex, nofollow"
        />
      </Head>

      <AdminLayout
        title={
          product
            ? product.name
            : "Redigera produkt"
        }
      >
        <Link
          href="/admin/produkter"
          className={styles.backLink}
        >
          ← Tillbaka till produkter
        </Link>

        {isLoading ? (
          <p>Hämtar produkt...</p>
        ) : null}

        {errorMessage ? (
          <div
            className={styles.error}
            role="alert"
          >
            {errorMessage}
          </div>
        ) : null}

        {product ? (
          <>
            <div
              className={
                styles.meta
              }
            >
              <span>Kategori</span>

              <strong>
                {
                  product.category
                    ?.name
                }
              </strong>
            </div>

            <ProductEditor
              product={product}
            />
          </>
        ) : null}
      </AdminLayout>
    </>
  );
}