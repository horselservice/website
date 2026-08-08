// lib/products.js
export async function getBluetoothProducts() {
  return [
    {
      slug: "eartech-active-pro",
      variant: "three", // use ProductContainerSlider
      images: [
        {
          src: "/images/jagare.webp",
          alt: "Bild på jägare med Active Pro",
        },
        {
          src: "/images/jakt.webp",
          alt: "Bild på jägare",
        },
      ],
      title: "HA Active Pro",
      vat: 0.25,
      priceExVat: 7596,
      description:
        "Active Pro är speciellt framtaget för jakt. Tal och svaga ljud förstärks samtidigt som din hörsel är skyddad mot de kraftiga ljud som ett gevär kan ge ifrån sig. Skydden kan kompensera lätt till måttlig hörselnedsättning. Tack vare sin unika konstruktion och placering i ytterörat får du en bra riktningshörsel. Tekniken i Active Pro ger även mycket bra ljudåtergivning och minimal störning från vindbrus.",
      shortDescription:
        "Aktivt hörselskydd för jakt med förstärkning av tal och svaga ljud.",
    },
    {
      slug: "halsslinga",
      variant: "two", // use ProductContainerTwo
      imgSrc: "/images/halsslinga.webp",
      imgAlt: "Induktiv halsslinga för Active Pro",
      title: "Halsslinga",
      vatRate: 0.25,
      priceExVat: 1600,
      description:
        "Active Pro kan kopplas till halsslinga. Med hjälp av en induktiv halsslinga kan man få trådlös medhörning till exempelvis mobiltelefon eller jaktradio.",
      shortDescription: "Trådlös medhörning till mobiltelefon eller jaktradio.",
    },
  ];
}

export async function getAllBluetoothProductSlugs() {
  const products = await getBluetoothProducts();
  return products.map((p) => p.slug);
}

export async function getBluetoothProductBySlug(slug) {
  const products = await getBluetoothProducts();
  return products.find((p) => p.slug === slug);
}
