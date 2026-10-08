import { initGate, isUnlocked } from './gate.js';
import {
  initFreePrompt,
  renderPrompts,
  initCatFilter,
  initModal,
  initVoiceBox,
  hideNudge
} from './toolkit.js';

function onUnlock() {
  hideNudge();
  renderPrompts();
}

document.addEventListener('DOMContentLoaded', () => {
  // Gate
  initGate(onUnlock);

  // Free prompt (always visible)
  initFreePrompt();

  // Prompt grid
  renderPrompts('all');

  // Category filter pills
  initCatFilter();

  // Prompt modal
  initModal();

  // Voice box copy
  initVoiceBox();

  // If already unlocked from a previous session
  if (isUnlocked()) {
    hideNudge();
  }
});
