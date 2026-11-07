export type Service = {
  slug: string;
  number: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  outcomes: string[];
  icon: 'web' | 'leads' | 'whatsapp' | 'automation' | 'software' | 'brand';
};

export const services: Service[] = [
  {
    slug: 'lead-management-systems',
    number: '01',
    title: 'Lead Management Systems',
    eyebrow: 'Every conversation in view',
    summary: 'We build systems that help businesses capture, organize and track customer enquiries from one place.',
    description: 'Keep incoming opportunities organized in one place. We design practical lead workflows that make ownership, status and next steps easier to see. Our systems include lead registration, customer information management, lead status tracking, follow-up scheduling, search and filtering, lead dashboards, and conversion reporting.',
    outcomes: [
      'Lead registration and capture',
      'Customer information management',
      'Lead status tracking and follow-up scheduling',
      'Search, filtering, and lead dashboards',
      'Conversion reporting and pipeline visibility',
    ],
    icon: 'leads',
  },
  {
    slug: 'whatsapp-business-automation',
    number: '02',
    title: 'WhatsApp Business Automation',
    eyebrow: 'Conversations that keep moving',
    summary: 'We implement WhatsApp-based communication workflows to make customer interactions more organized and efficient.',
    description: 'Connect the moments that matter in customer conversations. We shape WhatsApp workflows for timely notifications, booking journeys and follow-up—around your consent and process requirements. Features include automated welcome messages, frequently asked questions, enquiry response workflows, appointment and booking communication, confirmation messages, reminders, and business notifications. We use the official WhatsApp Business Platform or authorized providers for API-based automation.',
    outcomes: [
      'Automated welcome messages and FAQ responses',
      'Enquiry response and booking communication workflows',
      'Confirmation messages and reminders',
      'Business notifications via WhatsApp Business API',
    ],
    icon: 'whatsapp',
  },
  {
    slug: 'business-process-automation',
    number: '03',
    title: 'Business Process Automation',
    eyebrow: 'Less repetition, more momentum',
    summary: 'We automate repetitive business workflows to reduce manual work and improve operational efficiency.',
    description: 'Move routine work through a clear path. We connect business steps and notifications so teams can spend less time on repetition and more time on the work that needs them. Examples include quotation generation, approval workflows, notifications, data entry workflows, document generation, order status updates, and reporting workflows.',
    outcomes: [
      'Quotation generation and approval workflows',
      'Automated notifications and data entry workflows',
      'Document generation and order status updates',
      'Reporting workflows and operational visibility',
    ],
    icon: 'automation',
  },
  {
    slug: 'conversion-focused-websites',
    number: '04',
    title: 'Conversion-Focused Websites',
    eyebrow: 'Your best first impression',
    summary: 'We create professional websites designed to help visitors take meaningful actions.',
    description: 'A useful website should do more than look polished. We create clear, considered digital experiences that explain your value and make the next step feel natural. Features include responsive design, landing pages, enquiry forms, booking forms, WhatsApp contact options, clear calls to action, contact and service information, and analytics integration where required. We never guarantee traffic, sales, leads or conversions.',
    outcomes: [
      'Responsive business websites and landing pages',
      'Enquiry and booking forms with WhatsApp integration',
      'Clear calls to action and contact information',
      'Analytics integration for performance tracking',
    ],
    icon: 'web',
  },
  {
    slug: 'custom-business-software',
    number: '05',
    title: 'Custom Business Software',
    eyebrow: 'Software shaped around you',
    summary: 'We develop business-specific software to simplify internal operations and manage important business activities.',
    description: 'When off-the-shelf tools do not fit the work, a purposeful system can bring the experience together. We build tailored applications around your users and operating model. Examples include inventory management, order management, customer management, quotation systems, internal dashboards, reporting systems, and business workflow applications.',
    outcomes: [
      'Inventory and order management systems',
      'Customer management and quotation systems',
      'Internal dashboards and reporting systems',
      'Business workflow applications tailored to your operations',
    ],
    icon: 'software',
  },
  {
    slug: 'business-content-creative-systems',
    number: '06',
    title: 'Business Content & Creative Systems',
    eyebrow: 'A brand with a point of view',
    summary: 'We help businesses communicate consistently through professional branding and digital creative solutions.',
    description: 'Create a visual language people can recognize and a toolkit your team can actually use. We connect brand identity, creative direction and repeatable content systems. Examples include brand identity, logo design, social media creatives, promotional graphics, short-form promotional videos, and visual communication materials.',
    outcomes: [
      'Brand identity and logo design',
      'Social media creatives and promotional graphics',
      'Short-form promotional videos',
      'Visual communication materials and content systems',
    ],
    icon: 'brand',
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}