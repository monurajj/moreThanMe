import Head from "next/head";

interface SeoHeadProps {
  title: string;
  description: string;
  url?: string;
  image?: string;
}

export default function SeoHead({ title, description, url, image }: SeoHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
} 