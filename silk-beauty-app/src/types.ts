export type Locale = 'en' | 'ka' | 'ru' | 'he' | 'ar' | 'tr';

export type LocalizedText = Record<Locale, string>;

export interface SelectOption {
  label: string;
  value: string;
}

export type RootTabParamList = {
  Home: undefined;
  TreatmentsTab: undefined;
  Conditions: undefined;
  Team: undefined;
  International: undefined;
  More: undefined;
  Booking: undefined;
};

export type TreatmentsStackParamList = {
  Treatments: undefined;
  TreatmentDetail: { treatmentId: string };
};
