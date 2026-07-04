/** True during react-snap / headless prerender (Puppeteer). */
export function isPrerender() {
  return typeof navigator !== "undefined" && navigator.webdriver === true;
}
