export type NavLink = {
  label: string;
  href: string;
};

export type CallToAction = NavLink;

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type Category = {
  number: string;
  title: string;
  description: string;
  href: string;
};

export type Step = {
  label: string;
  title: string;
  description: string;
  icon: "focus" | "experience" | "practice";
};

export type Stat = {
  value: string;
  label: string;
};

export type CollagePhoto = {
  src: string;
  alt: string;
  desktop: { w: number; h: number };
  mobile: { w: number; h: number };
};

export type CollageColumn = {
  photos: CollagePhoto[];
  offset?: { desktop: number; mobile: number };
  align?: "start" | "end" | "center";
};

export type ContactChannel = {
  label: string;
  value: string;
  href?: string;
  icon: "chat" | "clock";
};

export type FormFieldCopy = {
  label: string;
  placeholder: string;
};

export type FooterColumn = {
  title: string;
  links: NavLink[];
};

export type SiteContent = {
  brand: { name: string; tagline: string };
  nav: NavLink[];
  headerActions: { login: CallToAction; primary: CallToAction };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCta: CallToAction;
    secondaryCta: CallToAction;
    trust: { strong: string; rest: string; avatars: ImageAsset[] };
    image: ImageAsset;
    coursesBadge: { value: string; label: string };
    ratingBadge: { label: string; stars: number };
  };
  categories: {
    eyebrow: string;
    title: string;
    description: string;
    linkLabel: string;
    items: Category[];
  };
  featuredCourse: {
    badge: string;
    eyebrow: string;
    title: string;
    description: string;
    instructor: string;
    meta: string[];
    image: ImageAsset;
    primaryCta: CallToAction;
    secondaryCta: CallToAction;
  };
  howItWorks: {
    eyebrow: string;
    title: string;
    steps: Step[];
  };
  testimonial: {
    quote: string;
    author: { name: string; role: string; avatar: ImageAsset };
    stats: Stat[];
  };
  people: {
    eyebrow: string;
    title: string;
    description: string;
    cta: CallToAction;
    columns: CollageColumn[];
  };
  contact: {
    eyebrow: string;
    title: string;
    description: string;
    channels: ContactChannel[];
    form: {
      title: string;
      description: string;
      name: FormFieldCopy;
      email: FormFieldCopy;
      message: FormFieldCopy;
      submit: string;
      submitting: string;
      success: { title: string; description: string; reset: string };
    };
  };
  finalCta: {
    title: string;
    description: string;
    primaryCta: CallToAction;
    secondaryCta: CallToAction;
    avatars: ImageAsset[];
  };
  footer: {
    columns: FooterColumn[];
    copyright: string;
  };
};
