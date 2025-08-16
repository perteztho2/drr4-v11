import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'MDRRMO Pio Duran',
  description = 'Municipal Disaster Risk Reduction and Management Office - Building resilient communities through effective disaster preparedness and response.',
  keywords = 'MDRRMO, disaster management, emergency response, Pio Duran, Albay, Philippines',
  image = 'https://res.cloudinary.com/dedcmctqk/image/upload/v1750079276/logome_h9snnx.webp',
  url,
  type = 'website'
}) => {
  const fullTitle = title.includes('MDRRMO') ? title : `${title} | MDRRMO Pio Duran`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="MDRRMO Pio Duran" />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="MDRRMO Pio Duran" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="msapplication-TileColor" content="#1e3a8a" />
      <link rel="canonical" href={currentUrl} />
    </Helmet>
  );
};

export default SEOHead;