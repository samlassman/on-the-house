import { PROMPTS, FREE_PROMPT, CAT_COLORS } from './prompts.js';
import { copyToClipboard, lockScroll, unlockScroll } from './utils.js';
import { isUnlocked, showGate } from './gate.js';

let currentFilter = 'all';
let currentPromptIdx = null;

// ── FREE PROMPT ────────────────────────────────────────────
export function initFreePrompt() {
  // Render the prompt text into the code box
  const box = document.getElementById('free-prompt-text');
  if (box) box.textContent = FREE_PROMPT.prompt;

  // Copy button
  const copyBtn = document.getElementById('free-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      copyToClipboard(FREE_PROMPT.prompt, copyBtn, '✓ COPIED', 'COPY PROMPT');
    });
  }
}

// ── PROMPT GRID ────────────────────────────────────────────
export function renderPrompts(filter = currentFilter) {
  currentFilter = filter;
  const grid = document.getElementById('pgrid');
  if (!grid) return;

  const list = filter === 'all'
    ? PROMPTS
    : PROMPTS.filter(p => p.cat === filter);

  if (isUnlocked()) {
    grid.innerHTML = list.map((p, i) => {
      const idx = PROMPTS.indexOf(p);
      return `
        <div class="pcard" data-idx="${idx}" tabindex="0" role="button" aria-label="View prompt: ${p.title}">
          <span class="pcard__tag" style="color:${CAT_COLORS[p.cat]}">${p.tag}</span>
          <div class="pcard__title">${p.title}</div>
          <p class="pcard__desc">${p.desc}</p>
          <span class="pcard__arrow">VIEW & COPY PROMPT →</span>
        </div>`;
    }).join('');

    // Attach click handlers
    grid.querySelectorAll('.pcard').forEach(card => {
      const open = () => openModal(parseInt(card.dataset.idx, 10));
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });

  } else {
    // Locked / blurred state
    grid.innerHTML = list.map(p => `
      <div class="pcard--locked" role="button" aria-label="Sign up to unlock: ${p.title}">
        <div class="pcard--locked__inner">
          <span class="pcard__tag" style="color:${CAT_COLORS[p.cat]}">${p.tag}</span>
          <div class="pcard__title">${p.title}</div>
          <p class="pcard__desc">${p.desc}</p>
        </div>
        <div class="pcard--locked__overlay" aria-hidden="true">
          <div class="pcard--locked__icon">🔒</div>
          <div class="pcard--locked__text">FREE — LEAVE YOUR EMAIL</div>
        </div>
      </div>`).join('');

    grid.querySelectorAll('.pcard--locked').forEach(card => {
      card.addEventListener('click', showGate);
    });
  }
}

// ── CATEGORY FILTER ────────────────────────────────────────
export function initCatFilter() {
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      renderPrompts(pill.dataset.cat);
    });
  });
}

// ── MODAL ──────────────────────────────────────────────────
function openModal(idx) {
  if (!isUnlocked()) { showGate(); return; }
  currentPromptIdx = idx;
  const p = PROMPTS[idx];
  const modal = document.getElementById('modal');

  document.getElementById('modal-cat').textContent   = p.cat.toUpperCase() + ' / ' + p.tag;
  document.getElementById('modal-title').textContent  = p.title;
  document.getElementById('modal-prompt').textContent = p.prompt;

  const copyBtn = document.getElementById('modal-copy-btn');
  if (copyBtn) {
    copyBtn.textContent = 'COPY PROMPT';
    copyBtn.classList.remove('copied');
  }

  modal.classList.add('is-open');
  lockScroll();
}

export function closeModal() {
  document.getElementById('modal')?.classList.remove('is-open');
  unlockScroll();
}

export function initModal() {
  const modal   = document.getElementById('modal');
  const closeEl = document.getElementById('modal-close');
  const copyBtn = document.getElementById('modal-copy-btn');

  modal?.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  closeEl?.addEventListener('click', closeModal);

  copyBtn?.addEventListener('click', () => {
    if (currentPromptIdx === null) return;
    copyToClipboard(PROMPTS[currentPromptIdx].prompt, copyBtn, '✓ COPIED', 'COPY PROMPT');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal?.classList.contains('is-open')) closeModal();
  });
}

// ── VOICE BOX COPY ─────────────────────────────────────────
export function initVoiceBox() {
  const btn = document.getElementById('voice-copy-btn');
  const VOICE_TEXT = `"You are a hospitality copywriter working for [VENUE NAME], a [VENUE TYPE] in [LOCATION]. Our tone is [3 ADJECTIVES — e.g. 'warm, direct, and unpretentious']. We would never sound [3 WORDS TO AVOID — e.g. 'corporate, salesy, generic']. Always write like a real person. Never use the words 'cosy', 'vibrant', or 'nestled'."`;
  if (btn) {
    btn.addEventListener('click', () => {
      copyToClipboard(VOICE_TEXT, btn, '✓ COPIED', 'COPY BRAND VOICE STARTER');
    });
  }
}

// ── NUDGE BAR ──────────────────────────────────────────────
export function hideNudge() {
  const nudge = document.getElementById('nudge');
  if (nudge) {
    nudge.style.transition = 'opacity 0.4s ease, max-height 0.4s ease';
    nudge.style.opacity = '0';
    nudge.style.maxHeight = '0';
    nudge.style.overflow = 'hidden';
    nudge.style.marginBottom = '0';
    nudge.style.padding = '0';
  }
  const lbl = document.getElementById('grid-label');
  if (lbl) lbl.textContent = '15 MORE PROMPTS';
}
