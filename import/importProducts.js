import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import {
  existsSync,
  readFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config({
  path: ".env.local",
});

const currentFilePath =
  fileURLToPath(import.meta.url);

const currentDirectory =
  path.dirname(currentFilePath);

const projectRoot = path.resolve(
  currentDirectory,
  ".."
);

const storageBucket = "product-images";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const serviceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL saknas i .env.local."
  );
}

if (!serviceRoleKey) {
  throw new Error(
    "SUPABASE_SERVICE_ROLE_KEY saknas i .env.local."
  );
}

const supabase = createClient(
  supabaseUrl,
  serviceRoleKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);

const categories = [
  {
    slug: "passiva-horselskydd",
    name: "Passiva hörselskydd",
    description:
      "Formgjutna hörselskydd för arbete och fritid.",
    sort_order: 1,
    is_published: true,
  },
  {
    slug: "aktiva-horselskydd",
    name: "Aktiva hörselskydd",
    description:
      "Aktiva hörselskydd med elektronik och medhörning.",
    sort_order: 2,
    is_published: true,
  },
  {
    slug: "ljudutjamningssystem",
    name: "Ljudutjämningssystem",
    description:
      "Ljudutjämning och röstförstärkning för olika lokaler.",
    sort_order: 3,
    is_published: true,
  },
];

