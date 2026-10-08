// On the House — single bundled script

// ── PROMPTS DATA ──────────────────────────────────────────
const FREE_PROMPT = `You are the General Manager of a boutique restaurant or cafe. Write a warm, professional response to this guest review:

[PASTE REVIEW HERE]

Guidelines:
- Thank them by first name if provided
- Acknowledge specific details they mentioned
- For negative reviews: apologise sincerely, take ownership, offer a resolution
- For positive reviews: celebrate their experience, invite them back
- End with your name and title
- Maximum 80 words`;

const PROMPTS = [
  {cat:'marketing',tag:'SOCIAL MEDIA',title:'Instagram Caption Generator',desc:'Turn any dish or photo into a caption people actually stop and read.',
   prompt:`You are a hospitality copywriter. Write 3 Instagram captions for [PHOTO DESCRIPTION: e.g., 'a golden-hour shot of our terrace'].

Each caption should:
- Open with a sensory hook (taste, smell, feeling — not a question)
- Include one subtle call-to-action
- Use 3–5 relevant hashtags
- Vary in tone: one aspirational, one playful, one intimate

Keep each under 150 words. No hollow openers like "We're thrilled" or "Exciting news".`},
  {cat:'marketing',tag:'SOCIAL MEDIA',title:'Instagram Story Sequence',desc:'A 3-frame story arc that builds engagement and drives action.',
   prompt:`Write a 3-frame Instagram Story sequence for [TOPIC: e.g., 'our new autumn menu'].

Venue: [NAME & TYPE]
Goal: [e.g., 'drive table bookings', 'promote a new product']

For each frame:
- What's shown (visual direction)
- Copy overlay (under 8 words)
- Any interactive element (poll, slider, link)

Make it feel native to Stories — quick, punchy, worth tapping through.`},
  {cat:'marketing',tag:'EMAIL',title:'Monthly Newsletter',desc:'A newsletter that reads like it was written by a person, not a brand.',
   prompt:`Write a hospitality email newsletter for [MONTH]. Our venue: [NAME & TYPE].

Structure:
1. Subject line — 5 options, A/B testable, no clickbait
2. Opening hook — 2 sentences max, one specific detail
3. Hero story: [SEASONAL FEATURE / EVENT / NEW MENU ITEM]
4. Secondary block: behind-the-scenes or team spotlight
5. CTA: [BOOKING LINK / OFFER]
6. Sign-off that sounds human

Tone: warm, editorial, never salesy. 350 words max.`},
  {cat:'marketing',tag:'EMAIL',title:'Win-Back Email',desc:"Re-engage guests who haven't visited in 3+ months.",
   prompt:`Write a re-engagement email for guests who visited [TIME PERIOD] ago.

Venue: [NAME & TYPE]
Tone: [e.g., 'warm and personal', 'light and witty']
Offer (optional): [e.g., 'complimentary pastry on next visit']

Include:
- 3 subject line options (feel personal, not promotional)
- Email body (180 words max)
- One soft CTA

Sound like a note from the owner. Not a template.`},
  {cat:'marketing',tag:'PROMOTIONS',title:'Seasonal Offer Copy',desc:'Promotional copy that sells without feeling like a promotion.',
   prompt:`Create promotional copy for our seasonal offer:

Offer: [e.g., 'Sunday Roast for 2 with wine, £65']
Season/Occasion: [e.g., 'Mother's Day', 'Summer', 'Christmas Eve']
Venue vibe: [e.g., 'neighbourhood cafe', 'lively bar']

Deliver:
- 1 × website headline + subheading
- 1 × social post (under 100 words)
- 1 × SMS/WhatsApp (under 60 words)
- 3 × email subject lines

No "treat yourself". No "perfect gift". Make it feel genuine.`},
  {cat:'marketing',tag:'PROMOTIONS',title:'WhatsApp Broadcast',desc:'A short, effective message for your customer WhatsApp list.',
   prompt:`Write a WhatsApp broadcast message for our customer list.

Venue: [NAME]
Topic: [e.g., 'new menu launch', 'event this Friday']
Tone: [e.g., 'casual and warm', 'urgent but friendly']

Rules:
- Under 60 words
- Sound like it's from a real person, not a business
- End with a clear but soft action

Write 2 versions — one slightly more casual than the other.`},
  {cat:'marketing',tag:'REPUTATION',title:'Google Review Response',desc:'Reply to Google reviews like a seasoned GM in under 80 words.',
   prompt:`You are the General Manager of a boutique restaurant or cafe. Write a warm, professional response to this guest review:

[PASTE REVIEW HERE]

Guidelines:
- Thank them by first name if provided
- Acknowledge specific details they mentioned
- For negative reviews: apologise sincerely, take ownership, offer a resolution
- For positive reviews: celebrate their experience, invite them back
- End with your name and title
- Maximum 80 words`},
  {cat:'marketing',tag:'REPUTATION',title:'TripAdvisor & OTA Response',desc:'Handle every platform, every tone, every situation with composure.',
   prompt:`Write a professional response to this review on [PLATFORM: TripAdvisor / Booking.com]:

Review: [PASTE REVIEW]
Venue: [NAME]

Guidelines:
- Under 100 words
- For negative: empathise first, explain briefly, invite back
- For positive: warm, reference something specific they mentioned
- Sign off with name and role
- Never defensive. Never sycophantic.`},
  {cat:'marketing',tag:'LISTINGS',title:'OTA Listing Optimiser',desc:'Listing copy that converts browsers into bookings.',
   prompt:`Write or rewrite a TripAdvisor / Google / OpenTable listing for our venue.

Name: [NAME]
Type: [e.g., neighbourhood cafe, wine bar, bistro]
Location: [AREA, CITY]
Key highlights: [e.g., 'specialty coffee, natural wines, dog-friendly']
Who it's for: [e.g., 'local regulars, remote workers, weekend brunchers']

Deliver:
- Headline (under 12 words — no adjective soup)
- Short description (150 words) — lead with feeling, not features
- 5 bullet highlights
- Closing line with warmth or urgency`},
  {cat:'marketing',tag:'PRODUCT LABELS',title:'Product Label Copy',desc:'Copy for jars, bags, and bottles that earns its place on the shelf.',
   prompt:`Write copy for a retail product label.

Product: [e.g., 'house granola', 'spiced nuts', 'coffee blend']
Venue: [NAME]
Key ingredients/provenance: [e.g., 'Wildfarmed oats, local honey']
Tone: [e.g., 'warm and neighbourhood', 'dry and confident']

Deliver:
- Front-of-pack line (under 8 words)
- Back-of-pack description (under 40 words — story, not spec sheet)
- Allergen intro line

No "lovingly crafted". No "artisan". Sound real.`},
  {cat:'marketing',tag:'SOCIAL MEDIA',title:'Influencer Outreach',desc:"A message to a local food influencer that doesn't sound desperate.",
   prompt:`Write an outreach message to a local food influencer or blogger.

Venue: [NAME & TYPE]
Their handle/name: [NAME]
Why them specifically: [e.g., 'love their honest neighbourhood content']
What we're offering: [e.g., 'complimentary dinner for two']

Under 100 words. Sound like a genuine invitation from someone who actually follows them. No "synergy". No "collaboration opportunity".`},
  {cat:'operations',tag:'TRAINING',title:'Staff Training SOP',desc:'Turn your standards into a document your team will actually use.',
   prompt:`Write a Standard Operating Procedure for hospitality staff on: [e.g., 'Table greet and seating sequence' / 'Handling a complaint'].

Format:
- Title and purpose (2 sentences)
- Who this applies to
- Step-by-step process (numbered, plain language)
- What good looks like (observable behaviours)
- Common mistakes to avoid
- "Remember this" summary (3 bullets max)

Write for a team where English may be a second language. Simple, direct.`},
  {cat:'operations',tag:'OPERATIONS',title:'Pre-Shift Briefing',desc:'Two minutes that set the tone for the whole service.',
   prompt:`Write a pre-shift briefing for tonight's service.

Date & Meal Period: [e.g., Friday dinner]
Covers: [e.g., 85, including 3 large parties]
Key reservations: [e.g., 'Table 6 — anniversary, want candles']
Specials / 86s: [e.g., 'Sea bass special at £28; 86 on beef']
Focus tonight: [e.g., 'upselling dessert wine, faster turnaround on table 4']
Staff on: [names and roles]

Punchy, energising, under 200 words. End with one line that actually means something.`},
  {cat:'operations',tag:'MENUS',title:'Menu Description Writer',desc:'Dish copy that makes mouths water without sounding like every other menu.',
   prompt:`Write menu descriptions for these dishes. Style: [e.g., 'modern British', 'neighbourhood cafe'].

For each dish:
- Dish name (capitalised)
- 2-sentence description: lead with hero ingredient, then texture/provenance
- Allergen flag line

Dishes:
1. [DISH NAME — key ingredients]
2. [DISH NAME — key ingredients]
3. [DISH NAME — key ingredients]

No "deconstructed". No "drizzle". No "bed of". Evoke appetite.`},
  {cat:'operations',tag:'RECRUITMENT',title:'Job Advert',desc:'Attract the right person by sounding like somewhere they actually want to work.',
   prompt:`Write a job advert for: [ROLE e.g. 'Senior Barista', 'Chef de Partie'].

Venue: [NAME, TYPE, LOCATION]
Salary/benefits: [e.g., '£28k, staff meals, flexible rota']
Culture in 3 words: [e.g., 'ambitious, warm, independent']
Must-have: [e.g., '2+ years specialty coffee']

Structure:
- Punchy opener — why work HERE
- The role in plain English
- What we offer (culture first)
- Who we're looking for
- How to apply

Under 300 words. Sound like someone who loves where they work.`},
  {cat:'operations',tag:'RECRUITMENT',title:'Staff Appraisal Framework',desc:'A structured, fair appraisal template for any team member.',
   prompt:`Create a staff appraisal framework for:

Role: [e.g., 'Barista', 'Floor Supervisor']
Review period: [e.g., '6-month review']
Venue: [NAME & TYPE]

Include:
- Opening (warm, honest tone)
- 5 performance review questions (skills, attitude, team, goals)
- Self-assessment section
- Development goals (3 areas)
- Closing / next steps

Simple language. Should feel like a conversation, not a form.`},
  {cat:'operations',tag:'OPERATIONS',title:'Closing Checklist',desc:"A thorough end-of-day checklist your team will actually complete.",
   prompt:`Write an end-of-day closing checklist for [VENUE TYPE: e.g., café, bar, restaurant].

Areas to cover: [e.g., 'kitchen, front of house, tills, security, opening prep']

Format:
- Organised by area
- Tick-box style (one action per line)
- Clear language — no ambiguity
- Notes field for anything the next shift needs to know

Complete but not overwhelming. Every item genuinely necessary.`},
  {cat:'operations',tag:'OPERATIONS',title:'Supplier Intro Email',desc:'A professional first contact with a new supplier that sets the right tone.',
   prompt:`Write an introductory email to a potential new supplier.

Our venue: [NAME, TYPE, LOCATION]
Supplier type: [e.g., 'specialty coffee roaster', 'natural wine importer']
Why we're interested: [e.g., 'seen your product at X', 'recommended by Y']
What we need: [e.g., 'weekly delivery, minimum order £150, ideally on account']

Under 150 words. Warm but professional. Make clear we're a serious buyer.`},
  {cat:'revenue',tag:'REVENUE',title:'Upsell Script Builder',desc:'Natural upsell lines your team will actually say — and guests will welcome.',
   prompt:`Write natural, non-pushy upsell scripts for our front-of-house team.

Category: [e.g., 'coffee add-ons', 'wine pairing', 'dessert', 'loyalty sign-up']
Venue type: [e.g., neighbourhood cafe, wine bar, bistro]

For each of 4 scenarios:
- The trigger moment (when exactly to say it)
- The opening line (curious, conversational — zero sales energy)
- One feature + benefit for that specific guest
- A soft close

Should sound like a knowledgeable friend recommending something.`},
  {cat:'revenue',tag:'EVENTS',title:'Private Dining Proposal',desc:'Win more events with a proposal that feels written for them.',
   prompt:`Write a private dining or events proposal for this enquiry:

Client: [NAME]
Event type: [e.g., 'birthday dinner', 'corporate lunch']
Guest count: [NUMBER]
Budget: [e.g., '£65pp', 'TBC']
Date: [DATE]
Special requests: [e.g., 'dietary needs, projector, bespoke cocktail']

Include:
- Warm, personal opener referencing their specific event
- What we offer for this occasion
- Menu overview (3 courses, sample dishes)
- What's included (staffing, room, AV)
- Clear next steps with a gentle deadline

Confident, warm, personal. Not a template.`},
  {cat:'revenue',tag:'REVENUE',title:'Loyalty Programme Copy',desc:'Launch or refresh your loyalty programme with copy that makes people want to join.',
   prompt:`Write copy to launch or promote our customer loyalty programme.

Venue: [NAME & TYPE]
Programme name (if any): [e.g., 'The Regulars', or leave blank]
How it works: [e.g., 'stamp card — 9 coffees, 10th free']
Key benefit: [e.g., 'free coffee', 'birthday treat', 'early access to events']

Deliver:
- Programme name suggestion (if none given)
- In-venue poster headline + 2-line description
- Social post announcing it (under 80 words)
- In-app or stamp-card tagline (under 10 words)`},
  {cat:'revenue',tag:'CRM',title:'Guest Retention Email',desc:'The email that brings people back without feeling like a marketing blast.',
   prompt:`Write a retention email for: [SEGMENT e.g., 'guests who visited 3+ months ago'].

Goal: [e.g., 'rebook a table' / 'introduce new menu' / 'say thank you']
Offer (optional): [e.g., 'complimentary amuse-bouche on next visit']

Deliver:
- 3 subject line options (feel personal, not promotional)
- Email body (200 words max)
- CTA button label

Feel like a note from the owner. Not a template.`},
  {cat:'revenue',tag:'LISTINGS',title:'Gift Voucher Page Copy',desc:'Copy for your gift voucher page that actually converts.',
   prompt:`Write copy for our gift voucher / experience page.

Venue: [NAME & TYPE]
Voucher types: [e.g., '£25/£50/£100 monetary', 'afternoon tea for 2']
Key occasions: [e.g., 'birthdays, Christmas, anniversaries']

Deliver:
- Page headline + subheading
- Short intro (60 words max)
- Description for each voucher type (2 sentences each)
- Closing line with warmth or urgency

No "perfect gift". No "treat someone special".`},
  {cat:'revenue',tag:'EVENTS',title:'Event Announcement Copy',desc:'Build excitement and fill seats for any event.',
   prompt:`Write an event announcement for:

Event: [NAME & DESCRIPTION e.g., 'Natural wine dinner, 5 courses with João Pires']
Date/time: [DATE & TIME]
Price: [e.g., '£65pp including wine pairings']
Capacity: [e.g., 'Limited to 20 guests']
How to book: [e.g., 'Reply to this email / link below']

Deliver:
- Email subject line (3 options)
- Email body (200 words — lead with atmosphere, not logistics)
- Short social caption (under 100 words)
- SMS version (under 60 words)`},
  {cat:'guest',tag:'PRE-ARRIVAL',title:'Pre-Arrival Welcome Email',desc:"The email that makes guests feel expected before they've walked in.",
   prompt:`Write a pre-arrival email for an upcoming booking.

Venue: [NAME & TYPE]
Guest name: [NAME]
Booking: [e.g., 'Table for 2, Saturday 7:30pm']
Special occasion: [e.g., 'birthday' / 'none noted']
Info to include: [e.g., 'parking, what to expect from the menu']

Deliver:
- Subject line
- Email body (under 180 words)

Tone: like a message from a friend who's genuinely looking forward to seeing them.`},
  {cat:'guest',tag:'TOUCHPOINTS',title:'Printed Collateral Copy',desc:'Table cards, takeaway notes, loyalty stamps — the small words that land.',
   prompt:`Write copy for printed hospitality collateral.

Type: [e.g., 'table card introducing our coffee supplier', 'takeaway bag insert', 'loyalty stamp note']
Venue: [NAME]
Tone: [e.g., 'warm and neighbourhood', 'dry and witty', 'craft and minimal']
Word limit: [e.g., 40 words max]
Specific message: [e.g., 'introduce our Yirgacheffe from a co-op in Ethiopia']

Make it feel worth reading. Short. Specific. Human.`},
  {cat:'guest',tag:'RETENTION',title:'Post-Visit Follow-Up',desc:'The message that turns a one-time visitor into someone who comes back.',
   prompt:`Write a post-visit thank you for a recent guest.

Venue: [NAME]
Visit type: [e.g., 'weekend brunch', 'private event', 'first visit']
Anything notable: [e.g., 'celebrating something', 'long-standing regulars']
Goal: [e.g., 'encourage a Google review', 'invite them back']

Deliver:
- Subject line (2 options)
- Message body (120 words max)
- One gentle CTA

Sound human. Sound grateful. Sound like you noticed them.`},
  {cat:'guest',tag:'COMMS',title:'FAQ Response Set',desc:'On-brand answers to the questions you answer twelve times a day.',
   prompt:`Write on-brand FAQ responses for our venue.

Venue: [NAME & TYPE]
Tone: [e.g., 'warm and informal', 'dry and witty', 'quietly professional']

Write answers to:
1. "Do you have parking nearby?"
2. "Are you dog-friendly?"
3. "Do you have oat milk / dairy-free options?"
4. "Can I book a table?"
5. "Do you do takeaway?"
6. "What are your opening hours?"
7. "Do you have Wi-Fi?"

Each answer: 1–3 sentences. Sound like a real person who likes their job.`},
  {cat:'guest',tag:'COMMS',title:'Complaint Response Template',desc:'A measured, warm response to a complaint that protects the relationship.',
   prompt:`Write a response to a guest complaint received via [CHANNEL: email / social DM / review].

Complaint: [DESCRIBE THE ISSUE e.g., 'long wait time', 'cold food', 'felt ignored']
Context: [e.g., 'unusually busy Saturday', 'we've since retrained the team']

Include:
- Genuine acknowledgement (not defensive)
- Brief honest explanation (if relevant)
- What we're doing about it
- A gesture if appropriate: [e.g., 'invitation back with complimentary X']
- Warm close

Under 120 words. Sound like a person, not a policy document.`},
  {cat:'guest',tag:'PRE-ARRIVAL',title:'Group Booking Confirmation',desc:'A warm, thorough confirmation for large or special group bookings.',
   prompt:`Write a confirmation email for a group booking.

Venue: [NAME & TYPE]
Organiser: [NAME]
Group size: [NUMBER]
Date/time: [DATE & TIME]
Occasion: [e.g., 'birthday dinner', 'team lunch']
Agreed details: [e.g., 'set menu at £45pp, one vegetarian, arrival drinks']

Include:
- Warm opener confirming the booking
- Summary of what's agreed
- Anything they need to know beforehand
- Contact details for changes
- A line that builds excitement

Under 200 words. Professional but genuinely warm.`},
  {cat:'guest',tag:'TOUCHPOINTS',title:'Welcome Card — New Regular',desc:'A handwritten-feel note to welcome someone becoming a familiar face.',
   prompt:`Write a short welcome note for a guest who's becoming a regular.

Venue: [NAME]
Guest name (if known): [NAME / or "you"]
Something specific (if known): [e.g., 'always orders the cortado', 'comes in every Tuesday']
Tone: [e.g., 'warm and neighbourly', 'dry and witty']

Under 50 words. Handwritten-feel. Should make them smile, not feel like a CRM campaign.`}
];

