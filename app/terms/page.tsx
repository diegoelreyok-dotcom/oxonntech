import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/page-hero';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Terms of Service',
  description: 'OXONN Technologies terms of service — the legal agreement governing your use of our website and services.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="Last updated: February 2026"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Terms of Service' },
        ]}
      />

      <div className="mx-auto max-w-[var(--width-reading)] px-6 py-section">
        <div className="space-y-8 text-body leading-relaxed text-muted">
          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the OXONN Technologies website and services, you agree to be
              bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">2. Services Description</h2>
            <p>
              OXONN Technologies provides quantitative financial technology solutions, including
              systematic alpha strategies, risk management platforms, and bespoke advisory services.
              All services are subject to separate agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">3. Intellectual Property</h2>
            <p>
              All content, technology, and proprietary methodologies on this website are the
              intellectual property of OXONN Technologies. Unauthorized reproduction or
              distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">4. Disclaimer</h2>
            <p>
              Content on this website is for informational purposes only and does not constitute
              investment advice, a solicitation, or an offer to buy or sell any financial
              instruments. Past performance is not indicative of future results.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">5. Limitation of Liability</h2>
            <p>
              OXONN Technologies shall not be liable for any direct, indirect, incidental, or
              consequential damages resulting from the use or inability to use our website or
              services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">6. Contact</h2>
            <p>
              For questions about these Terms, please contact us at{' '}
              <a href="mailto:legal@oxonn.com" className="text-cyan hover:underline">
                legal@oxonn.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