const products = [
  {
    categorySlug: "passiva-horselskydd",
    slug: "formgjutna-horselskydd-musik",
    name: "Musik och tal",
    short_description:
      "Dämpar ljudnivån men bevarar ljudkvaliteten för tal och musik.",
    description:
      "För dig som vill dämpa ljudnivån utan att behöva kompromissa med ljudkvaliteten. Med hjälp av ett linjärt filter i hörselskyddet dämpas ljudnivån i dina öron samtidigt som ljudkvaliteten på tal och musik blir oförändrad. Filtren i hörselskydden andas vilket motverkar lockkänsla och fukt i öronen. Dessa skydd är särskilt populära hos musiker eller för dig som har ett kommunikativt yrke. Välj dämpning på 9-25dB.",
    price_ex_vat: 2160,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text:
      "Musik, tal och kommunikativa yrken",
    sort_order: 1,
    is_published: true,
    images: [
      {
        source: "musik.webp",
        alt_text:
          "Person med formgjutna hörselskydd under en festival",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "passiva-horselskydd",
    slug: "formgjutna-horselskydd-motorsport",
    name: "Motorsport",
    short_description: null,
    description:
      "Det tröttande och skadliga vindbruset dämpas samtidigt som du fortfarande hör det egna motorljudet och signalerna i trafiken klart och tydligt. De är dessutom utrustade med ett filter som släpper igenom tal.",
    price_ex_vat: 2000,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text:
      "Motorsport och motorcykel",
    sort_order: 2,
    is_published: true,
    images: [
      {
        source: "motorsport.webp",
        alt_text:
          "Person som kör motocross med hörselskydd",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "passiva-horselskydd",
    slug: "formgjutna-horselskydd-jakt",
    name: "Jakt",
    short_description:
      "Skyddar mot kraftiga ljudnivåer samtidigt som tal och svaga ljud släpps igenom.",
    description:
      "Skyddar din hörsel från de höga ljudtrycksnivåerna som uppstår vid vapenskott och dämpar dem till säkra nivåer. Tal och svaga ljud släpps igenom vilket är viktigt vid jakt.",
    price_ex_vat: 2240,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text: "Jakt och skytte",
    sort_order: 3,
    is_published: true,
    images: [
      {
        source: "jakt.webp",
        alt_text:
          "Jägare med gevär och hörselskydd",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "passiva-horselskydd",
    slug: "formgjutna-horselskydd-bad",
    name: "Bad",
    short_description: null,
    description:
      "Propparna sitter stadigt och tätt på plats så att inget vatten kommer in i öronen. Simpropparna håller sig flytande om du skulle råka tappa dem i vattnet.",
    price_ex_vat: 1120,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text: "Bad och simning",
    sort_order: 4,
    is_published: true,
    images: [
      {
        source: "bad.webp",
        alt_text:
          "Person som använder formgjutna badproppar vid vatten",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "passiva-horselskydd",
    slug: "formgjutna-horselskydd-industri",
    name: "Industri",
    short_description: null,
    description:
      "Hörselskydd som sitter bekvämt och säkert på plats under hela arbetsdagen. Skadligt buller dämpas samtidigt som man kan kommunicera och höra varningssignaler. Går att få med snöre och handtag. Tåliga mot fukt, smuts och damm. Välj dämpning på 15-30dB.",
    price_ex_vat: 2080,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text:
      "Industri och bullriga arbetsmiljöer",
    sort_order: 5,
    is_published: true,
    images: [
      {
        source: "industri.webp",
        alt_text:
          "Industriarbetare i bullrig arbetsmiljö",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "passiva-horselskydd",
    slug: "formgjutna-horselskydd-somn",
    name: "Sömn",
    short_description:
      "För rofyllda och lugna nätter. Sitter stadigt på plats när du sover. Tillverkas i extra mjuk silikon.",
    description:
      "Tänk på att även med hörselskydd så blir det aldrig helt tyst eftersom vi också tar upp ljud genom kroppen. Sovskydden är utformade för att dämpa de ljud som stör sömnen mest, men samtidigt släppa igenom signalen från väckarklockan och brandlarmet. Man kan fortfarande höra högljudda snarkningar men de är rejält dämpade.",
    price_ex_vat: 1520,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text: "Sömn och vila",
    sort_order: 6,
    is_published: true,
    images: [
      {
        source: "somn.webp",
        alt_text:
          "Formgjutna sovproppar för användning under natten",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "aktiva-horselskydd",
    slug: "eartech-active-pro",
    name: "HA Active Pro",
    short_description:
      "Aktivt hörselskydd för jakt med förstärkning av tal och svaga ljud.",
    description:
      "Active Pro är speciellt framtaget för jakt. Tal och svaga ljud förstärks samtidigt som din hörsel är skyddad mot de kraftiga ljud som ett gevär kan ge ifrån sig. Skydden kan kompensera lätt till måttlig hörselnedsättning. Tack vare sin unika konstruktion och placering i ytterörat får du en bra riktningshörsel. Tekniken i Active Pro ger även mycket bra ljudåtergivning och minimal störning från vindbrus.",
    price_ex_vat: 7596,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text: "Jakt",
    sort_order: 1,
    is_published: true,
    images: [
      {
        source: "jagare.webp",
        alt_text:
          "Jägare som använder HA Active Pro",
        is_primary: true,
        sort_order: 1,
      },
      {
        source: "jakt.webp",
        alt_text:
          "HA Active Pro vid jakt",
        is_primary: false,
        sort_order: 2,
      },
    ],
  },
  {
    categorySlug: "aktiva-horselskydd",
    slug: "halsslinga",
    name: "Halsslinga",
    short_description:
      "Trådlös medhörning till mobiltelefon eller jaktradio.",
    description:
      "Active Pro kan kopplas till halsslinga. Med hjälp av en induktiv halsslinga kan man få trådlös medhörning till exempelvis mobiltelefon eller jaktradio.",
    price_ex_vat: 1600,
    rent_price_ex_vat: null,
    vat_rate: 0.25,
    technical_information: null,
    usage_text:
      "Mobiltelefon och jaktradio",
    sort_order: 2,
    is_published: true,
    images: [
      {
        source: "halsslinga.webp",
        alt_text:
          "Induktiv halsslinga för HA Active Pro",
        is_primary: true,
        sort_order: 1,
      },
    ],
  },
  {
    categorySlug: "ljudutjamningssystem",
    slug: "phonak-roger-soundfield-5000",
    name: "Roger Soundfield 5000 V2",
    short_description: null,
    description:
      "Vi tycker att alla förtjänar att höra bra i offentliga lokaler. Med Phonaks högkvalitativa ljudutjämningssystem kan alla höra, känna sig delaktiga och talaren sparar sin röst.",
    price_ex_vat: 15200,
    rent_price_ex_vat: 960,
    vat_rate: 0.25,
    technical_information:
      "DigiMaster 5000 högtalare\nMått: 885 x 72 mm\nVikt: 2070 g\nRäckvidd: 20 m\nRumsstorlek: 100 m2\nMax. antal högtalare per mikrofon: 1 st\nFrekvensbredd: 200 - 7500 Hz\n\nRoger (SF) Touchscreen Mic\nMått: 104 x 55 x 16 mm\nVikt: 94 g\nFärg: Svart\nAntal inbyggda mikrofoner: 3 st\nRäckvidd: 20 m\nBatteritid: 10 h\nLaddtid: 2 h\nLaddkabel: micro-USB (inkluderad)\nKompatibilitet: DigiMaster 5000/7000, Pass-around",
    usage_text:
      "Klassrum och offentliga lokaler",
    sort_order: 1,
    is_published: true,
    images: [
      {
        source: "rogerSpeaker.webp",
        alt_text:
          "Roger Soundfield 5000-högtalare",
        is_primary: true,
        sort_order: 1,
      },
      {
        source: "soundfield.webp",
        alt_text:
          "Roger Soundfield installerat i en lokal",
        is_primary: false,
        sort_order: 2,
      },
    ],
  },
  {
    categorySlug: "ljudutjamningssystem",
    slug: "phonak-roger-soundfield-7000",
    name: "Roger Soundfield 7000 V2",
    short_description: null,
    description:
      "Vi tycker att alla förtjänar att höra bra i offentliga lokaler. Med Phonaks högkvalitativa ljudutjämningssystem kan alla höra, känna sig delaktiga och talaren sparar sin röst.",
    price_ex_vat: 18700,
    rent_price_ex_vat: 960,
    vat_rate: 0.25,
    technical_information:
      "DigiMaster 7000 högtalare\nMått: 1045 x 72 mm\nVikt: 2550 g\nRäckvidd: 20 m\nRumsstorlek per högtalare: 300 m2\nMax. antal högtalare per mikrofon: 2 st\nFrekvensbredd: 200 - 7500 Hz\n\nRoger (SF) Touchscreen Mic\nMått: 104 x 55 x 16 mm\nVikt: 94 g\nFärg: Svart\nAntal inbyggda mikrofoner: 3 st\nRäckvidd: 20 m\nBatteritid: 10 h\nLaddtid: 2 h\nLaddkabel: micro-USB (inkluderad)\nKompatibilitet: DigiMaster 5000/7000, Pass-around",
    usage_text:
      "Större klassrum, konferenslokaler och offentliga lokaler",
    sort_order: 2,
    is_published: true,
    images: [
      {
        source: "rogerSpeaker.webp",
        alt_text:
          "Roger Soundfield 7000-högtalare",
        is_primary: true,
        sort_order: 1,
      },
      {
        source: "konferans.webp",
        alt_text:
          "Roger Soundfield i en konferenslokal",
        is_primary: false,
        sort_order: 2,
      },
    ],
  },
];

function getContentType(fileName) {
  const extension = path
    .extname(fileName)
    .toLowerCase();

  const contentTypes = {
    ".webp": "image/webp",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
  };

  return (
    contentTypes[extension] ??
    "application/octet-stream"
  );
}

function getLocalImagePath(imageSource) {
  return path.join(
    projectRoot,
    "public",
    "images",
    imageSource
  );
}

function validateUniqueValues(
  values,
  valueName
) {
  const encounteredValues = new Set();

  for (const value of values) {
    if (!value || typeof value !== "string") {
      throw new Error(
        `${valueName} måste vara en textsträng och får inte vara tom.`
      );
    }

    if (encounteredValues.has(value)) {
      throw new Error(
        `Dubblett upptäckt för ${valueName}: "${value}".`
      );
    }

    encounteredValues.add(value);
  }
}

function validateCategories() {
  validateUniqueValues(
    categories.map((category) => category.slug),
    "kategori-slug"
  );

  for (const category of categories) {
    if (!category.name?.trim()) {
      throw new Error(
        `Kategorin "${category.slug}" saknar namn.`
      );
    }
  }
}

function validateProducts() {
  validateUniqueValues(
    products.map((product) => product.slug),
    "produkt-slug"
  );

  const categorySlugs = new Set(
    categories.map((category) => category.slug)
  );

  for (const product of products) {
    if (!product.name?.trim()) {
      throw new Error(
        `Produkten "${product.slug}" saknar namn.`
      );
    }

    if (!product.description?.trim()) {
      throw new Error(
        `Produkten "${product.slug}" saknar beskrivning.`
      );
    }

    if (
      !categorySlugs.has(product.categorySlug)
    ) {
      throw new Error(
        `Produkten "${product.slug}" använder en okänd kategori: "${product.categorySlug}".`
      );
    }

    if (!Array.isArray(product.images)) {
      throw new Error(
        `Produkten "${product.slug}" har inget giltigt images-fält.`
      );
    }

    const primaryImages =
      product.images.filter(
        (image) => image.is_primary
      );

    if (primaryImages.length > 1) {
      throw new Error(
        `Produkten "${product.slug}" har fler än en huvudbild.`
      );
    }

    const imageSortOrders =
      product.images.map(
        (image) => image.sort_order
      );

    const uniqueImageSortOrders =
      new Set(imageSortOrders);

    if (
      uniqueImageSortOrders.size !==
      imageSortOrders.length
    ) {
      throw new Error(
        `Produkten "${product.slug}" har dubbla sort_order-värden för bilder.`
      );
    }

    for (const image of product.images) {
      if (!image.source?.trim()) {
        throw new Error(
          `Produkten "${product.slug}" innehåller en bild utan filnamn.`
        );
      }

      if (!image.alt_text?.trim()) {
        throw new Error(
          `Bilden "${image.source}" för produkten "${product.slug}" saknar alt-text.`
        );
      }

      const localPath =
        getLocalImagePath(image.source);

      if (!existsSync(localPath)) {
        throw new Error(
          `Bildfilen "${image.source}" för produkten "${product.slug}" finns inte.\nFörväntad sökväg: ${localPath}`
        );
      }
    }
  }
}

async function validateStorageBucket() {
  const { data, error } =
    await supabase.storage.getBucket(
      storageBucket
    );

  if (error || !data) {
    throw new Error(
      `Storage-bucketen "${storageBucket}" kunde inte hittas. Skapa den i Supabase innan importen körs.`
    );
  }

  if (!data.public) {
    console.warn(
      `Varning: Storage-bucketen "${storageBucket}" är inte publik. getPublicUrl() kommer då inte ge publikt tillgängliga bilder.`
    );
  }
}

async function importCategories() {
  console.log("Importerar kategorier...");

  const { data, error } = await supabase
    .from("product_categories")
    .upsert(categories, {
      onConflict: "slug",
    })
    .select("id, slug, name");

  if (error) {
    throw new Error(
      `Kunde inte importera kategorier: ${error.message}`
    );
  }

  if (!data) {
    throw new Error(
      "Supabase returnerade inga kategorier efter importen."
    );
  }

  return new Map(
    data.map((category) => [
      category.slug,
      category,
    ])
  );
}

async function uploadImage({
  productSlug,
  image,
}) {
  const localPath =
    getLocalImagePath(image.source);

  const storagePath =
    `${productSlug}/${image.source}`;

  const fileBuffer =
    readFileSync(localPath);

  const { error } = await supabase.storage
    .from(storageBucket)
    .upload(storagePath, fileBuffer, {
      contentType: getContentType(
        image.source
      ),
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    throw new Error(
      `Kunde inte ladda upp bilden "${image.source}" för produkten "${productSlug}": ${error.message}`
    );
  }

  return storagePath;
}

async function uploadProductImages(
  productSlug,
  images
) {
  const uploadedImages = [];

  for (const image of images) {
    const storagePath =
      await uploadImage({
        productSlug,
        image,
      });

    uploadedImages.push({
      ...image,
      storagePath,
    });
  }

  return uploadedImages;
}

async function getExistingProductImages(
  productId
) {
  const { data, error } = await supabase
    .from("product_images")
    .select(
      `
        storage_path,
        alt_text,
        is_primary,
        sort_order
      `
    )
    .eq("product_id", productId)
    .order("sort_order", {
      ascending: true,
    });

  if (error) {
    throw new Error(
      `Kunde inte läsa befintliga bildrader: ${error.message}`
    );
  }

  return data ?? [];
}

async function restoreProductImages(
  productId,
  previousImages
) {
  if (previousImages.length === 0) {
    return;
  }

  const rowsToRestore =
    previousImages.map((image) => ({
      product_id: productId,
      storage_path: image.storage_path,
      alt_text: image.alt_text,
      is_primary: image.is_primary,
      sort_order: image.sort_order,
    }));

  const { error } = await supabase
    .from("product_images")
    .insert(rowsToRestore);

  if (error) {
    console.error(
      `Varning: gamla bildrader kunde inte återställas: ${error.message}`
    );
  }
}

async function replaceProductImages(
  productId,
  productSlug,
  images
) {
  const uploadedImages =
    await uploadProductImages(
      productSlug,
      images
    );

  const previousImages =
    await getExistingProductImages(
      productId
    );

  const newImageRows =
    uploadedImages.map((image) => ({
      product_id: productId,
      storage_path: image.storagePath,
      alt_text: image.alt_text,
      is_primary: image.is_primary,
      sort_order: image.sort_order,
    }));

  const { error: deleteError } =
    await supabase
      .from("product_images")
      .delete()
      .eq("product_id", productId);

  if (deleteError) {
    throw new Error(
      `Kunde inte rensa tidigare bildrader för "${productSlug}": ${deleteError.message}`
    );
  }

  if (newImageRows.length === 0) {
    return;
  }

  const { error: insertError } =
    await supabase
      .from("product_images")
      .insert(newImageRows);

  if (insertError) {
    await restoreProductImages(
      productId,
      previousImages
    );

    throw new Error(
      `Kunde inte skapa nya bildrader för "${productSlug}". De tidigare bildraderna har försökt återställas. Fel: ${insertError.message}`
    );
  }
}

async function importProducts(
  categoryMap
) {
  console.log("Importerar produkter...");

  for (const product of products) {
    const category = categoryMap.get(
      product.categorySlug
    );

    if (!category) {
      throw new Error(
        `Kategorin saknas efter importen: "${product.categorySlug}".`
      );
    }

    const {
      categorySlug,
      images,
      ...productValues
    } = product;

    const productRow = {
      ...productValues,
      category_id: category.id,
    };

    const { data, error } =
      await supabase
        .from("products")
        .upsert(productRow, {
          onConflict: "slug",
        })
        .select("id, slug, name")
        .single();

    if (error) {
      throw new Error(
        `Kunde inte importera produkten "${product.slug}": ${error.message}`
      );
    }

    if (!data) {
      throw new Error(
        `Supabase returnerade ingen produkt efter import av "${product.slug}".`
      );
    }

    await replaceProductImages(
      data.id,
      data.slug,
      images
    );

    console.log(`✓ ${data.name}`);
  }
}

async function runImport() {
  try {
    console.log(
      "Validerar importerad data..."
    );

    validateCategories();
    validateProducts();

    console.log(
      "Kontrollerar Supabase Storage..."
    );

    await validateStorageBucket();

    console.log(
      "\nStartar produktimport...\n"
    );

    const categoryMap =
      await importCategories();

    await importProducts(categoryMap);

    console.log(
      `\nImporten är klar. ${products.length} produkter behandlades.`
    );
  } catch (error) {
    console.error(
      "\nImporten misslyckades:"
    );

    console.error(
      error instanceof Error
        ? error.message
        : error
    );

    process.exitCode = 1;
  }
}

await runImport();