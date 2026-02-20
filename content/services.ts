import type { ServiceDetail } from '@/types';

export const services: ServiceDetail[] = [
  {
    id: 'alpha',
    title: 'High Alpha Strategies',
    slug: 'alpha',
    shortTitle: 'Alpha',
    description:
      'Systematic alpha generation through quantitative models and factor-driven investing.',
    longDescription:
      'Our quantitative investment strategies harness advanced statistical models, machine learning, and proprietary factor research to identify and capture persistent market inefficiencies. Every position is systematically sourced, rigorously tested, and dynamically managed — no discretionary overrides, no narrative-driven trades. Pure signal extraction at institutional scale.',
    features: [
      {
        title: 'Factor-Driven Alpha',
        description:
          'Proprietary multi-factor models capturing cross-sectional and time-series anomalies.',
        icon: 'TrendingUp',
      },
      {
        title: 'Systematic Execution',
        description:
          'Fully automated trade lifecycle from signal generation to order routing.',
        icon: 'Cpu',
      },
      {
        title: 'Risk-Adjusted Returns',
        description:
          'Dynamic position sizing and portfolio construction optimized for risk-adjusted performance.',
        icon: 'Shield',
      },
      {
        title: 'Alternative Data',
        description:
          'Integration of non-traditional data sources for differentiated signal generation.',
        icon: 'Database',
      },
      {
        title: 'Multi-Asset Coverage',
        description:
          'Strategies spanning equities, fixed income, commodities, and derivatives.',
        icon: 'Layers',
      },
      {
        title: 'Transparent Reporting',
        description:
          'Institutional-grade attribution analytics and risk decomposition dashboards.',
        icon: 'BarChart3',
      },
    ],
    metrics: [
      {
        label: 'Quantitative Models',
        value: '200+',
        description: 'Active models across all strategies',
      },
      {
        label: 'Data Points Processed',
        value: '50B+',
        suffix: 'daily',
        description: 'Alternative and traditional data ingestion',
      },
      {
        label: 'Research Pipeline',
        value: '1,200+',
        suffix: 'factors tested annually',
      },
      {
        label: 'Strategy Correlation',
        value: '<0.15',
        suffix: 'to benchmarks',
        description: 'Low correlation to traditional market indices',
      },
    ],
    targetAudience:
      'Hedge funds, asset managers, and institutional allocators seeking uncorrelated, systematic alpha generation with full transparency.',
    audienceType: 'institutional',
    cta: {
      type: 'partnership',
      label: 'Explore Partnership',
      prefilledInterest: 'alpha',
    },
    icon: 'TrendingUp',
  },
  {
    id: 'risk',
    title: 'Risk & Hedging',
    slug: 'risk',
    shortTitle: 'Risk',
    description:
      'Institutional-grade risk management and real-time hedging infrastructure for trading desks.',
    longDescription:
      'Purpose-built for brokers, proprietary trading firms, and institutional desks that cannot afford blind spots. Our risk management platform delivers sub-millisecond portfolio analytics, real-time hedging recommendations, and regulatory compliance tooling — all through a single unified API. No latency. No approximations. No excuses.',
    features: [
      {
        title: 'Real-Time Risk Analytics',
        description:
          'Sub-millisecond VaR, CVaR, and stress testing across the full portfolio.',
        icon: 'Activity',
      },
      {
        title: 'Automated Hedging',
        description:
          'Dynamic hedge ratio optimization with real-time Greeks computation.',
        icon: 'Shield',
      },
      {
        title: 'Regulatory Compliance',
        description:
          'Built-in Basel III/IV, FRTB, and margin requirement calculations.',
        icon: 'FileCheck',
      },
      {
        title: 'Scenario Engine',
        description:
          'Monte Carlo simulation and historical stress testing with custom scenarios.',
        icon: 'GitBranch',
      },
      {
        title: 'API-First Architecture',
        description:
          'RESTful and WebSocket APIs for seamless integration with existing systems.',
        icon: 'Code',
      },
      {
        title: 'Portfolio Aggregation',
        description:
          'Cross-asset, cross-entity risk aggregation with real-time P&L attribution.',
        icon: 'Combine',
      },
    ],
    metrics: [
      {
        label: 'Execution Latency',
        value: '<1',
        suffix: 'ms',
        description: 'End-to-end risk calculation latency',
      },
      {
        label: 'System Uptime',
        value: '99.97',
        suffix: '%',
        description: 'Measured over trailing 12 months',
      },
      {
        label: 'Instruments Covered',
        value: '10M+',
        description: 'Equities, derivatives, fixed income, FX',
      },
      {
        label: 'Risk Scenarios',
        value: '50K+',
        suffix: 'per second',
        description: 'Monte Carlo simulation throughput',
      },
    ],
    targetAudience:
      'Brokers, proprietary trading firms, and institutional desks requiring real-time risk infrastructure and hedging technology.',
    audienceType: 'institutional',
    cta: {
      type: 'demo',
      label: 'Request Platform Demo',
      prefilledInterest: 'risk',
    },
    icon: 'Shield',
  },
  {
    id: 'private',
    title: 'On-Demand',
    slug: 'private',
    shortTitle: 'Private',
    description:
      'Bespoke quantitative services for discerning private clients and family offices.',
    longDescription:
      'For those who require precision without compromise. Our On-Demand division serves ultra-high-net-worth individuals and family offices with tailored quantitative solutions — from bespoke portfolio construction and structured product engineering to private fund access and multi-generational wealth preservation. Every engagement is confidential, every solution is singular.',
    features: [
      {
        title: 'Bespoke Portfolio Construction',
        description:
          'Custom-built portfolios aligned to your specific risk tolerance and objectives.',
        icon: 'Gem',
      },
      {
        title: 'Structured Products',
        description:
          'Tailored financial instruments designed for capital preservation and growth.',
        icon: 'Box',
      },
      {
        title: 'Private Fund Access',
        description:
          'Curated access to institutional-grade quantitative strategies.',
        icon: 'Lock',
      },
      {
        title: 'Wealth Preservation',
        description:
          'Multi-generational wealth structuring and downside protection strategies.',
        icon: 'ShieldCheck',
      },
      {
        title: 'Tax-Efficient Engineering',
        description:
          'Quantitative approaches to tax optimization and estate planning.',
        icon: 'Calculator',
      },
      {
        title: 'Dedicated Advisory',
        description:
          'Direct access to senior quantitative strategists for ongoing guidance.',
        icon: 'Users',
      },
    ],
    metrics: [],
    targetAudience:
      'Ultra-high-net-worth individuals, family offices, and private foundations seeking bespoke quantitative financial solutions.',
    audienceType: 'private',
    cta: {
      type: 'consultation',
      label: 'Book Private Consultation',
      prefilledInterest: 'private',
    },
    icon: 'Gem',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
