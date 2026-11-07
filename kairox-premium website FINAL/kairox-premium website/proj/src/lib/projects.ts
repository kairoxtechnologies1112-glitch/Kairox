export type DemoProject = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  services: string[];
  label: 'Demo Project' | 'Concept Project';
};

export const demoProjects: DemoProject[] = [
  {
    slug: 'restaurant-website',
    number: '01',
    title: 'Restaurant Website',
    category: 'Hospitality',
    summary: 'A warm, modern dining experience with an easy-to-explore menu and reservation enquiry.',
    description: 'A fictional restaurant concept demonstrating a digital menu, food categories, restaurant information, a reservation enquiry preview and a configurable WhatsApp contact action.',
    services: ['Conversion-Focused Websites', 'Business Content & Creative Systems', 'WhatsApp Business Automation'],
    label: 'Demo Project',
  },
  {
    slug: 'lead-management-system',
    number: '02',
    title: 'Lead Management System',
    category: 'Business Operations',
    summary: 'A sample CRM view that brings people, pipeline status and next steps into focus.',
    description: 'An interactive CRM dashboard demonstration using fictional sample records. Search, filter, review follow-up dates and change lead status; its sample analytics are not business results.',
    services: ['Lead Management Systems', 'Custom Business Software', 'Business Process Automation'],
    label: 'Demo Project',
  },
  {
    slug: 'appointment-management-system',
    number: '03',
    title: 'Appointment Management System',
    category: 'Scheduling',
    summary: 'A simple booking flow paired with an illustrative scheduling dashboard.',
    description: 'An appointment booking demonstration with date and time selection, sample customer details and an admin dashboard. The preview does not create or confirm a real appointment.',
    services: ['Custom Business Software', 'Conversion-Focused Websites', 'Business Process Automation'],
    label: 'Demo Project',
  },
  {
    slug: 'business-automation-system',
    number: '04',
    title: 'Business Automation System',
    category: 'Automation',
    summary: 'A visible path from first customer enquiry to an updated follow-up status.',
    description: 'An interactive workflow simulation showing how a customer enquiry could move through a business process. It is not connected to real customer data, tools or notifications.',
    services: ['Business Process Automation', 'Lead Management Systems', 'WhatsApp Business Automation'],
    label: 'Demo Project',
  },
];

export function getDemoProject(slug: string) {
  return demoProjects.find((project) => project.slug === slug);
}