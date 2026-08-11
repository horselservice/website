const {
  createClient,
} = require(
  "@supabase/supabase-js"
);

function createSupabaseTestAdmin() {
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const secretKey =
    process.env
      .SUPABASE_SECRET_KEY;

  if (
    !supabaseUrl ||
    !secretKey
  ) {
    throw new Error(
      "NEXT_PUBLIC_SUPABASE_URL " +
        "eller SUPABASE_SECRET_KEY " +
        "saknas i .env.local."
    );
  }

  return createClient(
    supabaseUrl,
    secretKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

async function removeStorageFiles(
  supabase,
  slug
) {
  const {
    data,
    error,
  } = await supabase.storage
    .from("product-images")
    .list(slug, {
      limit: 100,
    });

  if (error) {
    throw error;
  }

  const paths = (
    data ?? []
  )
    .filter(
      (file) => file.id
    )
    .map(
      (file) =>
        `${slug}/${file.name}`
    );

  if (
    paths.length === 0
  ) {
    return;
  }

  const {
    error: removeError,
  } = await supabase.storage
    .from("product-images")
    .remove(paths);

  if (removeError) {
    throw removeError;
  }
}

async function deleteTestProduct(
  product
) {
  const supabase =
    createSupabaseTestAdmin();

  await removeStorageFiles(
    supabase,
    product.slug
  );

  const {
    error,
  } = await supabase
    .from("products")
    .delete()
    .eq(
      "id",
      product.id
    );

  if (error) {
    throw error;
  }
}

async function cleanupStaleTestProducts() {
  const supabase =
    createSupabaseTestAdmin();

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .select(
      "id, slug"
    )
    .like(
      "slug",
      "e2e-cms-test-%"
    );

  if (error) {
    throw error;
  }

  for (
    const product of data ?? []
  ) {
    await removeStorageFiles(
      supabase,
      product.slug
    );

    const {
      error: deleteError,
    } = await supabase
      .from("products")
      .delete()
      .eq(
        "id",
        product.id
      );

    if (deleteError) {
      throw deleteError;
    }
  }
}

async function createTestProduct() {
  const supabase =
    createSupabaseTestAdmin();

  const {
    data: category,
    error: categoryError,
  } = await supabase
    .from(
      "product_categories"
    )
    .select(
      "id, name"
    )
    .eq(
      "is_published",
      true
    )
    .order(
      "sort_order",
      {
        ascending: true,
      }
    )
    .limit(1)
    .single();

  if (categoryError) {
    throw categoryError;
  }

  const uniquePart =
    `${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

  const product = {
    category_id:
      category.id,

    slug:
      `e2e-cms-test-${uniquePart}`,

    name:
      `E2E CMS Test ${uniquePart}`,

    short_description:
      "Automatisk testprodukt.",

    description:
      "Den här produkten skapades automatiskt av Playwright.",

    price_ex_vat: 1000,

    rent_price_ex_vat: 100,

    vat_rate: 0.25,

    technical_information:
      "Automatisk teknisk information.",

    usage_text:
      "Automatiskt användningsområde.",

    is_published: false,

    sort_order: 999999,
  };

  const {
    data,
    error,
  } = await supabase
    .from("products")
    .insert(product)
    .select(
      "id, slug, name"
    )
    .single();

  if (error) {
    throw error;
  }

  return data;
}

module.exports = {
  createTestProduct,
  deleteTestProduct,
  cleanupStaleTestProducts,
};