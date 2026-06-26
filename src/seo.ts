// Schema.org structured data for FiscalPoint, built from a single source of
// truth (src/data.ts). Rendered into the static <head> at prerender time so
// search engines and rich-result parsers read it without executing JS.

import { FAQS, EMAIL } from './data'

export const SITE_URL = 'https://www.fiscalpoint.com.do'
export const SITE_NAME = 'FiscalPoint'
export const TELEPHONE = '+1-849-401-1017'

const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`
const WEBAPP_ID = `${SITE_URL}/#webapp`

const DESCRIPTION =
  'FiscalPoint te certifica ante la DGII y te da una plataforma en la nube para emitir, recibir y consultar comprobantes fiscales electrónicos (e-CF). Facturación electrónica para PyMEs, contadores y empresas en República Dominicana.'

type JsonLdNode = Record<string, unknown>

function organization(): JsonLdNode {
  return {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: SITE_NAME,
    legalName: 'FiscalPoint',
    url: `${SITE_URL}/`,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${SITE_URL}/og-image.png`,
    description: DESCRIPTION,
    slogan: 'Factura electrónica sin dolores de cabeza.',
    email: EMAIL,
    telephone: TELEPHONE,
    knowsLanguage: ['es', 'es-DO'],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'DO',
    },
    areaServed: {
      '@type': 'Country',
      name: 'República Dominicana',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: TELEPHONE,
        email: EMAIL,
        contactType: 'sales',
        areaServed: 'DO',
        availableLanguage: ['Spanish'],
      },
      {
        '@type': 'ContactPoint',
        telephone: TELEPHONE,
        contactType: 'customer support',
        areaServed: 'DO',
        availableLanguage: ['Spanish'],
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Planes de facturación electrónica e-CF',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'Certificación DGII e-CF',
          description:
            'Acompañamiento completo en el proceso oficial de certificación de facturación electrónica ante la DGII.',
          price: '2000',
          priceCurrency: 'DOP',
        },
        {
          '@type': 'Offer',
          name: 'FiscalPoint Web App',
          description:
            'Plataforma en la nube para emitir, recibir y reportar comprobantes fiscales electrónicos (e-CF).',
          priceCurrency: 'DOP',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1500',
            priceCurrency: 'DOP',
            unitText: 'MES',
            billingDuration: 1,
            billingIncrement: 1,
          },
        },
        {
          '@type': 'Offer',
          name: 'Integración API e-CF',
          description:
            'Conecta tu ERP, POS o sistema contable: tu sistema envía los datos y FiscalPoint devuelve el XML firmado y el estado DGII.',
          priceCurrency: 'DOP',
          priceSpecification: {
            '@type': 'UnitPriceSpecification',
            price: '1000',
            priceCurrency: 'DOP',
            unitText: 'MES',
            billingDuration: 1,
            billingIncrement: 1,
          },
        },
      ],
    },
  }
}

function website(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: DESCRIPTION,
    inLanguage: 'es-DO',
    publisher: { '@id': ORG_ID },
  }
}

function softwareApplication(): JsonLdNode {
  return {
    '@type': 'SoftwareApplication',
    '@id': WEBAPP_ID,
    name: 'FiscalPoint Web App',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Facturación electrónica e-CF',
    operatingSystem: 'Web, Cloud',
    url: `${SITE_URL}/`,
    inLanguage: 'es-DO',
    description:
      'Sistema de facturación electrónica e-CF en la nube con cumplimiento DGII: factura, recibe comprobantes, gestiona clientes, productos y gastos, y consulta reportes desde cualquier dispositivo.',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'República Dominicana' },
    featureList: [
      'Emisión de comprobantes fiscales electrónicos (e-CF)',
      'Recepción de comprobantes y validación ante la DGII',
      'Gestión de clientes, productos, gastos y proveedores',
      'Reportes y trazabilidad fiscal',
      'Integración API para ERP, POS y sistemas contables',
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'DOP',
      price: '1500',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '1500',
        priceCurrency: 'DOP',
        unitText: 'MES',
        billingDuration: 1,
        billingIncrement: 1,
      },
      availability: 'https://schema.org/InStock',
    },
  }
}

function faqPage(): JsonLdNode {
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    inLanguage: 'es-DO',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
}

function breadcrumb(): JsonLdNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Inicio',
        item: `${SITE_URL}/`,
      },
    ],
  }
}

export function buildStructuredData(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organization(),
      website(),
      softwareApplication(),
      faqPage(),
      breadcrumb(),
    ],
  }
}

/** JSON-LD wrapped in a <script> tag, safe to inline in HTML <head>. */
export function buildJsonLdScript(): string {
  const json = JSON.stringify(buildStructuredData()).replace(/</g, '\\u003c')
  return `  <script type="application/ld+json">${json}</script>`
}
