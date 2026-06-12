export const beautyTourismTreatments = [
  { id: 'botox', name: 'Botox (Full Face)', duration: 30, georgiaGel: 450, comparisonEur: 400 },
  { id: 'filler', name: 'Lip Filler (1ml)', duration: 45, georgiaGel: 380, comparisonEur: 500 },
  { id: 'lashes', name: 'Russian Volume Lashes', duration: 90, georgiaGel: 180, comparisonEur: 180 },
  { id: 'facial', name: 'HydraFacial', duration: 60, georgiaGel: 280, comparisonEur: 250 },
  { id: 'hair', name: 'Balayage + Treatment', duration: 180, georgiaGel: 420, comparisonEur: 400 },
  { id: 'nails', name: 'Russian Manicure', duration: 60, georgiaGel: 80, comparisonEur: 70 },
];

export const whyGeorgia = [
  'World-class aesthetic care at Georgian prices',
  'Visa-free entry up to 365 days for many travelers',
  'Batumi airport is 15 minutes from the salon',
  'English, Georgian, Russian, Hebrew, Arabic, and Turkish support',
];

export const logistics = {
  airports: [
    { name: 'Batumi International (BUS)', distance: '15 min', code: 'BUS' },
    { name: 'Tbilisi International (TBS)', distance: '5h train', code: 'TBS' },
  ],
  hotels: [
    { name: 'Hilton Batumi', distance: '2 min walk', rating: 4.8 },
    { name: 'Radisson Blu', distance: '5 min walk', rating: 4.6 },
    { name: 'Marriott Batumi', distance: '8 min walk', rating: 4.7 },
  ],
  visa: [
    { region: 'US, Canada, UK, EU', duration: '365 days' },
    { region: 'Israel, Turkey, UAE', duration: '365 days' },
    { region: 'Russia, Ukraine, Belarus', duration: '365 days' },
    { region: 'Australia, NZ, Japan, Korea', duration: '365 days' },
  ],
};

export const internationalStories = [
  {
    author: 'Sarah M.',
    countryName: 'United Kingdom',
    text: 'Saved over GBP200 on my Botox treatment. The clinic is spotless and the staff speaks perfect English.',
    treatment: 'Botox',
    rating: 5,
  },
  {
    author: 'Hans G.',
    countryName: 'Germany',
    text: 'Excellent quality at half the German price. Will definitely return for my next treatment.',
    treatment: 'HydraFacial',
    rating: 5,
  },
  {
    author: 'Ayse T.',
    countryName: 'Turkey',
    text: 'Batumi is only 2 hours from Istanbul. Perfect weekend beauty trip.',
    treatment: 'Balayage',
    rating: 5,
  },
];
