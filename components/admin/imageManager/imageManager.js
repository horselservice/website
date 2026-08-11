import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  deleteProductImage,
  setPrimaryProductImage,
  updateImageAltText,
  uploadProductImage,
} from "../../../lib/admin/productAdminRepository";

import styles from "../../../styles/imageManager.module.css";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const MAX_SIZE = 20 * 1024 * 1024;

export default function ImageManager({
  productId,
  productSlug,
  initialImages,
}) {
  const [images, setImages] = useState(initialImages ?? []);

  const [file, setFile] = useState(null);

  const [previewUrl, setPreviewUrl] = useState("");

  const [altText, setAltText] = useState("");

  const [makePrimary, setMakePrimary] = useState(false);

  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setImages(initialImages ?? []);
  }, [productId, initialImages]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl("");
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  function handleFileChange(event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Bilden måste vara JPEG, PNG eller WebP.");

      event.target.value = "";
      return;
    }

    if (selectedFile.size > MAX_SIZE) {
      toast.error("Originalbilden får vara högst 20 MB.");

      event.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  function clearUpload() {
    setFile(null);
    setPreviewUrl("");
    setAltText("");
    setMakePrimary(false);
  }

  async function handleUpload(event) {
    event.preventDefault();

    if (!file) {
      toast.error("Välj en bild först.");

      return;
    }

    try {
      setIsUploading(true);

      const newImage = await uploadProductImage({
        productId,
        productSlug,
        file,
        altText,
        makePrimary,
      });

      setImages((currentImages) => {
        let nextImages = currentImages;

        if (newImage.isPrimary) {
          nextImages = currentImages.map((image) => ({
            ...image,
            isPrimary: false,
          }));
        }

        return sortImages([...nextImages, newImage]);
      });

      clearUpload();

      toast.success("Bilden har laddats upp.");
    } catch (error) {
      console.error("Image upload failed:", error);

      toast.error("Det gick inte att ladda upp bilden.");
    } finally {
      setIsUploading(false);
    }
  }

  function sortImages(images) {
    return [...images].sort((a, b) => {
      if (a.isPrimary !== b.isPrimary) {
        return a.isPrimary ? -1 : 1;
      }

      return a.sortOrder - b.sortOrder;
    });
  }

  async function handleMakePrimary(imageId) {
    try {
      const updatedImages = await setPrimaryProductImage({
        productId,
        imageId,
      });

      setImages(updatedImages);

      toast.success("Huvudbilden har ändrats.");
    } catch (error) {
      console.error("Could not set primary image:", error);

      toast.error("Det gick inte att ändra huvudbild.");
    }
  }

  async function handleDelete(image) {
    const confirmed = window.confirm(
      "Vill du ta bort bilden? Detta går inte att ångra.",
    );

    if (!confirmed) {
      return;
    }

    const remainingImages = images.filter(
      (currentImage) => currentImage.id !== image.id,
    );

    try {
      await deleteProductImage({
        productId,
        image,
        remainingImages,
      });

      if (image.isPrimary && remainingImages.length > 0) {
        remainingImages[0] = {
          ...remainingImages[0],
          isPrimary: true,
        };
      }

      setImages(remainingImages);

      toast.success("Bilden har tagits bort.");
    } catch (error) {
      console.error("Could not delete image:", error);

      toast.error("Det gick inte att ta bort bilden.");
    }
  }

  return (
    <section className={styles.editorSection}>
      <div className={styles.heading}>
        <div>
          <h2>Bilder</h2>

          <p>Huvudbilden visas först på webbplatsen.</p>
        </div>
      </div>

      <div className={styles.imageGrid}>
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onMakePrimary={handleMakePrimary}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <div className={styles.uploadPanel}>
        <h3>Lägg till bild</h3>

        <form onSubmit={handleUpload}>
          <label className={styles.field}>
            <span>Välj bild</span>

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
          </label>

          {previewUrl ? (
            <div className={styles.imagePreview}>
              <img src={previewUrl} alt="Förhandsvisning av vald bild" />

              <div>
                <strong>Förhandsvisning</strong>

                <span>{file?.name}</span>
              </div>
            </div>
          ) : null}

          {file ? (
            <>
              <label className={styles.field}>
                <span>Bildbeskrivning</span>

                <input
                  type="text"
                  value={altText}
                  onChange={(event) => setAltText(event.target.value)}
                  placeholder="Beskriv kort vad bilden visar"
                />

                <small>Används bland annat av skärmläsare.</small>
              </label>

              <label className={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={makePrimary}
                  onChange={(event) => setMakePrimary(event.target.checked)}
                />
                Använd som huvudbild
              </label>

              <div className={styles.buttonRow}>
                <button
                  type="button"
                  className={styles.secondaryButton}
                  onClick={clearUpload}
                >
                  Avbryt
                </button>

                <button
                  type="submit"
                  className={styles.saveButton}
                  disabled={isUploading}
                >
                  {isUploading ? "Laddar upp..." : "Ladda upp bild"}
                </button>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </section>
  );
}

function ImageCard({ image, onMakePrimary, onDelete }) {
  const [altText, setAltText] = useState(image.alt ?? "");

  const [isSavingAlt, setIsSavingAlt] = useState(false);

  async function handleSaveAlt() {
    try {
      setIsSavingAlt(true);

      await updateImageAltText(image.id, altText);

      toast.success("Bildbeskrivningen har sparats.");
    } catch (error) {
      console.error("Could not update alt text:", error);

      toast.error("Det gick inte att spara bildbeskrivningen.");
    } finally {
      setIsSavingAlt(false);
    }
  }

  return (
    <article className={styles.imageCard}>
      <div className={styles.imageCardPreview}>
        <img src={image.src} alt={image.alt} />

        {image.isPrimary ? (
          <span className={styles.primaryBadge}>Huvudbild</span>
        ) : null}
      </div>

      <label className={styles.field}>
        <span>Bildbeskrivning</span>

        <input
          type="text"
          value={altText}
          onChange={(event) => setAltText(event.target.value)}
        />
      </label>

      <button
        type="button"
        className={styles.secondaryButton}
        disabled={isSavingAlt}
        onClick={handleSaveAlt}
      >
        {isSavingAlt ? "Sparar..." : "Spara bildbeskrivning"}
      </button>

      <div className={styles.imageActions}>
        {!image.isPrimary ? (
          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => onMakePrimary(image.id)}
          >
            Gör till huvudbild
          </button>
        ) : null}

        <button
          type="button"
          className={styles.dangerButton}
          onClick={() => onDelete(image)}
        >
          Ta bort
        </button>
      </div>
    </article>
  );
}
