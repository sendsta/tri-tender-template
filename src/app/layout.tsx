import type { Metadata } from 'next';
import '../tender-config/brand.css';

// Root metadata for the application.  You can customise the title and
// description based on the company or tender.
export const metadata: Metadata = {
  title: 'Tri‑Tender Project',
  description: 'AI‑driven tender response builder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="brand-theme">{children}</body>
    </html>
  );
}