const CAT_COLORS = {marketing:'#C4622D',operations:'#2A6741',revenue:'#4A3F8A',guest:'#1A5F7A'};
const VOICE_TEXT = `"You are a hospitality copywriter working for [VENUE NAME], a [VENUE TYPE] in [LOCATION]. Our tone is [3 ADJECTIVES — e.g. 'warm, direct, unpretentious']. We would never sound [3 WORDS TO AVOID — e.g. 'corporate, salesy, generic']. Always write like a real person. Never use the words 'cosy', 'vibrant', or 'nestled'."`;

// ── STATE ─────────────────────────────────────────────────
const params = new URLSearchParams(window.location.search);
let unlocked = sessionStorage.getItem('oth_unlocked') === '1' || params.get('ref') === 'vouched';
if (params.get('ref') === 'vouched') sessionStorage.setItem('oth_unlocked', '1');
let currentFilter = 'all';
let currentIdx = null;

// ── UTILS ─────────────────────────────────────────────────
function copyText(text, btn, label = 'COPY') {
  navigator.clipboard.writeText(text);
  const orig = btn.textContent;
  btn.textContent = '✓ COPIED';
  btn.classList.add('copied');
  setTimeout(() => { btn.textContent = orig; btn.classList.remove('copied'); }, 2200);
}

