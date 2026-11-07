import { Injectable, signal } from '@angular/core';

export interface ProfileData {
  name: string;
  role: string;
  location: string;
  phone: string;
  whatsapp: string;
  email: string;
  heroGreeting: string;
  heroSubtitle: string;
  statusText: string;
  aboutBio1: string;
  aboutBio2: string;
  projectsCount: string;
  technologiesCount: string;
  satisfactionRate: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'web' | 'ecommerce' | 'business';
  description: string;
  fullDetails: string;
  technologies: string[];
  image: string;
  liveUrl: string;
  features: string[];
  metrics: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: string;
  deliverables: string[];
}

export interface SkillItem {
  name: string;
  category: 'frontend' | 'styling' | 'tools';
  level: number;
  iconName: string;
}

export interface ToolItem {
  name: string;
  role: string;
  icon: string;
  color: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  rating: number;
  review: string;
  avatar: string;
}

export const DEFAULT_PROFILE: ProfileData = {
  name: 'M. Anass',
  role: 'Web Developer',
  location: 'Pakistan (Serving Worldwide)',
  phone: '+92 3015539449',
  whatsapp: '+92 3015539449',
  email: 'info.developer62@gmail.com',
  heroGreeting: 'Hello There!',
  heroSubtitle: "I'm a passionate Web Developer who creates modern, responsive and high-performance websites for businesses, brands and individuals.",
  statusText: 'Available for Freelance Projects & Remote Roles',
  aboutBio1: "I am M. Anass, a dedicated and creative Web Developer based in Pakistan. I specialize in building modern, lightning-fast, and responsive digital products that combine aesthetic beauty with rock-solid frontend engineering.",
  aboutBio2: "From bespoke personal brands to high-velocity e-commerce stores and corporate portals, I ensure every line of code is clean, semantic, and performant.",
  projectsCount: '50+',
  technologiesCount: '10+',
  satisfactionRate: '100%',
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'solecraft-ecommerce',
    title: 'SoleCraft E-Commerce Store',
    category: 'ecommerce',
    description: 'Modern online footwear store with product listings and responsive shopping experience.',
    fullDetails: 'SoleCraft is a high-end online footwear boutique engineered for seamless shopping. Features crisp visual product showcasing, instant category filters, interactive cart drawer, and optimized mobile checkout.',
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    image: '/assets/images/solecraft_showcase_1791196625520.jpg',
    liveUrl: 'https://solecraft-chi.vercel.app',
    features: [
      'Live deployed on Vercel with high-velocity load speeds',
      'Interactive footwear catalog with clean responsive layouts',
      'Intuitive client-side filter and shopping flow',
      '100% mobile-friendly responsive design',
    ],
    metrics: 'Live on Vercel · High-Converting UX',
  },
  {
    id: 'hassan-dental',
    title: 'Hassan Dental Clinic',
    category: 'web',
    description: 'Modern responsive website designed for a professional dental healthcare clinic.',
    fullDetails: 'An elevated, patient-first dental clinic web platform. Features doctor credentials, comprehensive treatment pricing, appointment scheduling, and patient trust testimonials.',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Vercel'],
    image: '/assets/images/hassan_dental_showcase_1791196639081.jpg',
    liveUrl: 'https://hassan-dental-y14y.vercel.app',
    features: [
      'Live production healthcare portal deployed on Vercel',
      'Online dental appointment booking widget',
      'Detailed treatments directory & doctor qualifications',
      'Sub-second page speeds with pristine accessibility',
    ],
    metrics: 'Live on Vercel · +65% Appointment Requests',
  },
  {
    id: 'turkish-restaurant',
    title: 'Turkish Restaurant Faisalabad',
    category: 'web',
    description: 'Modern restaurant website with attractive Turkish culinary menu and responsive layout.',
    fullDetails: 'Atmospheric culinary website crafted for Turkish Restaurant Faisalabad. Highlights their traditional Ottoman culinary heritage, digital menu with dish descriptions, online table reservations, and location map.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    image: '/assets/images/project_restaurant_website_1791100978188.jpg',
    liveUrl: 'https://turkish-restaurant-faisalabad.vercel.app',
    features: [
      'Live production website deployed on Vercel',
      'Categorized culinary menu with rich mouthwatering visuals',
      'Direct online table reservation & party inquiry flow',
      'Mobile-optimized touch navigation and Google Maps integration',
    ],
    metrics: 'Live on Vercel · 300+ Table Bookings',
  },
  {
    id: 'apex-business',
    title: 'Apex Business Solutions',
    category: 'business',
    description: 'Professional corporate business website focused on strategy, branding, and lead generation.',
    fullDetails: 'A high-converting corporate web platform engineered by M. Anass. Features an interactive project cost estimator, strategic enterprise capability breakdowns, real-world case studies, and an executive consultation booking system.',
    technologies: ['Angular', 'TypeScript', 'Tailwind CSS', 'Reactive Forms'],
    image: '/assets/images/project_business_agency_1791100994862.jpg',
    liveUrl: '/business-demo',
    features: [
      'Fully working live business website built right into the app',
      'Interactive real-time project investment estimator calculator',
      'Enterprise case studies with quantifiable ROI metrics',
      'Executive consultation booking form with validation',
    ],
    metrics: '100% Fully Functional Live Demo',
  },
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    shortDesc: 'Modern and responsive websites built with clean and efficient code.',
    fullDesc: 'End-to-end full-stack and web development tailored to your exact business needs. Architecture engineered for high reliability, maximum speed, SEO optimization, and effortless future scalability.',
    icon: 'code',
    deliverables: [
      'Custom web architectures with zero bloated code',
      'Mobile-first responsive design across all screen sizes',
      'SEO-friendly semantic HTML5 structure & schema markup',
      'Speed optimization aiming for 95+ Google PageSpeed score',
    ],
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    shortDesc: 'Interactive and user-friendly interfaces that work perfectly across devices.',
    fullDesc: 'Crafting pixel-perfect, accessible user interfaces with modern frameworks like React and Angular. Fluid micro-interactions, seamless transitions, and rock-solid state management.',
    icon: 'devices',
    deliverables: [
      'Component-driven modular design systems',
      'Tailwind CSS & CSS Grid fluid layouts',
      'Accessibility compliance (WCAG AA standards)',
      'State-managed dynamic client experiences',
    ],
  },
  {
    id: 'ecommerce-dev',
    title: 'E-Commerce Development',
    shortDesc: 'Professional online stores with modern product layouts and shopping experiences.',
    fullDesc: 'High-converting online stores featuring fluid catalog filtering, lightning checkout flows, secure payment integration, and seamless inventory management.',
    icon: 'shopping_bag',
    deliverables: [
      'High-converting product showcase & cart flows',
      'WooCommerce & headless custom storefronts',
      'Seamless payment gateway integration',
      'Optimized checkout velocity & mobile cart UX',
    ],
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    shortDesc: 'Transform outdated websites into modern and professional digital experiences.',
    fullDesc: 'Revamping legacy websites that feel dated, sluggish, or unresponsive. I preserve your core value while injecting sleek typography, contemporary UI design, and 10x faster load speeds.',
    icon: 'autorenew',
    deliverables: [
      'Comprehensive UX/UI audit of current friction points',
      'Fresh contemporary design matching modern standards',
      'Significant performance boost and asset minification',
      'Zero-downtime migration & content preservation',
    ],
  },
];

