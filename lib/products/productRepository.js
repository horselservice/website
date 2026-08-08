import { createSupabaseServerClient } from "../supabase/serverClient";

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
  category:product_categories!inner (
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

function getPublicImageUrl(supabase, storagePath) {
  if (!storagePath) {
    return null;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(storagePath);

  return data.publicUrl;
}

function mapProduct(supabase, product) {
  const images = [...(product.images ?? [])]
    .sort((firstImage, secondImage) => {
      if (firstImage.is_primary !== secondImage.is_primary) {
        return firstImage.is_primary ? -1 : 1;
      }

      return firstImage.sort_order - secondImage.sort_order;
    })
    .map((image) => ({
      id: image.id,
      src: getPublicImageUrl(supabase, image.storage_path),
      path: image.storage_path,
      alt: image.alt_text || product.name,
      isPrimary: image.is_primary,
      sortOrder: image.sort_order,
    }));

  const primaryImage =
    images.find((image) => image.isPrimary) ?? images[0] ?? null;

  return {
    id: product.id,
    slug: product.slug,
    title: product.name,

    shortDescription: product.short_description ?? "",

    description: product.description ?? "",

    priceExVat:
      product.price_ex_vat === null ? null : Number(product.price_ex_vat),

    rentPriceExVat:
      product.rent_price_ex_vat === null
        ? null
        : Number(product.rent_price_ex_vat),

    vatRate: Number(product.vat_rate ?? 0.25),

    technicalInformation: product.technical_information ?? "",

    usageText: product.usage_text ?? "",

    category: product.category,

    images,

    imgSrc: primaryImage?.src ?? null,

    imgAlt: primaryImage?.alt ?? product.name,
  };
}

export async function getProductsByCategory(categorySlug) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .eq("product_categories.slug", categorySlug)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(`Could not load products: ${error.message}`);
  }

  return (data ?? []).map((product) => mapProduct(supabase, product));
}

export async function getProductBySlug(slug) {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load product: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  return mapProduct(supabase, data);
}

export async function getAllPublishedProductSlugs() {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("is_published", true);

  if (error) {
    throw new Error(`Could not load product slugs: ${error.message}`);
  }

  return (data ?? []).map((product) => product.slug);
}
