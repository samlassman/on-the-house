import { isValidEmail, lockScroll, unlockScroll } from './utils.js';

// Unlocked if returning from Vouched with ref param
const params = new URLSearchParams(window.location.search);
let unlocked = sessionStorage.getItem('oth_unlocked') === '1' || params.get('ref') === 'vouched';
if (params.get('ref') === 'vouched') sessionStorage.setItem('oth_unlocked', '1');

export function isUnlocked() { return unlocked; }

export function showGate() {
  if (unlocked) return;
  document.getElementById('gate')?.classList.add('is-open');
  lockScroll();
  setTimeout(() => document.getElementById('gate-email')?.focus(), 300);
}

export function hideGate() {
  document.getElementById('gate')?.classList.remove('is-open');
  unlockScroll();
}

export function submitGate() {
  const emailEl = document.getElementById('gate-email');
  const email   = emailEl?.value.trim() || '';
  const venue   = document.getElementById('gate-venue')?.value.trim() || '';

  if (!isValidEmail(email)) {
    emailEl?.classList.add('is-error');
    emailEl?.focus();
    return;
  }

  const qs = new URLSearchParams({ email, ref: 'on-the-house', ...(venue && { venue }) });
  window.location.href = `https://imvouched.co.uk/app.html?${qs.toString()}`;
}

export function initGate(onUnlock) {
  const gate = document.getElementById('gate');
  if (!gate) return;

  if (unlocked) onUnlock?.();

  // Backdrop close
  gate.addEventListener('click', e => { if (e.target === gate) hideGate(); });

  // Close button
  document.getElementById('gate-close')?.addEventListener('click', hideGate);

  // Submit
  document.getElementById('gate-submit')?.addEventListener('click', submitGate);

  // Enter key in inputs
  ['gate-name', 'gate-email', 'gate-venue'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitGate();
    });
  });

  // Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && gate.classList.contains('is-open')) hideGate();
  });

  // Event delegation on document — catches ALL data-gate clicks reliably
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-gate]');
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      showGate();
    }
  }, true); // capture phase — fires before default navigation
}
