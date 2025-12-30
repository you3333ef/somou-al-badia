import { use } from 'react';
import { TentDetailsClient } from './TentDetailsClient';

export function generateStaticParams() {
  return [
    { slug: 'royal-desert-palace' },
    { slug: 'golden-sands-suite' },
    { slug: 'moonlight-oasis' },
    { slug: 'desert-breeze-haven' },
    { slug: 'starlight-sanctuary' },
    { slug: 'crystal-sky-pavilion' },
    { slug: 'nomad-nest' },
    { slug: 'dune-dweller' },
    { slug: 'sahara-crown' },
    { slug: 'desert-garden-retreat' },
  ];
}

export const dynamicParams = true;

export default function TentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  return <TentDetailsClient slug={slug} />;
}
