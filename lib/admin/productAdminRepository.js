import { createSupabaseBrowserClient } from "../supabase/browserClient";
import { processImage } from "../images/imageProcesser";

const PRODUCT_SELECT = `
  id,
  slug,
  name,
  short_description,
  description,
  price_ex_vat,
  rent_price_ex_vat,
  vat_rate,
  technical_information,
  usage_text,
  is_published,
  sort_order,
  category:product_categories (
    id,
    slug,
    name
  ),
  images:product_images (
    id,
    storage_path,
    alt_text,
    is_primary,
    sort_order
  )
`;

function getImageUrl(supabase, storagePath) {
  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

function mapImage(supabase, image) {
  return {
    id: image.id,
    path: image.storage_path,
    src: getImageUrl(supabase, image.storage_path),
    alt: image.alt_text ?? "",
    isPrimary: image.is_primary ?? false,
    sortOrder: image.sort_order ?? 0,
  };
}

function mapProduct(supabase, product) {
  const images = (product.images ?? [])
    .map((image) => mapImage(supabase, image))
    .sort((a, b) => {
      if (a.isPrimary !== b.isPrimary) {
        return a.isPrimary ? -1 : 1;
      }

      return a.sortOrder - b.sortOrder;
    });

  return {
    id: product.id,
    slug: product.slug,
    name: product.name,

    shortDescription: product.short_description ?? "",

    description: product.description ?? "",

    priceExVat: product.price_ex_vat ?? "",

    rentPriceExVat: product.rent_price_ex_vat ?? "",

    vatRate: product.vat_rate ?? 0.25,

    technicalInformation: product.technical_information ?? "",

    usageText: product.usage_text ?? "",

    isPublished: product.is_published,

    sortOrder: product.sort_order,

    category: product.category,

    images,
  };
}

export async function getAdminProducts() {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return (data ?? []).map((product) => mapProduct(supabase, product));
}

export async function getAdminProduct(productId) {
  const supabase = createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("id", productId)
    .single();

  if (error) {
    throw error;
  }

  return mapProduct(supabase, data);
}

export async function updateProduct(productId, values) {
  const supabase = createSupabaseBrowserClient();

  const price = values.priceExVat === "" ? null : Number(values.priceExVat);

  const rentPrice =
    values.rentPriceExVat === "" ? null : Number(values.rentPriceExVat);

  const { data, error } = await supabase
    .from("products")
    .update({
      name: values.name.trim(),

      short_description: values.shortDescription.trim() || null,

      description: values.description.trim(),

      price_ex_vat: price,

      rent_price_ex_vat: rentPrice,

      technical_information: values.technicalInformation.trim() || null,

      usage_text: values.usageText.trim() || null,

      is_published: values.isPublished,
    })
    .eq("id", productId)
    .select(PRODUCT_SELECT)
    .single();

  if (error) {
    throw error;
  }

  return mapProduct(supabase, data);
}

export async function uploadProductImage({
  productId,
  productSlug,
  file,
  altText,
  makePrimary,
}) {
  const supabase = createSupabaseBrowserClient();

  const processedImage = await processImage(file, {
    maxWidth: 1600,
    maxHeight: 1600,
  });

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const storagePath = `${productSlug}/${fileName}`;

  const { data: existingImages, error: readError } = await supabase
    .from("product_images")
    .select("id, sort_order")
    .eq("product_id", productId)
    .order("sort_order", {
      ascending: false,
    });

  if (readError) {
    throw readError;
  }

  const nextSortOrder = existingImages?.length
    ? (existingImages[0].sort_order ?? 0) + 1
    : 1;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(storagePath, processedImage.file, {
      cacheControl: "3600",
      contentType: "image/webp",
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data: imageRow, error: insertError } = await supabase
    .from("product_images")
    .insert({
      product_id: productId,
      storage_path: storagePath,
      alt_text: altText.trim(),
      is_primary: false,
      sort_order: nextSortOrder,
    })
    .select()
    .single();

  if (insertError) {
    await supabase.storage.from("product-images").remove([storagePath]);

    throw insertError;
  }

  const shouldMakePrimary = makePrimary || existingImages.length === 0;

  if (shouldMakePrimary) {
    const { error: primaryError } = await supabase.rpc(
      "set_primary_product_image",
      {
        p_product_id: productId,
        p_image_id: imageRow.id,
      },
    );

    if (primaryError) {
      throw primaryError;
    }
  }

  return {
    ...mapImage(supabase, imageRow),

    isPrimary: shouldMakePrimary,
  };
}

export async function setPrimaryProductImage({ productId, imageId }) {
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase.rpc("set_primary_product_image", {
    p_product_id: productId,
    p_image_id: imageId,
  });

  if (error) {
    throw error;
  }
}

export async function updateImageAltText(imageId, altText) {
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase
    .from("product_images")
    .update({
      alt_text: altText.trim(),
    })
    .eq("id", imageId);

  if (error) {
    throw error;
  }
}

export async function deleteProductImage({
  productId,
  image,
  remainingImages,
}) {
  const supabase = createSupabaseBrowserClient();

  const { error: deleteError } = await supabase
    .from("product_images")
    .delete()
    .eq("id", image.id);

  if (deleteError) {
    throw deleteError;
  }

  if (image.isPrimary && remainingImages.length > 0) {
    const nextImage = remainingImages[0];

    const { error: primaryError } = await supabase.rpc(
      "set_primary_product_image",
      {
        p_product_id: productId,
        p_image_id: nextImage.id,
      },
    );

    if (primaryError) {
      throw primaryError;
    }
  }

  const { error: storageError } = await supabase.storage
    .from("product-images")
    .remove([image.path]);

  if (storageError) {
    console.error("Could not remove image file:", storageError);
  }
}
