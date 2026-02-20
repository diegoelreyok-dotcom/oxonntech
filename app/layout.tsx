import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'OXONN Technologies — Institutional Risk Management & Quantitative Alpha Platform',
    template: '%s | OXONN Technologies',
  },
  description:
    'Institutional-grade risk management platform and systematic alpha infrastructure for hedge funds, prop firms, and capital allocators. Sub-millisecond portfolio analytics and real-time hedging.',
  metadataBase: new URL('https://oxonn-tech.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://oxonn-tech.com',
    siteName: 'OXONN Technologies',
    images: [{ url: '/api/og' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/* ── Structured Data (Organization + FAQ) ── */
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'OXONN Technologies',
  url: 'https://oxonn-tech.com',
  logo: 'https://oxonn-tech.com/logo.png',
  description:
    'Institutional-grade quantitative risk management and systematic alpha infrastructure for hedge funds, prop firms, and capital allocators.',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'contact@oxonn.com',
    contactType: 'sales',
  },
  sameAs: ['https://linkedin.com/company/oxonn'],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does OXONN integrate with existing trading infrastructure?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We connect via secure, read-only APIs to your existing systems — OMS, EMS, risk platforms, and data feeds. Integration typically takes 24-48 hours with zero disruption to live trading operations.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of risk does your platform monitor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our platform covers market risk (VaR, CVaR, Greeks), credit risk, liquidity risk, and operational risk. We compute portfolio-level and position-level metrics in real-time across all asset classes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is alpha generated through your quantitative models?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our models combine proprietary factor research, machine learning, and alternative data to identify persistent market inefficiencies. Every strategy undergoes rigorous backtesting and out-of-sample validation before deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'What data access does OXONN require?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We require read-only access to portfolio positions, market data feeds, and trade history. We never request write access or execution permissions on your accounts.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the onboarding process take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Standard onboarding takes 1-2 weeks from initial assessment to go-live. This includes infrastructure review, API integration, model calibration, and UAT testing with your team.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can OXONN scale with our growing operations?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. Our distributed architecture is built to scale horizontally. Whether you manage 100 or 100,000 instruments, the platform maintains sub-millisecond latency without degradation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if the system flags a false positive?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All alerts include confidence scores and supporting data so your team can quickly assess validity. Our models continuously learn from feedback to reduce false positive rates over time.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a trial or pilot program available?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer a 30-day pilot program where you can evaluate the platform with live data in a sandboxed environment. No commitment required.',
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans text-foreground antialiased`}
      >
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
