import Link from 'next/link';

const FOOTER_LINKS = {
  solutions: [
    { label: 'Alpha Strategies', href: '/solutions/alpha' },
    { label: 'Risk & Hedging', href: '/solutions/risk' },
    { label: 'Private Solutions', href: '/solutions/private' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Insights', href: '/insights' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  connect: [
    { label: 'contact@oxonn.com', href: 'mailto:contact@oxonn.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/oxonn', external: true },
  ],
} as const;

export function Footer() {
  return (
    <footer className="w-full border-t border-[#1F1F1F] bg-[#0A0A0A]">
      <div className="mx-auto max-w-[1280px] px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-block text-lg font-bold tracking-[0.2em] text-white">
              OXONN
            </Link>
            <p className="mt-3 max-w-xs text-[0.875rem] text-[#6B7280]">
              Quantitative excellence at the intersection of science and finance.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Solutions</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.solutions.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.875rem] text-[#9CA3AF] transition-colors duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Company</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.875rem] text-[#9CA3AF] transition-colors duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Legal</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[0.875rem] text-[#9CA3AF] transition-colors duration-200 hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#6B7280]">Connect</h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.connect.map((link) => (
                <li key={link.href}>
                  {'external' in link && link.external ? (
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-[0.875rem] text-[#9CA3AF] transition-colors duration-200 hover:text-white">
                      {link.label}
                    </a>
                  ) : (
                    <a href={link.href} className="text-[0.875rem] text-[#9CA3AF] transition-colors duration-200 hover:text-white">
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Risk disclaimer */}
      <div className="border-t border-[#1F1F1F]">
        <div className="mx-auto max-w-[1280px] px-6 py-4">
          <p className="text-[11px] leading-relaxed text-[#4B5563]">
            All performance metrics, projections, and quantitative results presented on this website are based on backtested or hypothetical data and are provided for informational purposes only. Past performance is not indicative of future results. Investing involves risk, including the possible loss of principal. OXONN Technologies does not guarantee any specific outcome or profit. All strategies should be evaluated independently by qualified professionals before deployment.
          </p>
        </div>
      </div>

      <div className="border-t border-[#1F1F1F]">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-3 px-6 py-6 sm:flex-row sm:justify-between">
          <p className="text-xs text-[#6B7280]">&copy; 2026 OXONN Technologies. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-[#6B7280] transition-colors duration-200 hover:text-white">Privacy</Link>
            <Link href="/terms" className="text-xs text-[#6B7280] transition-colors duration-200 hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
