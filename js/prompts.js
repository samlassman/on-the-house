export const FREE_PROMPT = {
  tag: 'REPUTATION',
  title: 'Google Review Response',
  desc: 'Reply to any review — positive or negative — like a seasoned GM. Under 80 words, every time.',
  prompt: `You are the General Manager of a boutique restaurant or cafe. Write a warm, professional response to this guest review:

[PASTE REVIEW HERE]

Guidelines:
- Thank them by first name if provided
- Acknowledge specific details they mentioned
- For negative reviews: apologise sincerely, take ownership, offer a resolution
- For positive reviews: celebrate their experience, invite them back
- End with your name and title
- Maximum 80 words`
};

export const PROMPTS = [
  // ── MARKETING & SOCIAL ──────────────────────────────────
  {
    cat: 'marketing',
    tag: 'SOCIAL MEDIA',
    title: 'Instagram Caption Generator',
    desc: 'Turn any dish or photo into a caption people actually stop and read.',
    prompt: `You are a hospitality copywriter. Write 3 Instagram captions for [PHOTO DESCRIPTION: e.g., 'a golden-hour shot of our terrace with wine glasses'].

Each caption should:
- Open with a sensory hook (taste, smell, feeling — not a question)
- Include one subtle call-to-action
- Use 3–5 relevant hashtags
- Vary in tone: one aspirational, one playful, one intimate

Keep each under 150 words. No hollow openers like "We're thrilled" or "Exciting news".`
  },
  {
    cat: 'marketing',
    tag: 'EMAIL',
    title: 'Monthly Newsletter',
    desc: 'A newsletter that reads like it was written by a person, not a brand.',
    prompt: `Write a hospitality email newsletter for [MONTH]. Our venue: [NAME & TYPE e.g. 'The Larder, a 40-seat neighbourhood bistro'].

Structure:
1. Subject line — 5 options, A/B testable, no clickbait
2. Opening hook — 2 sentences max, one specific detail
3. Hero story: [SEASONAL FEATURE / EVENT / NEW MENU ITEM]
4. Secondary block: a behind-the-scenes moment or team spotlight
5. CTA: [BOOKING LINK / OFFER]
6. Sign-off that sounds human

Tone: warm, editorial, never salesy. 350 words max. No "we're passionate about" or "exciting journey".`
  },
  {
    cat: 'marketing',
    tag: 'PROMOTIONS',
    title: 'Seasonal Offer Copy',
    desc: 'Promotional copy that sells without feeling like a promotion.',
    prompt: `Create promotional copy for our seasonal offer:

Offer: [e.g., 'Sunday Roast for 2 with a bottle of wine, £65']
Season/Occasion: [e.g., 'Mother's Day', 'Summer', 'Christmas Eve']
Venue vibe: [e.g., 'neighbourhood cafe', 'lively wine bar', 'family bistro']

Deliver:
- 1 × website hero headline + one-sentence subheading
- 1 × social post (under 100 words, no hashtags)
- 1 × SMS/WhatsApp message (under 60 words)
- 3 × email subject line options

No "treat yourself". No "perfect gift for". Make it feel specific and genuine.`
  },
  {
    cat: 'marketing',
    tag: 'REPUTATION',
    title: 'TripAdvisor & OTA Response',
    desc: 'Handle every platform, every tone, every situation with the same composure.',
    prompt: `Write a professional response to this review posted on [PLATFORM e.g. TripAdvisor / Booking.com]:

Review: [PASTE REVIEW]
Venue name: [NAME]

Guidelines:
- Acknowledge the platform and tailor the tone accordingly
- Under 100 words
- For negative: empathise genuinely first, explain briefly, invite back specifically
- For positive: be warm and reference something specific they mentioned
- Sign off with your name and role
- Never be defensive. Never be sycophantic.`
  },
  {
    cat: 'marketing',
    tag: 'PRODUCT LABELS',
    title: 'Product Label Copy',
    desc: 'Copy for retail products — jars, bags, bottles — that earns its place on the shelf.',
    prompt: `Write copy for a retail product label. Product: [e.g., 'house granola', 'spiced nuts', 'hot sauce', 'house coffee blend'].

Venue: [NAME]
Product name: [NAME]
Key ingredients or provenance: [e.g., 'rolled oats, Wildfarmed flour, local honey']
Tone: [e.g., 'warm and neighbourhood', 'dry and confident', 'craft and minimal']

Deliver:
- Front-of-pack line (under 8 words — the punchy bit)
- Short description for back of pack (under 40 words — story, not spec sheet)
- Ingredients note intro (one line, if needed)
- Allergen flag line

No "lovingly crafted". No "artisan". Make it feel like something a real person made.`
  },

  // ── OPERATIONS & TEAMS ──────────────────────────────────
  {
    cat: 'operations',
    tag: 'TRAINING',
    title: 'Staff Training SOP',
    desc: 'Turn your standards into a document your team will actually read and use.',
    prompt: `Write a Standard Operating Procedure for hospitality staff on: [e.g., 'Table greet and seating sequence' / 'Handling a complaint at the table' / 'Closing checklist'].

Format:
- Title and purpose (2 sentences)
- Who this applies to
- Step-by-step process (numbered, plain language — no jargon)
- What good looks like (observable behaviours a manager could check)
- Common mistakes to avoid
- Quick "remember this" summary (3 bullets max)

Write for a team where English may be a second language. Simple, direct, zero condescension.`
  },
  {
    cat: 'operations',
    tag: 'OPERATIONS',
    title: 'Pre-Shift Briefing',
    desc: 'Two minutes that set the tone for the whole service.',
    prompt: `Write a pre-shift briefing for tonight's service.

Date & Meal Period: [e.g., Friday dinner]
Covers booked: [e.g., 85, including 3 large parties]
Key reservations: [e.g., 'Table 6 — anniversary, want candles', 'Table 12 — VIP regular']
Specials / 86s: [e.g., 'Sea bass special at £28; we're 86 on the beef']
Focus for tonight: [e.g., 'upselling dessert wine, turning table 4 area faster']
Staff on: [names and roles]

Punchy, energising, under 200 words. End with one sentence that means it. Not a cliché.`
  },
  {
    cat: 'operations',
    tag: 'MENUS',
    title: 'Menu Description Writer',
    desc: 'Dish copy that makes mouths water without sounding like every other menu.',
    prompt: `Write menu descriptions for these dishes. Style: [e.g., 'modern British', 'neighbourhood cafe', 'natural wine bar small plates'].

For each dish provide:
- Dish name (capitalised, concise)
- 2-sentence description: lead with the hero ingredient or technique, then texture/provenance/contrast
- Allergen flag line (V/VE/GF as appropriate)

Dishes:
1. [DISH NAME — key ingredients]
2. [DISH NAME — key ingredients]
3. [DISH NAME — key ingredients]

No "deconstructed". No "drizzle". No "bed of". No "melt-in-the-mouth". Evoke appetite, not a food magazine.`
  },
  {
    cat: 'operations',
    tag: 'RECRUITMENT',
    title: 'Job Advert',
    desc: 'Attract the right person by sounding like somewhere they actually want to work.',
    prompt: `Write a job advert for: [ROLE e.g. 'Senior Barista', 'Cafe Supervisor', 'Chef de Partie'].

Venue: [NAME, TYPE, LOCATION]
Salary/benefits: [e.g., '£28k, staff meals, flexible rota, monthly team socials']
Culture in 3 words: [e.g., 'ambitious, warm, independent']
Must-have experience: [e.g., '2+ years specialty coffee, confident on espresso and batch brew']

Structure:
- Punchy opener — why work HERE, specifically
- What the role actually involves (plain English)
- What we offer (lead with culture and people, not just salary)
- Who we're looking for (skills + the kind of person)
- How to apply

Under 300 words. Sound like a person who loves where they work wrote it.`
  },

  // ── REVENUE & GROWTH ────────────────────────────────────
  {
    cat: 'revenue',
    tag: 'REVENUE',
    title: 'Upsell Script Builder',
    desc: 'Natural upsell lines your team will actually say — and guests will actually welcome.',
    prompt: `Write natural, non-pushy upsell scripts for our front-of-house team.

Category: [e.g., 'coffee add-ons', 'wine pairing with food', 'dessert', 'retail products at till', 'loyalty scheme sign-up']
Venue type: [e.g., neighbourhood cafe, wine bar, bistro, neighbourhood restaurant]

For each of 4 scenarios provide:
- The trigger moment (when exactly to say it)
- The opening line (curious, conversational — zero sales energy)
- One feature + the benefit to that specific guest
- A soft close that doesn't feel like a close

These should sound like a knowledgeable friend recommending something they'd order themselves.`
  },
  {
    cat: 'revenue',
    tag: 'EVENTS',
    title: 'Private Dining Proposal',
    desc: 'Win more events with a proposal that feels written for them, not templated.',
    prompt: `Write a private dining or events proposal for this enquiry:

Client name: [NAME]
Event type: [e.g., 'birthday dinner', 'corporate lunch', 'wedding rehearsal dinner']
Guest count: [NUMBER]
Budget indication: [e.g., '£65pp', 'TBC', 'flexible']
Preferred date: [DATE]
Special requests noted: [e.g., 'dietary requirements, projector needed, bespoke cocktail on arrival']

Include:
- A warm, personal opener that references their specific event
- What we offer for this type of occasion
- Menu overview (placeholder structure — 3 courses, sample dishes)
- What's included in the hire (staffing, room, AV, etc.)
- Clear next steps with a gentle deadline

Tone: confident, warm, and genuinely personal. It should feel like one specific person wrote it for one specific event.`
  },
  {
    cat: 'revenue',
    tag: 'CRM',
    title: 'Guest Retention Email',
    desc: 'The email that brings people back without feeling like a marketing blast.',
    prompt: `Write a retention email targeting: [SEGMENT e.g., 'guests who visited 3+ months ago' / 'our top 50 regulars' / 'people who booked a table but haven't been back'].

Goal: [e.g., 'rebook a table' / 'introduce a new menu' / 'say thank you with no agenda']
Offer (optional): [e.g., 'complimentary amuse-bouche on next visit' / 'priority booking before we open the diary']

Deliver:
- 3 subject line options (no clickbait — these should feel personal)
- Email body (200 words max)
- CTA button label

Make it feel like a note from the owner. Not a MailChimp template with the name field filled in.`
  },
  {
    cat: 'revenue',
    tag: 'LISTINGS',
    title: 'OTA Listing Optimiser',
    desc: 'The listing copy that converts people browsing into people booking.',
    prompt: `Write or rewrite a TripAdvisor / Google / OpenTable / Booking.com listing for our venue.

Venue name: [NAME]
Type: [e.g., neighbourhood cafe, natural wine bar, neighbourhood bistro]
Location: [AREA, CITY]
Key highlights: [e.g., 'specialty coffee, natural wines, dog-friendly, all produce from named local suppliers']
Who it's for: [e.g., 'local regulars, people working from laptops, weekend brunchers, food-curious visitors']

Deliver:
- Headline (under 12 words — no adjective soup)
- Short description (150 words) — lead with the feeling of being there, not a feature list
- 5 bullet highlights (one sentence each, specific)
- Closing line that creates warmth or a reason to book now`
  },

  // ── GUEST EXPERIENCE ────────────────────────────────────
  {
    cat: 'guest',
    tag: 'PRE-ARRIVAL',
    title: 'Pre-Arrival Welcome',
    desc: 'The email that makes guests feel expected before they've walked through the door.',
    prompt: `Write a pre-arrival email for an upcoming guest booking.

Venue: [NAME & TYPE]
Guest name: [NAME]
Booking details: [e.g., 'Table for 2, Saturday 7:30pm' / 'Brunch for 4, Sunday 11am']
Special occasion: [e.g., 'birthday' / 'anniversary' / 'nothing noted']
Useful info to include: [e.g., 'nearest tube, parking, dress code, what to expect from the menu']

Deliver:
- Subject line
- Email body (under 180 words)

Tone: like a message from a friend who's genuinely looking forward to seeing you. Not a booking confirmation robot.`
  },
  {
    cat: 'guest',
    tag: 'TOUCHPOINTS',
    title: 'Printed Collateral Copy',
    desc: 'Table cards, takeaway notes, loyalty stamps — the small words that make the big impression.',
    prompt: `Write copy for printed hospitality collateral.

Type: [e.g., 'table card introducing our coffee supplier', 'takeaway bag insert', 'loyalty card stamp note', 'welcome card inside a gift box', 'front of a seasonal menu']
Venue name: [NAME]
Brand tone: [e.g., 'warm and neighbourhood', 'dry and witty', 'craft and minimal', 'quietly confident']
Word limit: [e.g., 40 words max / 60 words max]
Specific message or story: [e.g., 'introduce the provenance of our single origin — a Yirgacheffe from a co-op in Ethiopia']

Make it feel designed to be read, not ignored. Short. Specific. Human.`
  },
  {
    cat: 'guest',
    tag: 'RETENTION',
    title: 'Post-Visit Follow-Up',
    desc: 'The message that turns a one-time visitor into someone who comes back.',
    prompt: `Write a post-visit thank you message for a recent guest.

Venue: [NAME]
Visit type: [e.g., 'weekend brunch', 'dinner for two', 'private event', 'first visit']
Anything notable about their visit: [e.g., 'mentioned it was their first time', 'celebrating something', 'ordered the tasting menu', 'long-standing regulars']
Goal: [e.g., 'encourage a Google review', 'invite them back with a specific reason', 'soft-sell an upcoming event']

Deliver:
- Subject line (2 options)
- Message body (120 words max)
- One gentle CTA — not a hard sell

Sound human. Sound grateful. Sound like you actually noticed them — because you did.`
  },
  {
    cat: 'guest',
    tag: 'COMMS',
    title: 'FAQ Response Set',
    desc: 'On-brand answers to the questions you answer twelve times a day.',
    prompt: `Write on-brand FAQ responses for our venue.

Venue: [NAME & TYPE]
Tone: [e.g., 'warm and informal', 'dry and witty', 'quietly professional']

Write answers to:
1. "Do you have parking nearby?"
2. "Are you dog-friendly?"
3. "Do you have oat milk / dairy-free options?"
4. "Can I book a table / do you take walk-ins?"
5. "Do you do takeaway / click and collect?"
6. "What are your opening hours?"
7. "Do you have Wi-Fi?"

Each answer: 1–3 sentences. Sound like a real person who likes their job. Add a redirect to phone or email where relevant. No corporate warmth.`
  }
];

// Category colour map
export const CAT_COLORS = {
  marketing:  'var(--cat-marketing)',
  operations: 'var(--cat-operations)',
  revenue:    'var(--cat-revenue)',
  guest:      'var(--cat-guest)'
};
