import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_NAME, DEFAULT_IMAGE } from '../lib/seo';

interface SeoHeadProps {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, unknown>[];
  noindex?: boolean;
}

/**
 * Drop-in SEO component. Place at the top of every public page component.
 *
 * Usage:
 *   <SeoHead
 *     title="Page Title | Fruitlly"
 *     description="Meta description under 155 chars."
 *     canonical="https://fruitlly.com/about"
 *     schema={[organizationSchema]}
 *   />
 */
const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage,
  schema = [],
  noindex = false,
}) => {
  const image = ogImage || DEFAULT_IMAGE;

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      {schema.map((item, index) => (
        <script key={`schema-${index}`} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};

export default SeoHead;
