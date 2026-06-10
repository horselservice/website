export async function getProducts() {
  return [
    {
      slug: 'formgjutna-horselskydd-musik',
      variant: 'one',        // use ProductContainer
      imgSrc: '/images/musik.webp',
      imgAlt: 'Festival',
      title: 'Musik och tal',
      vatRate: 0.25,
      priceExVat: 2160,
      description: 'För dig som vill dämpa ljudnivån utan att behöva kompromissa med ljudkvaliteten. Med hjälp av ett linjärt filter i hörselskyddet dämpas ljudnivån i dina öron samtidigt som ljudkvaliteten på tal och musik blir oförändrad. Filtren i hörselskydden andas vilket motverkar lockkänsla och fukt i öronen. Dessa skydd är särskilt populära hos musiker eller för dig som har ett kommunikativt yrke. Välj dämpning på 9-25dB.',
      shortDescription: 'Dämpar ljudnivån men bevarar ljudkvaliteten för tal och musik.'
    },
    {
      slug: 'formgjutna-horselskydd-motorsport',
      variant: 'two',            // use ProductContainerTwo
      imgSrc: '/images/motorsport.webp',
      imgAlt: 'En person som kör motorcross',
      title: 'Motorsport',
      vatRate: 0.25,
      priceExVat: 2000,
      description: 'Det tröttande och skadliga vindbruset dämpas samtidigt som du fortfarande hör det egna motorljudet och signalerna i trafiken klart och tydligt. De är dessutom utrustade med ett filter som släpper igenom tal.',
    },
    {
      slug: 'formgjutna-horselskydd-jakt',
      variant: 'one',        // use ProductContainer
      imgSrc: '/images/jakt.webp',
      imgAlt: 'Jägare med gevär',
      title: 'Jakt',
      vatRate: 0.25,
      priceExVat: 2240,
      description: 'Skyddar din hörsel från de höga ljudtrycksnivåerna som uppstår vid vapenskott och dämpar dem till säkra nivåer. Tal och svaga ljud släpps igenom vilket är viktigt vid jakt.',
      shortDescription: 'Skyddar mot kraftiga ljudnivåer samtidigt som tal och svaga ljud släpps igenom.',
    },
    {
      slug: 'formgjutna-horselskydd-bad',
      variant: 'two',            // use ProductContainerTwo
      imgSrc: '/images/bad.webp',
      imgAlt: 'En strand',
      title: 'Bad',
      vatRate: 0.25,
      priceExVat: 1120,
      description: 'Propparna sitter stadigt och tätt på plats så att inget vatten kommer in i öronen. Simpropparna håller sig flytande om du skulle råka tappa dem i vattnet.',
    },
    {
      slug: 'formgjutna-horselskydd-industri',
      variant: 'one',            // use ProductContainerTwo
      imgSrc: '/images/industri.webp',
      imgAlt: 'Industriarbetare på arbetsplats',
      title: 'Industri',
      vatRate: 0.25,
      priceExVat: 2080,
      description: 'Hörselskydd som sitter bekvämt och säkert på plats under hela arbetsdagen. Skadligt buller dämpas samtidigt som man kan kommunicera och höra varningssignaler. Går att få med snöre och handtag. Tåliga mot fukt, smuts och damm. Välj dämpning på 15-30dB.',
    },
    {
      slug: 'formgjutna-horselskydd-somn',
      variant: 'two',        // use ProductContainer
      imgSrc: '/images/somn.webp',
      imgAlt: 'En säng',
      title: 'Sömn',
      vatRate: 0.25,
      priceExVat: 1520,
      description: 'Tänk på att även med hörselskydd så blir det aldrig helt tyst eftersom vi också tar upp ljud genom kroppen. Sovskydden är utformade för att dämpa de ljud som stör sömnen mest, men samtidigt släppa igenom signalen från väckarklockan och brandlarmet. Man kan fortfarande höra högljudda snarkningar men de är rejält dämpade. ',
      frontPageDescription: 'För rofyllda och lugna nätter. Sitter stadigt på plats när du sover. Tillverkas i extra mjuk silikon.',
    }
  ]
}

export async function getAllProductSlugs() {
  const products = await getProducts()
  return products.map((p) => p.slug)
}

export async function getProductBySlug(slug) {
  const products = await getProducts()
  return products.find((p) => p.slug === slug)
}