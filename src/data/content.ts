import type { SiteContent } from "@/types/content";

const avatar = (n: 1 | 2 | 3 | 4, alt: string) => ({
  src: `/images/avatar-${n}.jpg`,
  alt,
  width: 80,
  height: 80,
});

const avatars = [
  avatar(1, "Smiling learner with curly hair"),
  avatar(2, "Learner with a beard"),
  avatar(3, "Learner in a suit"),
  avatar(4, "Smiling learner with dark hair"),
];

export const content: SiteContent = {
  brand: {
    name: "Luma",
    tagline: "Practical learning for curious people.",
  },

  nav: [
    { label: "Courses", href: "#categories" },
    { label: "For Teams", href: "#contact" },
    { label: "Community", href: "#people" },
    { label: "About", href: "#how-it-works" },
  ],

  headerActions: {
    login: { label: "Log in", href: "#" },
    primary: { label: "Start learning", href: "#categories" },
  },

  hero: {
    eyebrow: "Learn at your own pace",
    title: "Build skills that actually move you forward.",
    description:
      "Practical courses taught by people who do the work every day. Learn design, technology, business and more — one focused lesson at a time.",
    primaryCta: { label: "Explore courses", href: "#categories" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    trust: {
      strong: "Trusted by 24,000+",
      rest: "learners",
      avatars: avatars.slice(0, 3),
    },
    image: {
      src: "/images/hero.jpg",
      alt: "Smiling woman with glasses and a denim jacket learning at her laptop",
      width: 900,
      height: 1100,
    },
    coursesBadge: { value: "120+", label: "expert-led courses" },
    ratingBadge: { label: "4.9 avg rating", stars: 5 },
  },

  categories: {
    eyebrow: "Find your next skill",
    title: "Learn something worth knowing.",
    description:
      "Short, practical courses designed around skills you can put to work immediately.",
    linkLabel: "Explore",
    items: [
      {
        number: "01",
        title: "Product Design",
        description: "Turn complex problems into clear, useful experiences.",
        href: "#",
      },
      {
        number: "02",
        title: "Technology",
        description: "Build a stronger understanding of the tools shaping digital products.",
        href: "#",
      },
      {
        number: "03",
        title: "Business",
        description: "Develop practical skills for better decisions and stronger teams.",
        href: "#",
      },
      {
        number: "04",
        title: "Creative",
        description: "Explore new ways to communicate, create and tell stories.",
        href: "#",
      },
    ],
  },

  featuredCourse: {
    badge: "Featured Course",
    eyebrow: "Most popular this month",
    title: "Designing products people understand.",
    description:
      "Learn how to turn complex workflows into simple, intentional product experiences through research, structure and thoughtful interaction design.",
    instructor: "with Maya Chen · Senior Product Designer",
    meta: ["8 lessons", "2h 40min", "Intermediate"],
    image: {
      src: "/images/featured-course.jpg",
      alt: "Product design student working on physical prototypes and interface sketches at a desk",
      width: 700,
      height: 500,
    },
    primaryCta: { label: "View course", href: "#" },
    secondaryCta: { label: "Browse all courses", href: "#categories" },
  },

  howItWorks: {
    eyebrow: "How Luma works",
    title: "Less browsing. More learning.",
    steps: [
      {
        // Figma desktop labels all three steps "STEP 01"; numbered 01/02/03 here (see README).
        label: "Step 01",
        title: "Choose your focus",
        description:
          "Find courses based on the skill you want to build, not endless content categories.",
        icon: "focus",
      },
      {
        label: "Step 02",
        title: "Learn from experience",
        description: "Follow concise lessons created by professionals who use these skills.",
        icon: "experience",
      },
      {
        label: "Step 03",
        title: "Put it into practice",
        description:
          "Every course includes practical exercises designed to turn knowledge into action.",
        icon: "practice",
      },
    ],
  },

  testimonial: {
    quote:
      "The lessons are short enough to fit into my week, but detailed enough that I actually leave with something I can use.",
    author: {
      name: "Alex Morgan",
      role: "Product Manager",
      avatar: {
        src: "/images/testimonial-alex-morgan.jpg",
        alt: "Alex Morgan",
        width: 200,
        height: 200,
      },
    },
    stats: [
      { value: "24K+", label: "active learners" },
      { value: "120+", label: "expert-led courses" },
      { value: "92%", label: "complete their first course" },
    ],
  },

  people: {
    eyebrow: "The people",
    title: "Meet international students & teachers",
    // Placeholder copy kept exactly as in the Figma file (see README).
    description:
      "Morbi sit egestas dignissim pharetra, sed amet. Tempus justo senectus risus ac vel, velit, nunc. Eget commodo eget in aliquam facilisi facilisi nec magna hendrerit. Placerat ipsum sit tellus urna, faucibus aenean lorem faucibus integer.",
    cta: { label: "Explore teachers and students", href: "#" },
    columns: [
      {
        align: "end",
        offset: { desktop: 64.2, mobile: 48 },
        photos: [
          {
            src: "/images/people-01.jpg",
            alt: "Young student raising her hand at a desk",
            desktop: { w: 102.72, h: 154.08 },
            mobile: { w: 72, h: 96 },
          },
          {
            src: "/images/people-02.jpg",
            alt: "Teacher standing beside two students working on a laptop",
            desktop: { w: 138.03, h: 207.05 },
            mobile: { w: 94, h: 129 },
          },
        ],
      },
      {
        offset: { desktop: 25.68, mobile: 0 },
        photos: [
          {
            src: "/images/people-03.jpg",
            alt: "Student in a blue hoodie reading a book",
            desktop: { w: 102.72, h: 170.13 },
            mobile: { w: 72, h: 106 },
          },
          {
            src: "/images/people-04.jpg",
            alt: "Two people practising music by a window",
            desktop: { w: 102.72, h: 172.54 },
            mobile: { w: 72, h: 107.5 },
          },
          {
            src: "/images/people-05.jpg",
            alt: "Student taking notes next to a laptop",
            desktop: { w: 102.72, h: 128.4 },
            mobile: { w: 72, h: 80 },
          },
        ],
      },
      {
        photos: [
          {
            src: "/images/people-06.jpg",
            alt: "Graduate in cap and gown holding a diploma",
            desktop: { w: 102.72, h: 137.23 },
            mobile: { w: 72, h: 85.5 },
          },
          {
            src: "/images/people-07.jpg",
            alt: "Woman studying at a desk in a bright home office",
            desktop: { w: 102.72, h: 138.03 },
            mobile: { w: 72, h: 86 },
          },
          {
            src: "/images/people-08.jpg",
            alt: "Online class with a teacher on a desktop screen",
            desktop: { w: 102.72, h: 154.08 },
            mobile: { w: 72, h: 96 },
          },
        ],
      },
      {
        align: "center",
        photos: [
          {
            src: "/images/people-09.jpg",
            alt: "Smiling student with curly hair holding a red folder",
            desktop: { w: 128.4, h: 204.64 },
            mobile: { w: 88, h: 127.5 },
          },
          {
            src: "/images/people-10.jpg",
            alt: "Student in a hijab holding her phone on campus",
            desktop: { w: 102.72, h: 132.42 },
            mobile: { w: 72, h: 82.5 },
          },
        ],
      },
    ],
  },

  contact: {
    eyebrow: "Contact",
    title: "Get in touch",
    description:
      "Have a question? We’re here to help. Whether you’re looking for the right course, learning with your team or interested in teaching with Luma, we’d love to hear from you.",
    channels: [
      { label: "Email", value: "contact@luma.com", href: "mailto:contact@luma.com", icon: "chat" },
      { label: "Response Time", value: "Up to 24 hours on business days", icon: "clock" },
    ],
    // The mobile frame shows this form in Portuguese; the English desktop copy is used everywhere.
    form: {
      title: "Contact us",
      description: "Fill out the fields and we will get in touch.",
      name: { label: "Full name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "youremail@example.com" },
      message: { label: "Your question", placeholder: "Tell us how we can help..." },
      submit: "Send message",
      submitting: "Sending…",
      success: {
        title: "Thanks — your message is on its way.",
        description: "We’ll get back to you within 24 hours on business days.",
        reset: "Send another message",
      },
    },
  },

  finalCta: {
    title: "What will you learn next?",
    description: "Start with one course. Build from there.",
    primaryCta: { label: "Explore all courses", href: "#categories" },
    secondaryCta: { label: "Join Luma", href: "#" },
    avatars,
  },

  footer: {
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Courses", href: "#categories" },
          { label: "Categories", href: "#categories" },
          { label: "Instructors", href: "#people" },
          { label: "For Teams", href: "#contact" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "About", href: "#how-it-works" },
          { label: "Careers", href: "#" },
          { label: "Journal", href: "#" },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Help Center", href: "#contact" },
          { label: "Contact", href: "#contact" },
          { label: "Terms", href: "#" },
          { label: "Privacy", href: "#" },
        ],
      },
    ],
    copyright: "© 2026 Luma Learning",
  },
};