function lockScroll()   { document.body.style.overflow = 'hidden'; }
function unlockScroll() { document.body.style.overflow = ''; }

// ── GATE ──────────────────────────────────────────────────
function showGate() {
  if (unlocked) return;
  document.getElementById('gate')?.classList.add('is-open');
  lockScroll();
  setTimeout(() => document.getElementById('gate-email')?.focus(), 300);
}

function hideGate() {
  document.getElementById('gate')?.classList.remove('is-open');
  unlockScroll();
}

function submitGate() {
  const emailEl = document.getElementById('gate-email');
  const email   = (emailEl?.value || '').trim();
  const venue   = (document.getElementById('gate-venue')?.value || '').trim();

  if (!email || !email.includes('@')) {
    emailEl?.classList.add('is-error');
    emailEl?.focus();
    return;
  }

  const qs = new URLSearchParams({ email, ref: 'on-the-house', ...(venue && { venue }) });
  window.location.href = `https://imvouched.co.uk/app.html?${qs.toString()}`;
}

// ── RENDER PROMPTS ────────────────────────────────────────
function renderPrompts(filter) {
  currentFilter = filter;
  const grid = document.getElementById('pgrid');
  const lbl  = document.getElementById('grid-label');
  if (!grid) return;

  const list = filter === 'all' ? PROMPTS : PROMPTS.filter(p => p.cat === filter);
  if (lbl) lbl.textContent = list.length + ' MORE PROMPTS — FREE WITH VOUCHED';

  if (!unlocked) {
    grid.innerHTML = list.map(p => `
      <div class="pcard--locked" role="button" aria-label="Sign up to unlock">
        <div class="pcard--locked__inner">
          <span class="pcard__tag" style="color:${CAT_COLORS[p.cat]}">${p.tag}</span>
          <div class="pcard__title">${p.title}</div>
          <p class="pcard__desc">${p.desc}</p>
        </div>
        <div class="pcard--locked__overlay">
          <div class="pcard--locked__icon">🔒</div>
          <div class="pcard--locked__text">FREE VIA VOUCHED</div>
        </div>
      </div>`).join('');
    grid.querySelectorAll('.pcard--locked').forEach(c => c.addEventListener('click', showGate));
  } else {
    grid.innerHTML = list.map((p, i) => {
      const idx = PROMPTS.indexOf(p);
      return `<div class="pcard" data-idx="${idx}" tabindex="0" role="button">
        <span class="pcard__tag" style="color:${CAT_COLORS[p.cat]}">${p.tag}</span>
        <div class="pcard__title">${p.title}</div>
        <p class="pcard__desc">${p.desc}</p>
        <span class="pcard__arrow">VIEW & COPY PROMPT →</span>
      </div>`;
    }).join('');
    grid.querySelectorAll('.pcard').forEach(c => {
      c.addEventListener('click', () => openModal(parseInt(c.dataset.idx)));
      c.addEventListener('keydown', e => { if (e.key === 'Enter') openModal(parseInt(c.dataset.idx)); });
    });
  }
}

