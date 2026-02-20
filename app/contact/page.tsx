import type { Metadata } from 'next';
import { Mail, MapPin, Clock } from 'lucide-react';
import { PageHero } from '@/components/hero/page-hero';
import { SectionReveal } from '@/components/animation/section-reveal';
import { ContactForm } from '@/components/interactive/contact-form';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contact — Request a Platform Evaluation',
  description:
    'Schedule a confidential platform evaluation, request a technical demo, or explore institutional partnership opportunities with OXONN Technologies.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Let's Talk"
        description="Whether you're seeking a partnership, a platform demo, or a private consultation — we're ready to connect."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <SectionReveal className="px-6 py-section">
        <div className="mx-auto max-w-[var(--width-content)]">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px]">
            {/* Form */}
            <ContactForm />

            {/* Contact info sidebar */}
            <div className="space-y-8">
              <div>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-white">Email</p>
                      <a
                        href="mailto:contact@oxonn.com"
                        className="text-caption text-muted transition-colors hover:text-cyan"
                      >
                        contact@oxonn.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-white">Location</p>
                      <p className="text-caption text-muted">
                        Global — distributed team across three continents
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <div>
                      <p className="text-sm font-medium text-white">Response Time</p>
                      <p className="text-caption text-muted">
                        We typically respond within 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ quick links */}
              <div className="rounded-xl border border-border bg-surface p-6">
                <h3 className="mb-3 text-sm font-semibold text-white">
                  Quick Answers
                </h3>
                <div className="space-y-3 text-caption text-muted-foreground">
                  <p>
                    <strong className="text-white">Minimum investment?</strong>
                    <br />
                    Varies by solution. Contact us for details.
                  </p>
                  <p>
                    <strong className="text-white">Platform access?</strong>
                    <br />
                    Available via API and web dashboard.
                  </p>
                  <p>
                    <strong className="text-white">Geographic coverage?</strong>
                    <br />
                    Global multi-asset coverage across all major markets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionReveal>
    </>
  );
}
