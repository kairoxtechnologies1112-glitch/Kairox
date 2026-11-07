export const companyName = 'KAIROX Technologies';
export const companyDescriptor = 'We don\'t just build digital products. We solve business problems through technology.';

export const siteDescription =
  'KAIROX Technologies helps businesses improve their digital presence, streamline operations and build practical technology solutions. We combine web development, business software, workflow automation and digital experiences to help businesses operate more efficiently and serve their customers better.';

export const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, '');

export function absoluteUrl(path: string): string | undefined {
  if (!publicOrigin) return undefined;
  return `${publicOrigin}${path.startsWith('/') ? path : `/${path}`}`;
}

// Centralized contact configuration
export const contactConfig = {
  email: 'kairoxtechnologies1112@gmail.com',
  phones: [
    {
      label: 'Primary',
      number: '+91 79723 57578',
      digitsOnly: '917972357578',
      whatsappEnabled: false, // Set to true when confirmed active on WhatsApp
    },
    {
      label: 'Secondary',
      number: '+91 90218 50826',
      digitsOnly: '919021850826',
      whatsappEnabled: false, // Set to true when confirmed active on WhatsApp
    },
  ],
  // Social media URLs - add when available
  social: {
    linkedin: '',
    twitter: '',
    github: '',
  },
} as const;

// Founder configuration
export const founders = [
  {
    number: '01',
    name: 'Kunal Patil',
    role: 'Founder',
    bio: 'I focus on understanding business challenges and turning them into meaningful digital opportunities. From building client relationships and defining project requirements to shaping business strategy, I work to ensure every solution we deliver creates real value for the businesses we serve.',
    photo: '/images/founder-kunal-patil.jpg',
    responsibilities: [
      'Business strategy',
      'Client acquisition',
      'Business development',
      'Client meetings and communication',
      'Requirement gathering',
      'Project coordination',
      'Proposals and commercial discussions',
    ],
  },
  {
    number: '02',
    name: 'Mayuresh Edki',
    role: 'Co-Founder',
    bio: 'I lead the technical side of our work, transforming ideas and business requirements into practical digital solutions. From development and technical planning to implementation and quality, I focus on building reliable, effective systems that solve real-world problems.',
    photo: '/images/founder-mayuresh-edki.jpg',
    responsibilities: [
      'Technical planning',
      'Software development',
      'Backend and frontend implementation',
      'Integrations',
      'Testing and quality assurance',
      'Deployment',
      'Technical maintenance',
    ],
  },
] as const;

export const processSteps = [
  { number: '01', title: 'Discovery', detail: 'We listen first: your goals, customers, constraints and what success should feel like.' },
  { number: '02', title: 'Strategy', detail: 'We map the right solution, its priorities and a clear path from idea to impact.' },
  { number: '03', title: 'Design', detail: 'We shape an intuitive, distinctive experience around your brand and your people.' },
  { number: '04', title: 'Development', detail: 'We build the system with care, clarity and the right technology for the job.' },
  { number: '05', title: 'Testing', detail: 'We check the details, edge cases and real-device experience before launch.' },
  { number: '06', title: 'Launch', detail: 'We make the switch with a considered handover and a steady launch plan.' },
  { number: '07', title: 'Support', detail: 'We stay available to help your digital system keep moving forward.' },
] as const;