// ── MODAL ─────────────────────────────────────────────────
function openModal(idx) {
  if (!unlocked) { showGate(); return; }
  currentIdx = idx;
  const p = PROMPTS[idx];
  document.getElementById('modal-cat').textContent    = p.cat.toUpperCase() + ' / ' + p.tag;
  document.getElementById('modal-title').textContent  = p.title;
  document.getElementById('modal-prompt').textContent = p.prompt;
  const cb = document.getElementById('modal-copy-btn');
  if (cb) { cb.textContent = 'COPY PROMPT'; cb.classList.remove('copied'); }
  document.getElementById('modal')?.classList.add('is-open');
  lockScroll();
}

function closeModal() {
  document.getElementById('modal')?.classList.remove('is-open');
  unlockScroll();
}

// ── NUDGE ─────────────────────────────────────────────────
function hideNudge() {
  const n = document.getElementById('nudge');
  if (n) { n.style.opacity = '0'; n.style.maxHeight = '0'; n.style.overflow = 'hidden'; n.style.marginBottom = '0'; n.style.padding = '0'; }
  const lbl = document.getElementById('grid-label');
  if (lbl) lbl.textContent = PROMPTS.filter(p => currentFilter === 'all' || p.cat === currentFilter).length + ' MORE PROMPTS';
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Free prompt text
  const fpt = document.getElementById('free-prompt-text');
  if (fpt) fpt.textContent = FREE_PROMPT;

  // Free copy btn
  document.getElementById('free-copy-btn')?.addEventListener('click', function() {
    copyText(FREE_PROMPT, this);
  });

  // Voice copy btn
  document.getElementById('voice-copy-btn')?.addEventListener('click', function() {
    copyText(VOICE_TEXT, this);
  });

  // Gate submit
  document.getElementById('gate-submit')?.addEventListener('click', submitGate);

  // Gate close
  document.getElementById('gate-close')?.addEventListener('click', hideGate);

  // Gate backdrop
  document.getElementById('gate')?.addEventListener('click', e => {
    if (e.target === document.getElementById('gate')) hideGate();
  });

  // Gate inputs — Enter key
  ['gate-name','gate-email','gate-venue'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => { if (e.key === 'Enter') submitGate(); });
  });

  // Modal close
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });

  // Modal copy
  document.getElementById('modal-copy-btn')?.addEventListener('click', function() {
    if (currentIdx !== null) copyText(PROMPTS[currentIdx].prompt, this);
  });

  // Cat filter pills
  document.querySelectorAll('.cat-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      renderPrompts(pill.dataset.cat);
    });
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { hideGate(); closeModal(); }
  });

  // ALL data-gate triggers — capture phase so it fires before any link navigation
  document.addEventListener('click', e => {
    if (e.target.closest('[data-gate]')) {
      e.preventDefault();
      e.stopImmediatePropagation();
      showGate();
    }
  }, true);

  // If already unlocked
  if (unlocked) hideNudge();

  // Initial render
  renderPrompts('all');
});
