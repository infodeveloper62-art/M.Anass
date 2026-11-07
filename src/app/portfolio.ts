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
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  PortfolioData,
  ProfileData,
  Project,
  ServiceItem,
  SkillItem,
  Testimonial,
  ToolItem,
} from './services/portfolio-data';

export type { Project, ServiceItem, SkillItem, ToolItem, Testimonial, ProfileData };

@Component({
  selector: 'app-portfolio',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class Portfolio implements OnInit {
  private readonly el = inject(ElementRef);
  readonly portfolioData = inject(PortfolioData);

  // Dynamic signals from PortfolioData service
  readonly profile = this.portfolioData.profile;
  readonly projects = this.portfolioData.projects;
  readonly services = this.portfolioData.services;
  readonly skills = this.portfolioData.skills;
  readonly testimonials = this.portfolioData.testimonials;

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

  // Computed filtered projects
  readonly filteredProjects = computed(() => {
    const category = this.activeProjectCategory();
    const list = this.projects();
    if (category === 'all') return list;
    return list.filter((p) => p.category === category);
  });

  // Computed filtered skills
  readonly filteredSkills = computed(() => {
    const category = this.activeSkillCategory();
    const list = this.skills();
    if (category === 'all') return list;
    return list.filter((s) => s.category === category);
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
    const prof = this.profile();
    const cvText = `
${prof.name.toUpperCase()} - ${prof.role.toUpperCase()}
Based in ${prof.location} | Email: ${prof.email} | Phone: ${prof.phone}
Specialization: Modern Web Development, Frontend Architecture, E-Commerce, Responsive UI

Core Skills:
- HTML5, CSS3, JavaScript (ES6+), React, Angular
- Tailwind CSS, Bootstrap, Responsive UI/UX
- WordPress, WooCommerce, Git, GitHub, REST APIs

Selected Highlights:
- ${prof.projectsCount} Completed Projects with ${prof.satisfactionRate} Client Satisfaction
- ${prof.technologiesCount} Web Technologies masterfully applied
- Average Google Lighthouse Performance score: 95+

Available for Freelance Projects and Full-time Roles.
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${prof.name.replace(/\s+/g, '_')}_Web_Developer_CV.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
    this.closeCvModal();
  }
}