export const DEFAULT_SKILLS: SkillItem[] = [
  { name: 'HTML5', category: 'frontend', level: 95, iconName: 'html' },
  { name: 'CSS3', category: 'styling', level: 92, iconName: 'css' },
  { name: 'JavaScript', category: 'frontend', level: 90, iconName: 'javascript' },
  { name: 'React', category: 'frontend', level: 88, iconName: 'code' },
  { name: 'Tailwind CSS', category: 'styling', level: 94, iconName: 'palette' },
  { name: 'Bootstrap', category: 'styling', level: 86, iconName: 'dashboard' },
  { name: 'WordPress', category: 'tools', level: 88, iconName: 'web' },
  { name: 'WooCommerce', category: 'tools', level: 82, iconName: 'shopping_cart' },
  { name: 'Git', category: 'tools', level: 88, iconName: 'source' },
  { name: 'GitHub', category: 'tools', level: 90, iconName: 'merge_type' },
  { name: 'Responsive Design', category: 'frontend', level: 98, iconName: 'devices' },
  { name: 'UI/UX Design', category: 'styling', level: 85, iconName: 'brush' },
];

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: 'Dr. Sarah Jenkins',
    role: 'Founder & Head Dentist',
    company: 'SmileCare Clinic',
    rating: 5,
    review:
      'M. Anass delivered an exceptional website for our dental clinic. The appointment booking flow is smooth, and our patients constantly compliment how modern and easy the site is to use. Inquiries jumped by over 60% within weeks!',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Marcus Vance',
    role: 'Managing Director',
    company: 'UrbanStyle Apparel',
    rating: 5,
    review:
      'Working with Anass was a breeze from day one. He implemented our custom storefront with clean code, lightning-fast response times, and zero bugs. His attention to mobile responsiveness is truly second to none.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  },
  {
    name: 'Amina Tariq',
    role: 'Creative Director',
    company: 'Nexus Creative Agency',
    rating: 5,
    review:
      'Anass is a rare talent who bridges design sensitivity with rigorous frontend engineering. He turned our Figma concepts into live, buttery-smooth responsive pages ahead of deadline. Highly recommended!',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&auto=format&fit=crop&q=80',
  },
];

