import {
  createSupabaseBrowserClient,
} from "../supabase/browserClient";

const ADMIN_PRODUCT_SELECT = `
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

export async function getAdminProducts() {
  const supabase =
    createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(ADMIN_PRODUCT_SELECT)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function getAdminProduct(
  productId
) {
  const supabase =
    createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .select(ADMIN_PRODUCT_SELECT)
    .eq("id", productId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateProduct(
  productId,
  values
) {
  const supabase =
    createSupabaseBrowserClient();

  const { data, error } = await supabase
    .from("products")
    .update({
      name: values.name,
      short_description:
        values.shortDescription || null,
      description:
        values.description,
      price_ex_vat:
        values.priceExVat || null,
      rent_price_ex_vat:
        values.rentPriceExVat || null,
      technical_information:
        values.technicalInformation || null,
      usage_text:
        values.usageText || null,
      is_published:
        values.isPublished,
    })
    .eq("id", productId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}