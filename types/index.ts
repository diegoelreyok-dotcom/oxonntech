// ============================================
// OXONN TECHNOLOGIES — Type Definitions
// ============================================

// --- Blog / Insights ---

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  category: BlogCategory;
  tags: string[];
  featuredImage: ImageAsset;
  author: {
    ref: string;
    name: string;
    avatar: string;
  };
  seoMeta: SEOMeta;
  publishDate: string;
  updatedDate?: string;
  status: 'draft' | 'published' | 'archived';
  readingTime: number;
  tableOfContents: TOCItem[];
}

export type BlogCategory =
  | 'quantitative-research'
  | 'risk-management'
  | 'market-analysis'
  | 'technology'
  | 'company-updates';

export const BLOG_CATEGORY_LABELS: Record<BlogCategory, string> = {
  'quantitative-research': 'Quantitative Research',
  'risk-management': 'Risk Management',
  'market-analysis': 'Market Analysis',
  'technology': 'Technology',
  'company-updates': 'Company Updates',
};

export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

// --- Team ---

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: TeamDepartment;
  bio: string;
  image: ImageAsset;
  linkedIn?: string;
  order: number;
  isLeadership: boolean;
}

export type TeamDepartment =
  | 'leadership'
  | 'quantitative-research'
  | 'technology'
  | 'operations'
  | 'client-relations';

// --- Services ---

export interface ServiceDetail {
  id: string;
  title: string;
  slug: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  features: ServiceFeature[];
  metrics: ServiceMetric[];
  targetAudience: string;
  audienceType: AudienceType;
  cta: {
    type: 'demo' | 'consultation' | 'partnership';
    label: string;
    prefilledInterest: ServiceInterest;
  };
  icon: string;
  accentColor?: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ServiceMetric {
  label: string;
  value: string;
  suffix?: string;
  description?: string;
}

export type AudienceType = 'institutional' | 'private' | 'fintech';

// --- Partners ---

export interface Partner {
  id: string;
  name: string;
  logo: ImageAsset;
  tier: PartnerTier;
  url?: string;
  order: number;
}

export type PartnerTier = 'strategic' | 'technology' | 'institutional';

// --- Contact ---

export interface ContactSubmission {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  message: string;
  company?: string;
  role?: string;
  phone?: string;
  serviceInterest: ServiceInterest;
  inquiryType: InquiryType;
  source: string;
  utmParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
  status: 'new' | 'contacted' | 'qualified' | 'closed';
}

export type ServiceInterest =
  | 'alpha'
  | 'risk'
  | 'private'
  | 'technology'
  | 'partnership'
  | 'general';

export type InquiryType = 'demo' | 'consultation' | 'partnership' | 'general';

export const SERVICE_INTEREST_LABELS: Record<ServiceInterest, string> = {
  alpha: 'High Alpha Strategies',
  risk: 'Risk & Hedging',
  private: 'On-Demand (Private)',
  technology: 'Technology',
  partnership: 'Partnership',
  general: 'General Inquiry',
};

// --- Newsletter ---

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  status: 'active' | 'unsubscribed';
}

// --- Shared ---

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface SEOMeta {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  icon?: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
