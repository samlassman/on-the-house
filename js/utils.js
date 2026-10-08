/**
 * Copy text to clipboard and toggle a button's state
 * @param {string} text
 * @param {HTMLElement} btn
 * @param {string} [copiedLabel='COPIED']
 * @param {string} [originalLabel]
 */
export function copyToClipboard(text, btn, copiedLabel = 'COPIED', originalLabel) {
  const orig = originalLabel || btn.textContent;
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = copiedLabel;
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = orig;
      btn.classList.remove('copied');
    }, 2200);
  });
}

/**
 * Validate an email address (basic)
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

/**
 * Lock body scroll
 */
export function lockScroll() {
  document.body.style.overflow = 'hidden';
}

/**
 * Unlock body scroll
 */
export function unlockScroll() {
  document.body.style.overflow = '';
}

/**
 * Simple event delegation helper
 * @param {HTMLElement} parent
 * @param {string} selector
 * @param {string} event
 * @param {Function} handler
 */
export function delegate(parent, selector, event, handler) {
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) handler(e, target);
  });
}