const STORAGE_KEYS = {
  PROFILE: 'portfolio_admin_profile',
  PROJECTS: 'portfolio_admin_projects',
  SERVICES: 'portfolio_admin_services',
  SKILLS: 'portfolio_admin_skills',
  TESTIMONIALS: 'portfolio_admin_testimonials',
  AUTH: 'portfolio_admin_auth_active',
  PASSCODE: 'portfolio_admin_passcode',
  EMAIL: 'portfolio_admin_email',
};

export const DEFAULT_PASSCODE = '@12anasS.';
export const DEFAULT_ADMIN_EMAIL = 'info.developer62@gmail.com';

@Injectable({
  providedIn: 'root',
})
export class PortfolioData {
  readonly profile = signal<ProfileData>(DEFAULT_PROFILE);
  readonly projects = signal<Project[]>(DEFAULT_PROJECTS);
  readonly services = signal<ServiceItem[]>(DEFAULT_SERVICES);
  readonly skills = signal<SkillItem[]>(DEFAULT_SKILLS);
  readonly testimonials = signal<Testimonial[]>(DEFAULT_TESTIMONIALS);
  readonly isAuthenticated = signal<boolean>(false);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      // Check auth session
      const auth = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (auth === 'true') {
        this.isAuthenticated.set(true);
      }

      // Profile
      const savedProfile = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (savedProfile) {
        this.profile.set({ ...DEFAULT_PROFILE, ...JSON.parse(savedProfile) });
      }

      // Projects
      const savedProjects = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (savedProjects) {
        this.projects.set(JSON.parse(savedProjects));
      }

      // Services
      const savedServices = localStorage.getItem(STORAGE_KEYS.SERVICES);
      if (savedServices) {
        this.services.set(JSON.parse(savedServices));
      }

      // Skills
      const savedSkills = localStorage.getItem(STORAGE_KEYS.SKILLS);
      if (savedSkills) {
        this.skills.set(JSON.parse(savedSkills));
      }

      // Testimonials
      const savedTestimonials = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      if (savedTestimonials) {
        this.testimonials.set(JSON.parse(savedTestimonials));
      }

