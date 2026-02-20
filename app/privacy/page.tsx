import type { Metadata } from 'next';
import { PageHero } from '@/components/hero/page-hero';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description: 'OXONN Technologies privacy policy — how we collect, use, and protect your personal information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="Last updated: February 2026"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Privacy Policy' },
        ]}
      />

      <div className="mx-auto max-w-[var(--width-reading)] px-6 py-section">
        <div className="space-y-8 text-body leading-relaxed text-muted">
          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, such as when you fill out a contact form,
              subscribe to our newsletter, or engage with our services. This may include your name,
              email address, company, role, and message content.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">2. How We Use Your Information</h2>
            <p>
              We use your information to respond to inquiries, provide our services, send relevant
              communications, and improve our platform. We do not sell your personal information to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">3. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your personal information.
              All data transmission is encrypted using TLS, and we maintain SOC 2 compliant
              infrastructure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">4. Cookies & Analytics</h2>
            <p>
              We use essential cookies to ensure our website functions properly. We may use
              analytics tools to understand how visitors interact with our site. You can manage
              your cookie preferences at any time.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">5. Your Rights</h2>
            <p>
              You have the right to access, correct, or delete your personal information. To
              exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@oxonn.com" className="text-cyan hover:underline">
                privacy@oxonn.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-h3 font-semibold text-white">6. Contact</h2>
            <p>
              For any privacy-related questions, please reach out to our team at{' '}
              <a href="mailto:privacy@oxonn.com" className="text-cyan hover:underline">
                privacy@oxonn.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
