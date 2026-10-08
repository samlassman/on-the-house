import { isValidEmail, lockScroll, unlockScroll } from './utils.js';

// ── CONFIG ────────────────────────────────────────────────
// When you're ready to connect Shopify, fill these in:
// 1. Go to Shopify Admin → Settings → Apps and Sales Channels → Develop Apps
// 2. Create an app, give it write_customers scope
// 3. Paste your store URL and Storefront API token below
// 4. Remove the SHOPIFY_ENABLED = false line

const SHOPIFY_ENABLED   = false; // flip to true when ready
const SHOPIFY_STORE_URL = 'YOUR_STORE.myshopify.com';
const SHOPIFY_API_TOKEN = 'YOUR_STOREFRONT_API_TOKEN';
const SHOPIFY_TAG       = 'on-the-house';

// ── GATE STATE ────────────────────────────────────────────
let unlocked = sessionStorage.getItem('oth_unlocked') === '1';

export function isUnlocked() { return unlocked; }

// ── SHOW / HIDE ───────────────────────────────────────────
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

// ── SUBMIT ────────────────────────────────────────────────
export async function submitGate(onSuccess) {
  const emailEl  = document.getElementById('gate-email');
  const nameEl   = document.getElementById('gate-name');
  const venueEl  = document.getElementById('gate-venue');
  const submitEl = document.getElementById('gate-submit');

  const email = emailEl?.value.trim() || '';
  const name  = nameEl?.value.trim()  || '';
  const venue = venueEl?.value.trim() || '';

  // Validate
  if (!isValidEmail(email)) {
    emailEl.classList.add('is-error');
    emailEl.focus();
    emailEl.placeholder = 'Please enter a valid email';
    return;
  }
  emailEl.classList.remove('is-error');

  // Loading state
  if (submitEl) {
    submitEl.textContent = 'SENDING...';
    submitEl.disabled = true;
  }

  try {
    if (SHOPIFY_ENABLED) {
      await addToShopify({ email, name, venue });
    }
    // Regardless of Shopify, unlock
    unlock(onSuccess);
  } catch (err) {
    console.error('Shopify signup error:', err);
    // Still unlock — don't block the user because of an API error
    unlock(onSuccess);
  } finally {
    if (submitEl) {
      submitEl.textContent = 'GET FREE ACCESS →';
      submitEl.disabled = false;
    }
  }
}

function unlock(onSuccess) {
  unlocked = true;
  sessionStorage.setItem('oth_unlocked', '1');
  hideGate();
  onSuccess?.();
}

// ── SHOPIFY API ───────────────────────────────────────────
async function addToShopify({ email, name, venue }) {
  const [firstName, ...rest] = name.split(' ');
  const lastName = rest.join(' ');

  const mutation = `
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id email }
        userErrors { field message }
      }
    }
  `;

  const variables = {
    input: {
      email,
      firstName: firstName || '',
      lastName:  lastName  || '',
      tags:      [SHOPIFY_TAG, venue ? `venue:${venue}` : ''].filter(Boolean),
      acceptsMarketing: true
    }
  };

  const res = await fetch(`https://${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type':              'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_API_TOKEN
    },
    body: JSON.stringify({ query: mutation, variables })
  });

  if (!res.ok) throw new Error(`Shopify API ${res.status}`);
  const data = await res.json();
  const errors = data?.data?.customerCreate?.userErrors;
  if (errors?.length) {
    // Email already exists is fine — they're already in the system
    const alreadyExists = errors.some(e => e.message?.toLowerCase().includes('already'));
    if (!alreadyExists) throw new Error(errors[0].message);
  }
}

// ── INIT ──────────────────────────────────────────────────
export function initGate(onUnlock) {
  // Gate modal
  const gate = document.getElementById('gate');
  if (!gate) return;

  // Close on backdrop click
  gate.addEventListener('click', (e) => {
    if (e.target === gate) hideGate();
  });

  // Close button
  document.getElementById('gate-close')?.addEventListener('click', hideGate);

  // Submit button
  document.getElementById('gate-submit')?.addEventListener('click', () => {
    submitGate(onUnlock);
  });

  // Enter key in inputs
  ['gate-name', 'gate-email', 'gate-venue'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') submitGate(onUnlock);
    });
  });

  // All "get access" triggers
  document.querySelectorAll('[data-gate]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showGate();
    });
  });

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && gate.classList.contains('is-open')) hideGate();
  });
}
