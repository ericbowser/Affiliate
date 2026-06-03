/**
 * seoSchema.jsx
 * 
 * JSON-LD structured data generators for Wasatch Rockhound.
 * Single Responsibility: generates schema markup only.
 * 
 * Usage in BlogPost.jsx:
 *   import { ArticleSchema, FAQSchema } from '../data/seoSchema';
 *   <ArticleSchema post={post} />
 */
import React from "react";

const SITE = {
  name: "Wasatch Rockhound",
  url: "https://rockhoundutah.com",
  logo: "https://rockhoundutah.com/logo.png",
  author: {
    "@type": "Organization",
    name: "Execute & Engrave LLC",
    url: "https://rockhoundutah.com/about",
  },
};

/**
 * Article schema for blog posts.
 * Helps Google show rich results with date, author, description.
 */
export const ArticleSchema = ({ post }) => {
  if (!post) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.modified || post.date,
    author: SITE.author,
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: SITE.logo },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * Extract brand name from the first word(s) of a product name.
 * e.g. "Garrett AT Max" → "Garrett", "Minelab Equinox 800" → "Minelab"
 * Falls back to site name for unbranded products.
 */
function extractBrand(productName) {
  const knownBrands = [
    "Garrett", "Minelab", "Nokta", "Estwing", "National Geographic",
    "Lortone", "VEVOR", "Black Diamond", "Stanley", "Leatherman",
    "Garmin", "Hydro Flask", "Nicholson", "C1",
  ];
  return knownBrands.find((b) => productName.startsWith(b)) || SITE.name;
}

/**
 * Product review schema for individual product reviews.
 * Enables star ratings in Google search results.
 *
 * Required by Google: name, image, review with rating.
 * Add product.image in products.js for best results;
 * falls back to site logo if not provided.
 */
export const ProductSchema = ({ product }) => {
  if (!product) return null;

  const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ""));
  const imageUrl = product.image || SITE.logo;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.tagline,
    image: imageUrl,
    brand: {
      "@type": "Brand",
      name: extractBrand(product.name),
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: SITE.author,
    },
    offers: {
      "@type": "Offer",
      price: priceNum,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: product.url,
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 1, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5, unitCode: "DAY" },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * FAQ schema for articles with Q&A sections.
 * Generates expandable FAQ rich results in Google.
 * 
 * @param {Array} faqs - [{ question: "...", answer: "..." }, ...]
 */
export const FAQSchema = ({ faqs }) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

/**
 * BreadcrumbList schema for navigation context.
 */
export const BreadcrumbSchema = ({ items }) => {
  if (!items || items.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default { ArticleSchema, ProductSchema, FAQSchema, BreadcrumbSchema };
