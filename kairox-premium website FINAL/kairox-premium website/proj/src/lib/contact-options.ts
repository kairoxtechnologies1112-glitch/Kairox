export const industryOptions = [
  'Professional services',
  'Retail & e-commerce',
  'Hospitality',
  'Healthcare & wellness',
  'Education',
  'Finance',
  'Technology',
  'Real estate',
  'Other',
] as const;

export const budgetOptions = [
  { value: '', label: 'Prefer not to say' },
  { value: 'Under 2,500', label: 'Under 2,500' },
  { value: '2,500–5,000', label: '2,500–5,000' },
  { value: '5,000–10,000', label: '5,000–10,000' },
  { value: '10,000–25,000', label: '10,000–25,000' },
  { value: '25,000+', label: '25,000+' },
  { value: 'To be discussed', label: 'To be discussed' },
] as const;
