/**
 * analytics.js
 * Single source of truth for all GA4 event tracking.
 * Add new events here — never call gtag() directly in components.
 */

const gtag = (...args) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
};

/**
 * Fired when a user clicks an affiliate link to Amazon.
 * @param {Object} params
 * @param {string} params.productId    - e.g. 'nokta-simplex-lite'
 * @param {string} params.productName  - e.g. 'Nokta Simplex+ Lite'
 * @param {string} params.category     - e.g. 'metal-detectors'
 * @param {string} params.location     - 'cta_button' | 'sidebar_button' | 'card'
 * @param {string} params.url          - the amzn.to short link
 */
export const trackAffiliateClick = ({ productId, productName, category, location, url }) => {
  gtag('event', 'affiliate_click', {
    product_id:   productId,
    product_name: productName,
    category:     category,
    click_location: location,
    affiliate_url:  url,
  });
};

/**
 * Fired on page view — called automatically by GA4 config,
 * but use this for manual SPA route changes if needed.
 */
export const trackPageView = (path) => {
  gtag('event', 'page_view', { page_path: path });
};