      // Migrate or initialize passcode to current requested default @12anasS.
      const storedPass = localStorage.getItem(STORAGE_KEYS.PASSCODE);
      if (!storedPass || storedPass === 'anass2026') {
        localStorage.setItem(STORAGE_KEYS.PASSCODE, DEFAULT_PASSCODE);
      }
    } catch (err) {
      console.warn('Error loading portfolio state from localStorage', err);
    }
  }

  // --- Auth & Access Management ---
  login(email: string, passcode: string): boolean {
    if (typeof window === 'undefined') return false;
    const currentPasscode = localStorage.getItem(STORAGE_KEYS.PASSCODE) || DEFAULT_PASSCODE;
    const currentEmail = localStorage.getItem(STORAGE_KEYS.EMAIL) || DEFAULT_ADMIN_EMAIL;

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = passcode.trim();

    const emailMatches =
      trimmedEmail === currentEmail.toLowerCase() ||
      trimmedEmail === DEFAULT_ADMIN_EMAIL.toLowerCase();

    const passMatches =
      trimmedPass === currentPasscode ||
      trimmedPass === DEFAULT_PASSCODE;

    if (emailMatches && passMatches) {
      this.isAuthenticated.set(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated.set(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }

  changePasscode(currentPass: string, newPass: string): boolean {
    if (typeof window === 'undefined') return false;
    const existing = localStorage.getItem(STORAGE_KEYS.PASSCODE) || DEFAULT_PASSCODE;
    if (currentPass.trim() !== existing) {
      return false;
    }
    if (newPass.trim().length < 4) {
      return false;
    }
    localStorage.setItem(STORAGE_KEYS.PASSCODE, newPass.trim());
    return true;
  }

  // --- Content Mutators ---
  updateProfile(data: Partial<ProfileData>): void {
    this.profile.update((current) => {
      const updated = { ...current, ...data };
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(updated));
      }
      return updated;
    });
  }

  updateProjects(projects: Project[]): void {
    this.projects.set(projects);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    }
  }

  updateProject(id: string, updatedData: Partial<Project>): void {
    this.projects.update((current) => {
      const updated = current.map((p) => (p.id === id ? { ...p, ...updatedData } : p));
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  addProject(newProject: Project): void {
    this.projects.update((current) => {
      const updated = [newProject, ...current];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  deleteProject(id: string): void {
    this.projects.update((current) => {
      const updated = current.filter((p) => p.id !== id);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  updateServices(services: ServiceItem[]): void {
    this.services.set(services);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
    }
  }

  updateSkills(skills: SkillItem[]): void {
    this.skills.set(skills);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(skills));
    }
  }

  addSkill(skill: SkillItem): void {
    this.skills.update((current) => {
      const updated = [...current, skill];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  deleteSkill(name: string): void {
    this.skills.update((current) => {
      const updated = current.filter((s) => s.name.toLowerCase() !== name.toLowerCase());
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.SKILLS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  updateTestimonials(testimonials: Testimonial[]): void {
    this.testimonials.set(testimonials);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
    }
  }

  addTestimonial(testimonial: Testimonial): void {
    this.testimonials.update((current) => {
      const updated = [testimonial, ...current];
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  deleteTestimonial(name: string): void {
    this.testimonials.update((current) => {
      const updated = current.filter((t) => t.name !== name);
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
      }
      return updated;
    });
  }

  resetToDefaults(): void {
    this.profile.set(DEFAULT_PROFILE);
    this.projects.set(DEFAULT_PROJECTS);
    this.services.set(DEFAULT_SERVICES);
    this.skills.set(DEFAULT_SKILLS);
    this.testimonials.set(DEFAULT_TESTIMONIALS);

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.PROJECTS);
      localStorage.removeItem(STORAGE_KEYS.SERVICES);
      localStorage.removeItem(STORAGE_KEYS.SKILLS);
      localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    }
  }
}
