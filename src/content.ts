// Every fact, number and sentence on this site.
// The portfolio-work and portfolio-story repos carry their own copy of `person` and `facts`:
// when one of those values changes, change it there too.
// Strings may contain <b>…</b> for emphasis; nothing else.

export const person = {
  name: 'Shubhraj Bhartiya',
  first: 'Shubhraj',
  last: 'Bhartiya',
  email: 'shubhrajbhartiya@gmail.com',
  linkedin: 'https://www.linkedin.com/in/shubhraj-bhartiya-2745531b4/',
  github: 'https://github.com/shubhraj5575',
};

// Numbers used in the copy below.
export const facts = {
  supaPRs: 8,
  supaLines: '13,000',
  supaDates: '8–10 Oct 2026',
  factoryPRs: 82,
  greenplatePrize: '₹30,000',
  greenplateUrl: 'https://greenplate-website.vercel.app',
  searchRepo: 'https://github.com/shubhraj5575/hybrid-search-kpi-system',
  jee: 'Top 3%',
  classX: '89.4%',
  classXII: '86.6%',
  gpa: '7.52',
};

// Live addresses of the three versions, each its own repo and site.
// A link to another version is shown only while its address is filled in.
export const sites = {
  work: 'https://shubhraj5575.github.io/portfolio-work/',
  story: 'https://shubhraj5575.github.io/portfolio-story/',
  hire: 'https://shubhraj5575.github.io/portfolio-hire/',
};

/* ───────── clients ─────────
   Order: what I build, three shipped cases with outcomes, process, proof, contact. */

export type Card = { big: string; small: string };
export type HireSection = { id: string; nav?: string; kicker: string; title: string; body: string; cards?: Card[]; cta?: { label: string; href: string } };

export const hire: HireSection[] = [
  {
    id: 'top', nav: 'Home', kicker: 'AI assistants · Automation · Internal tools',
    title: 'Put the office work on autopilot',
    body: 'I build AI assistants, CRMs and automations that take real work off a team’s plate. Below: what I build, and three things already running.',
    cta: { label: 'See the work', href: '#whatsapp' },
  },
  {
    id: 'build', nav: 'Services', kicker: 'What I build',
    title: 'Four kinds of work',
    body: 'Each one replaces something a person on your team does by hand today.',
    cards: [
      { big: 'Chat', small: 'AI assistants on WhatsApp for your team and customers' },
      { big: 'CRM', small: 'Systems that read documents and keep the ledgers' },
      { big: 'Access', small: 'Logins, roles and approvals for internal apps' },
      { big: 'Reports', small: 'Briefings and dashboards that write themselves' },
    ],
  },
  {
    id: 'whatsapp', nav: 'WhatsApp', kicker: 'Case 1 · Built at ONE Group',
    title: 'An AI office inside WhatsApp groups',
    body: 'The team already lived in WhatsApp groups, so the assistant moved in. A team member approves it, it speaks only when tagged, and each group gets its own office, playbook and skills.',
    cards: [
      { big: 'Approved', small: 'a team member lets it into each group' },
      { big: 'Tagged', small: 'it speaks only when someone asks' },
      { big: 'Its own', small: 'office, playbook and skills for every group' },
    ],
  },
  {
    id: 'crm', nav: 'CRM', kicker: 'Case 2 · Built at ONE Group',
    title: 'A CRM that reads its own paperwork',
    body: 'Booking forms and customer PDFs go in; filled records come out. The same system keeps demand and receipt ledgers and writes the letters.',
    cards: [
      { big: 'PDFs', small: 'read straight into customer records' },
      { big: 'Ledgers', small: 'demands, receipts and late interest' },
      { big: 'Letters', small: 'filled from templates, ready to send' },
    ],
  },
  {
    id: 'briefing', nav: 'Briefing', kicker: 'Case 3 · Built for ONE Group',
    title: 'A newsletter that writes itself by 7 AM',
    body: 'One model researches, a second writes. A branded email goes out every morning with no one touching it, and an alert fires if anything fails.',
    cards: [
      { big: '18', small: 'articles read every day' },
      { big: '5', small: 'markets covered' },
      { big: '7 AM', small: 'in the inbox, daily' },
    ],
  },
  {
    id: 'process', nav: 'Process', kicker: 'How I work',
    title: 'Four steps, each one checked',
    body: 'You see the screens before anything is built, and click through a prototype before it is real.',
    cards: [
      { big: '1', small: 'Wireframes of the journey' },
      { big: '2', small: 'A prototype you can click' },
      { big: '3', small: 'Architecture, decided once' },
      { big: '4', small: 'Build, with tests at every gate' },
    ],
  },
  {
    id: 'proof', nav: 'Proof', kicker: 'Why me',
    title: 'Judged by people who say no for a living',
    body: 'Full-time at ONE Group, founder of GreenPlate, engineer from Delhi Technological University.',
    cards: [
      { big: '#1', small: 'National rank, B-Plan DTU' },
      { big: facts.greenplatePrize, small: 'won for GreenPlate at E-Cell DTU × Titan Capital' },
      { big: facts.jee, small: 'JEE Mains and Advanced 2022' },
    ],
  },
  {
    id: 'contact', kicker: 'Start',
    title: 'Tell me what eats your team’s week',
    body: 'One email with the task that annoys you most is enough to begin.',
    cta: { label: 'Email me', href: `mailto:${person.email}` },
  },
];
