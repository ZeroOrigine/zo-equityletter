import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://equityletter.com'),
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
