'use client';

type EventName =
  | 'page_view'
  | 'service_click'
  | 'contact_submit'
  | 'contact_form_start'
  | 'scroll_depth'
  | 'cta_click'
  | 'blog_read_complete'
  | 'sphere_interaction'
  | 'nav_dropdown_open'
  | 'newsletter_subscribe';

export function trackEvent(name: EventName, properties?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;

  // Vercel Analytics
  if (typeof window.va === 'function') {
    window.va('event', { name, ...properties });
  }

  // Console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${name}`, properties);
  }
}

// Extend Window for Vercel Analytics
declare global {
  interface Window {
    va?: (event: string, properties?: Record<string, unknown>) => void;
  }
}
