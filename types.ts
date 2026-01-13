export interface FormField {
  name: string;
  type: 'text' | 'textarea' | 'tel';
}

export interface PrincipleItem {
  icon: string;
  title: string;
  description: string;
}

export interface LandingData {
  brand: {
    name: string;
    style: string;
    logoUrl: string;
  };
  designSystem: {
    colors: {
      background: string;
      textPrimary: string;
      textSecondary: string;
      border: string;
    };
    typography: {
      font: string;
      weights: number[];
    };
    icons: {
      style: string;
      size: string;
      color: string;
      usage: string;
    };
  };
  header: {
    logo: string;
    cta: {
      text: string;
      style: string;
    };
  };
  hero: {
    headline: string;
    subheadline: string;
    meta: string;
  };
  principles: {
    items: PrincipleItem[];
    layout: string;
    iconPosition: string;
  };
  offer: {
    title: string;
    items: string[];
  };
  contact: {
    title: string;
    fields: FormField[];
    submit: {
      text: string;
      style: string;
    };
  };
  footer: {
    text: string;
  };
}