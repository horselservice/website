import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateProduct } from "../../../lib/admin/productAdminRepository";
import ImageManager from "../imageManager/imageManager";
import styles from "../../../styles/productEditor.module.css";

export default function ProductEditor({ product }) {
  const [form, setForm] = useState({
    name: "",
    shortDescription: "",
    description: "",
    usageText: "",
    technicalInformation: "",
    priceExVat: "",
    rentPriceExVat: "",
    isPublished: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setForm({
      name: product.name ?? "",

      shortDescription: product.shortDescription ?? "",

      description: product.description ?? "",

      usageText: product.usageText ?? "",

      technicalInformation: product.technicalInformation ?? "",

      priceExVat: product.priceExVat ?? "",

      rentPriceExVat: product.rentPriceExVat ?? "",

      isPublished: product.isPublished,
    });

    setHasChanges(false);
  }, [product.id]);

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setHasChanges(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Produktnamn måste anges.");

      return;
    }

    if (!form.description.trim()) {
      toast.error("Produktbeskrivning måste anges.");

      return;
    }

    try {
      setIsSaving(true);

      await updateProduct(product.id, form);

      setHasChanges(false);

      toast.success("Produkten har sparats.");
    } catch (error) {
      console.error("Product update failed:", error);

      toast.error("Det gick inte att spara produkten.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.editorForm}>
        <section className={styles.editorSection}>
          <div className={styles.heading}>
            <div>
              <h2>Synlighet</h2>

              <p>Styr om produkten visas på webbplatsen.</p>
            </div>
          </div>

          <label className={styles.publishToggle} htmlFor="is-published">
            <input
              id="is-published"
              name="isPublished"
              type="checkbox"
              checked={form.isPublished}
              onChange={(event) =>
                updateField("isPublished", event.target.checked)
              }
            />

            <div>
              <strong>Publicerad</strong>

              <span>
                När detta är aktiverat visas produkten på webbplatsen.
              </span>
            </div>
          </label>
        </section>

        <section className={styles.editorSection}>
          <div className={styles.heading}>
            <div>
              <h2>Grundinformation</h2>

              <p>Produktens namn och korta sammanfattning.</p>
            </div>
          </div>

          <label className={styles.field} htmlFor="product-name">
            <span>Produktnamn</span>

            <input
              id="product-name"
              name="name"
              type="text"
              value={form.name}
              onChange={(event) => updateField("name", event.target.value)}
              required
            />
          </label>

          <label className={styles.field} htmlFor="short-description">
            <span>Kort beskrivning</span>

            <textarea
              id="short-description"
              name="shortDescription"
              rows="3"
              value={form.shortDescription}
              onChange={(event) =>
                updateField("shortDescription", event.target.value)
              }
            />

            <small>
              Visas exempelvis på produktkort och i sammanfattningar.
            </small>
          </label>
        </section>

        <section className={styles.editorSection}>
          <div className={styles.heading}>
            <div>
              <h2>Produktinformation</h2>

              <p>Den information kunden ser på produktsidan.</p>
            </div>
          </div>

          <label className={styles.field} htmlFor="product-description">
            <span>Beskrivning</span>

            <textarea
              id="product-description"
              name="description"
              rows="8"
              value={form.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              required
            />
          </label>

          <label className={styles.field} htmlFor="usage-text">
            <span>Passar för</span>

            <input
              id="usage-text"
              name="usageText"
              type="text"
              value={form.usageText}
              onChange={(event) => updateField("usageText", event.target.value)}
              placeholder="Exempel: Jakt och skytte"
            />
          </label>

          <label className={styles.field} htmlFor="technical-information">
            <span>Teknisk information</span>

            <textarea
              id="technical-information"
              name="technicalInformation"
              rows="8"
              value={form.technicalInformation}
              onChange={(event) =>
                updateField("technicalInformation", event.target.value)
              }
            />

            <small>
              Lämna tomt om produkten saknar tekniska specifikationer.
            </small>
          </label>
        </section>

        <section className={styles.editorSection}>
          <div className={styles.heading}>
            <div>
              <h2>Pris</h2>

              <p>Ange priser exklusive moms.</p>
            </div>
          </div>

          <div className={styles.columns}>
            <label className={styles.field} htmlFor="price-ex-vat">
              <span>Pris exkl. moms</span>

              <div className={styles.priceInput}>
                <input
                  id="price-ex-vat"
                  name="priceExVat"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.priceExVat}
                  onChange={(event) =>
                    updateField("priceExVat", event.target.value)
                  }
                />

                <span>kr</span>
              </div>
            </label>

            <label className={styles.field} htmlFor="rent-price-ex-vat">
              <span>Hyrespris exkl. moms</span>

              <div className={styles.priceInput}>
                <input
                  id="rent-price-ex-vat"
                  name="rentPriceExVat"
                  type="number"
                  min="0"
                  step="0.01"
                  value={form.rentPriceExVat}
                  onChange={(event) =>
                    updateField("rentPriceExVat", event.target.value)
                  }
                />

                <span>kr</span>
              </div>
            </label>
          </div>
        </section>

        <div className={styles.saveBar}>
          <span>
            {hasChanges
              ? "Du har osparade ändringar."
              : "Alla ändringar är sparade."}
          </span>

          <button
            type="submit"
            className={styles.saveButton}
            disabled={isSaving || !hasChanges}
          >
            {isSaving ? "Sparar..." : "Spara ändringar"}
          </button>
        </div>
      </form>

      <ImageManager
        productId={product.id}
        productSlug={product.slug}
        initialImages={product.images}
      />
    </>
  );
}
