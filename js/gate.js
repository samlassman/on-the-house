import { isValidEmail, lockScroll, unlockScroll } from './utils.js';

// Gate state — unlocked if they came back from Vouched with the param
const params = new URLSearchParams(window.location.search);
let unlocked = sessionStorage.getItem('oth_unlocked') === '1' || params.get('ref') === 'vouched';

if (params.get('ref') === 'vouched') {
  sessionStorage.setItem('oth_unlocked', '1');
}

export function isUnlocked() { return unlocked; }

export function showGate() {
  if (unlocked) return;
  const gate = document.getElementById('gate');
  gate.classList.add('is-open');
  lockScroll();
  setTimeout(() => document.getElementById('gate-email')?.focus(), 320);
}

export function hideGate() {
  const gate = document.getElementById('gate');
  gate.classList.remove('is-open');
  unlockScroll();
}

export function submitGate() {
  const emailEl = document.getElementById('gate-email');
  const email   = emailEl?.value.trim() || '';
  const venue   = document.getElementById('gate-venue')?.value.trim() || '';

  if (!isValidEmail(email)) {
    emailEl.classList.add('is-error');
    emailEl.focus();
    return;
  }

  // Build Vouched sign-up URL with email pre-filled and ref param
  const params = new URLSearchParams({
    email,
    ref: 'on-the-house',
    ...(venue && { venue })
  });

  // Redirect to Vouched sign-up
  window.location.href = `https://imvouched.co.uk/app.html?${params.toString()}`;
}

export function initGate(onUnlock) {
  const gate = document.getElementById('gate');
  if (!gate) return;

  // If already unlocked on load
  if (unlocked) onUnlock?.();

  // Close on backdrop
  gate.addEventListener('click', e => { if (e.target === gate) hideGate(); });

  // Close button
  document.getElementById('gate-close')?.addEventListener('click', hideGate);

  // Submit
  document.getElementById('gate-submit')?.addEventListener('click', submitGate);

  // Enter key
  ['gate-name', 'gate-email', 'gate-venue'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') submitGate();
    });
  });

  // All data-gate triggers
  document.querySelectorAll('[data-gate]').forEach(el => {
    el.addEventListener('click', e => { e.preventDefault(); showGate(); });
  });

  // Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && gate.classList.contains('is-open')) hideGate();
  });
}
