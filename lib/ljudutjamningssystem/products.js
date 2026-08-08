// lib/products.js
export async function getSoundfieldProducts() {
  return [
    {
      slug: "phonak-roger-soundfield-5000",
      variant: "one",
      imgSrc: "/images/rogerSpeaker.webp",
      imgSrcTwo: "/images/soundfield.webp",
      imgAlt: "Roger Soundfield",
      imgAltTwo: "Samling",
      title: "Roger Soundfield 5000 V2",
      vatRate: 0.25,
      priceExVat: 15200,
      rentPriceExVat: 960,
      description:
        "Vi tycker att alla förtjänar att höra bra i offentliga lokaler. Med Phonaks högkvalitativa ljudutjämningssystem kan alla höra, känna sig delaktiga och talaren sparar sin röst.",
      technicalInformation:
        "DigiMaster 5000 högtalare\nMått: 885 x 72 mm\nVikt: 2070 g\nRäckvidd: 20 m\nRumsstorlek: 100 m2\nMax. antal högtalare per mikrofon: 1 st\nFrekvensbredd: 200 - 7500 Hz\n\nRoger (SF) Touchscreen Mic \nMått: 104 x 55 x 16 mm \nVikt: 94 g \nFärg: Svart \nAntal inbyggda mikrofoner: 3 st \nRäckvidd: 20 m \nBatteritid: 10 h \nLaddtid: 2 h \nLaddkabel: micro-USB (inkluderad) \nKompatibilitet: DigiMaster 5000/7000, Pass-around",
    },
    {
      slug: "phonak-roger-soundfield-7000",
      variant: "two",
      imgSrc: "/images/rogerSpeaker.webp",
      imgSrcTwo: "/images/konferans.webp",
      imgAlt: "Roger Soundfield",
      imgAltTwo: "Konferanssal",
      title: "Roger Soundfield 7000 V2",
      vatRate: 0.25,
      priceExVat: 18700,
      rentPriceExVat: 960,
      description:
        "Vi tycker att alla förtjänar att höra bra i offentliga lokaler. Med Phonaks högkvalitativa ljudutjämningssystem kan alla höra, känna sig delaktiga och talaren sparar sin röst.",
      technicalInformation:
        "DigiMaster 7000 högtalare \nMått: 1045 x 72 mm \nVikt: 2550 g \nRäckvidd: 20 m \nRumsstorlek per högtalare: 300 m2 \nMax. antal högtalare per mikrofon: 2 st \nFrekvensbredd: 200 - 7500 Hz \n\nRoger (SF) Touchscreen Mic \nMått: 104 x 55 x 16 mm \nVikt: 94 g \nFärg: Svart \nAntal inbyggda mikrofoner: 3 st \nRäckvidd: 20 m \nBatteritid: 10 h \nLaddtid: 2 h \nLaddkabel: micro-USB (inkluderad) \nKompatibilitet: DigiMaster 5000/7000, Pass-around",
    },
  ];
}

export async function getAllSoundfieldProductSlugs() {
  const products = await getSoundfieldProducts();
  return products.map((p) => p.slug);
}

export async function getSoundfieldProductBySlug(slug) {
  const products = await getSoundfieldProducts();
  return products.find((p) => p.slug === slug);
}
