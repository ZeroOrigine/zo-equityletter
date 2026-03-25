import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#ffffff',
};

export const metadata: Metadata = {
  title: 'EquityLetter — Send Beautiful Equity Updates',
  description: 'Create, manage, and send equity-related letters to your investors and stakeholders. Cap table updates, grant notifications, and investor updates in one place.',
  openGraph: {
    title: 'EquityLetter — Send Beautiful Equity Updates',
    description: 'Create, manage, and send equity-related letters to your investors and stakeholders.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
