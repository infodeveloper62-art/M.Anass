import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

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

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {
  private readonly el = inject(ElementRef);

  // Navigation & UI state
  readonly activeSection = signal<string>('home');
  readonly isScrolled = signal<boolean>(false);
  readonly mobileMenuOpen = signal<boolean>(false);
  readonly scrollProgress = signal<number>(0);

  // Modals state
  readonly selectedProject = signal<Project | null>(null);
  readonly selectedService = signal<ServiceItem | null>(null);
  readonly cvModalOpen = signal<boolean>(false);
  readonly contactSuccess = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);

  // Filter states
  readonly activeProjectCategory = signal<string>('all');
  readonly activeSkillCategory = signal<string>('all');

  // Contact Form
  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    projectType: new FormControl('Web Development', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  // Services
  readonly services: ServiceItem[] = [
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

  // Projects
  readonly projects: Project[] = [
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

  // Skills
  readonly skills: SkillItem[] = [
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

  // Tools
  readonly tools: ToolItem[] = [
    { name: 'Visual Studio Code', role: 'Primary Code Editor', icon: 'code', color: '#007ACC' },
    { name: 'GitHub', role: 'Version Control & CI', icon: 'terminal', color: '#171717' },
    { name: 'Figma', role: 'UI/UX Layouts & Vectors', icon: 'gesture', color: '#F24E1E' },
    { name: 'Google AI Studio', role: 'AI Prototyping & APIs', icon: 'psychology', color: '#1A73E8' },
    { name: 'WordPress', role: 'Content Management', icon: 'language', color: '#21759B' },
    { name: 'Vercel', role: 'Deployment & Edge Hosting', icon: 'cloud_upload', color: '#000000' },
    { name: 'Chrome DevTools', role: 'Debugging & Performance', icon: 'bug_report', color: '#FBBC05' },
  ];

  // Why choose me
  readonly whyChooseMe = [
    {
      step: '01',
      title: 'Modern Design',
      desc: 'Clean, elegant, and bespoke visual hierarchy that aligns seamlessly with your brand identity and captivates visitors.',
      icon: 'auto_awesome',
    },
    {
      step: '02',
      title: 'Responsive Websites',
      desc: 'Pixel-perfect fluid layouts that look and perform flawlessly on smartphones, tablets, laptops, and ultra-wide screens.',
      icon: 'stay_current_portrait',
    },
    {
      step: '03',
      title: 'Clean Code',
      desc: 'Maintainable, scalable, and semantic code with clear architecture, zero unnecessary dependencies, and high readability.',
      icon: 'data_object',
    },
    {
      step: '04',
      title: 'Fast Performance',
      desc: 'Obsessively optimized for sub-second loading speeds, lightweight assets, and superior SEO search engine rankings.',
      icon: 'bolt',
    },
  ];

  // Work process
  readonly processSteps = [
    {
      number: '01',
      title: 'Discover',
      desc: "Deeply understand the client's business goals, target audience, brand aesthetic, and technical specifications.",
      icon: 'search',
    },
    {
      number: '02',
      title: 'Design',
      desc: 'Architect a clean, intuitive layout, interactive wireframes, and design components tailored for conversion.',
      icon: 'design_services',
    },
    {
      number: '03',
      title: 'Develop',
      desc: 'Code the entire application utilizing clean, modern HTML5, CSS3/Tailwind, and JavaScript with robust best practices.',
      icon: 'integration_instructions',
    },
    {
      number: '04',
      title: 'Launch',
      desc: 'Run rigorous cross-browser testing, SEO audits, speed optimizations, and deploy seamlessly to live production.',
      icon: 'rocket_launch',
    },
  ];

  // Testimonials
  readonly testimonials: Testimonial[] = [
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

  // Computed filtered projects
  readonly filteredProjects = computed(() => {
    const category = this.activeProjectCategory();
    if (category === 'all') return this.projects;
    return this.projects.filter((p) => p.category === category);
  });

  // Computed filtered skills
  readonly filteredSkills = computed(() => {
    const category = this.activeSkillCategory();
    if (category === 'all') return this.skills;
    return this.skills.filter((s) => s.category === category);
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.updateScrollState();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollState();
  }

  private updateScrollState(): void {
    if (typeof window === 'undefined') return;
    const scrollY = window.scrollY;
    this.isScrolled.set(scrollY > 40);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    this.scrollProgress.set(Math.min(100, Math.max(0, progress)));

    // Highlight active section
    const sections = ['home', 'services', 'about', 'skills', 'tools', 'projects', 'process', 'testimonials', 'contact'];
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 200 && rect.bottom >= 200) {
          this.activeSection.set(sectionId);
          break;
        }
      }
    }
  }

  scrollTo(sectionId: string): void {
    this.mobileMenuOpen.set(false);
    if (typeof document === 'undefined') return;
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection.set(sectionId);
    }
  }

  scrollToTop(): void {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  openProjectModal(project: Project): void {
    this.selectedProject.set(project);
  }

  closeProjectModal(): void {
    this.selectedProject.set(null);
  }

  openServiceModal(service: ServiceItem): void {
    this.selectedService.set(service);
  }

  closeServiceModal(): void {
    this.selectedService.set(null);
  }

  openCvModal(): void {
    this.cvModalOpen.set(true);
  }

  closeCvModal(): void {
    this.cvModalOpen.set(false);
  }

  filterProjects(category: string): void {
    this.activeProjectCategory.set(category);
  }

  filterSkills(category: string): void {
    this.activeSkillCategory.set(category);
  }

  submitContact(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    // Simulate responsive clean submission
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.contactSuccess.set(true);
      this.contactForm.reset({
        name: '',
        email: '',
        projectType: 'Web Development',
        message: '',
      });
      setTimeout(() => {
        this.contactSuccess.set(false);
      }, 7000);
    }, 800);
  }

  downloadResume(): void {
    // Generates a mock direct text file or triggers download confirmation
    const cvText = `
M. ANASS - WEB DEVELOPER & FRONTEND DEVELOPER
Based in Pakistan | Email: info.developer62@gmail.com | Phone: +92 3015539449
Specialization: Modern Web Development, Frontend Architecture, E-Commerce, Responsive UI

Core Skills:
- HTML5, CSS3, JavaScript (ES6+), React, Angular
- Tailwind CSS, Bootstrap, Responsive UI/UX
- WordPress, WooCommerce, Git, GitHub, REST APIs

Selected Highlights:
- 50+ Completed Projects with 100% Client Satisfaction
- 10+ Web Technologies masterfully applied
- Average Google Lighthouse Performance score: 95+

Available for Freelance Projects and Full-time Roles.
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'M_Anass_Web_Developer_CV.txt';
    link.click();
    window.URL.revokeObjectURL(url);
    this.closeCvModal();
  }
}
