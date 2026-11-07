import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
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
  Project,
  SkillItem,
  Testimonial,
} from '../services/portfolio-data';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  readonly portfolioData = inject(PortfolioData);

  readonly activeTab = signal<'profile' | 'projects' | 'services' | 'skills' | 'testimonials' | 'security'>('profile');
  readonly loginError = signal<string>('');
  readonly toastMessage = signal<string | null>(null);
  readonly editingProject = signal<Project | null>(null);
  readonly showNewProjectModal = signal<boolean>(false);
  readonly showPasscode = signal<boolean>(false);

  // Login Form (Email + Password)
  readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    passcode: new FormControl('', [Validators.required]),
  });

  // Profile Form
  readonly profileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    whatsapp: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    heroGreeting: new FormControl('', [Validators.required]),
    heroSubtitle: new FormControl('', [Validators.required]),
    statusText: new FormControl('', [Validators.required]),
    aboutBio1: new FormControl('', [Validators.required]),
    aboutBio2: new FormControl('', [Validators.required]),
    projectsCount: new FormControl('', [Validators.required]),
    technologiesCount: new FormControl('', [Validators.required]),
    satisfactionRate: new FormControl('', [Validators.required]),
  });

  // Project Form (for add/edit)
  readonly projectForm = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    category: new FormControl<'web' | 'ecommerce' | 'business'>('web', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    fullDetails: new FormControl('', [Validators.required]),
    technologies: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    liveUrl: new FormControl('', [Validators.required]),
    features: new FormControl('', [Validators.required]),
    metrics: new FormControl('', [Validators.required]),
  });

  // New Skill Form
  readonly skillForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    category: new FormControl<'frontend' | 'styling' | 'tools'>('frontend', [Validators.required]),
    level: new FormControl(90, [Validators.required, Validators.min(10), Validators.max(100)]),
    iconName: new FormControl('code', [Validators.required]),
  });

  // New Testimonial Form
  readonly testimonialForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    company: new FormControl('', [Validators.required]),
    rating: new FormControl(5, [Validators.required, Validators.min(1), Validators.max(5)]),
    review: new FormControl('', [Validators.required]),
    avatar: new FormControl('', [Validators.required]),
  });

  // Security Form
  readonly securityForm = new FormGroup({
    currentPass: new FormControl('', [Validators.required]),
    newPass: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  ngOnInit(): void {
    this.populateProfileForm();
  }

  populateProfileForm(): void {
    const p = this.portfolioData.profile();
    this.profileForm.patchValue({
      name: p.name,
      role: p.role,
      location: p.location,
      phone: p.phone,
      whatsapp: p.whatsapp,
      email: p.email,
      heroGreeting: p.heroGreeting,
      heroSubtitle: p.heroSubtitle,
      statusText: p.statusText,
      aboutBio1: p.aboutBio1,
      aboutBio2: p.aboutBio2,
      projectsCount: p.projectsCount,
      technologiesCount: p.technologiesCount,
      satisfactionRate: p.satisfactionRate,
    });
  }

  showToast(message: string): void {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 4000);
  }

  onLogin(): void {
    this.loginError.set('');
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError.set('Please enter both your email address and admin password.');
      return;
    }

    const email = this.loginForm.get('email')?.value || '';
    const code = this.loginForm.get('passcode')?.value || '';

    const success = this.portfolioData.login(email, code);
    if (success) {
      this.populateProfileForm();
      this.showToast('Welcome back, Admin! Access granted.');
    } else {
      this.loginError.set('Invalid email or password. Please verify your credentials and try again.');
    }
  }

  onLogout(): void {
    this.portfolioData.logout();
    this.loginForm.reset();
  }

  saveProfile(): void {
    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const val = this.profileForm.value;
    this.portfolioData.updateProfile({
      name: val.name || '',
      role: val.role || '',
      location: val.location || '',
      phone: val.phone || '',
      whatsapp: val.whatsapp || '',
      email: val.email || '',
      heroGreeting: val.heroGreeting || '',
      heroSubtitle: val.heroSubtitle || '',
      statusText: val.statusText || '',
      aboutBio1: val.aboutBio1 || '',
      aboutBio2: val.aboutBio2 || '',
      projectsCount: val.projectsCount || '',
      technologiesCount: val.technologiesCount || '',
      satisfactionRate: val.satisfactionRate || '',
    });

    this.showToast('Profile and Contact information updated successfully!');
  }

  // --- Project Management ---
  openAddProject(): void {
    this.editingProject.set(null);
    this.projectForm.reset({
      id: `project-${Date.now()}`,
      title: '',
      category: 'web',
      description: '',
      fullDetails: '',
      technologies: 'Angular, Tailwind CSS, TypeScript',
      image: '/assets/images/project_business_agency_1791100994862.jpg',
      liveUrl: 'https://',
      features: 'Responsive Layout\nSpeed Optimized\nModern UI Architecture',
      metrics: 'Production Ready',
    });
    this.showNewProjectModal.set(true);
  }

  editProject(project: Project): void {
    this.editingProject.set(project);
    this.projectForm.patchValue({
      id: project.id,
      title: project.title,
      category: project.category,
      description: project.description,
      fullDetails: project.fullDetails,
      technologies: project.technologies.join(', '),
      image: project.image,
      liveUrl: project.liveUrl,
      features: project.features.join('\n'),
      metrics: project.metrics,
    });
    this.showNewProjectModal.set(true);
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      this.projectForm.markAllAsTouched();
      return;
    }

    const formVal = this.projectForm.value;
    const techArray = (formVal.technologies || '')
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const featArray = (formVal.features || '')
      .split('\n')
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const projectData: Project = {
      id: formVal.id || `proj-${Date.now()}`,
      title: formVal.title || '',
      category: formVal.category || 'web',
      description: formVal.description || '',
      fullDetails: formVal.fullDetails || '',
      technologies: techArray.length ? techArray : ['Web'],
      image: formVal.image || '/assets/images/project_business_agency_1791100994862.jpg',
      liveUrl: formVal.liveUrl || '#',
      features: featArray.length ? featArray : ['High Performance'],
      metrics: formVal.metrics || 'Live Project',
    };

    if (this.editingProject()) {
      this.portfolioData.updateProject(projectData.id, projectData);
      this.showToast(`Updated project "${projectData.title}"!`);
    } else {
      this.portfolioData.addProject(projectData);
      this.showToast(`Created new project "${projectData.title}"!`);
    }

    this.showNewProjectModal.set(false);
    this.editingProject.set(null);
  }

  deleteProject(id: string, title: string): void {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.portfolioData.deleteProject(id);
      this.showToast(`Project "${title}" deleted.`);
    }
  }

  // --- Skills ---
  addSkill(): void {
    if (this.skillForm.invalid) {
      this.skillForm.markAllAsTouched();
      return;
    }

    const val = this.skillForm.value;
    const newSkill: SkillItem = {
      name: val.name || '',
      category: val.category || 'frontend',
      level: Number(val.level) || 85,
      iconName: val.iconName || 'code',
    };

    this.portfolioData.addSkill(newSkill);
    this.skillForm.reset({
      name: '',
      category: 'frontend',
      level: 90,
      iconName: 'code',
    });
    this.showToast(`Skill "${newSkill.name}" added successfully!`);
  }

  deleteSkill(name: string): void {
    if (confirm(`Remove skill "${name}"?`)) {
      this.portfolioData.deleteSkill(name);
      this.showToast(`Skill "${name}" removed.`);
    }
  }

  // --- Testimonials ---
  addTestimonial(): void {
    if (this.testimonialForm.invalid) {
      this.testimonialForm.markAllAsTouched();
      return;
    }

    const val = this.testimonialForm.value;
    const newTestimonial: Testimonial = {
      name: val.name || '',
      role: val.role || '',
      company: val.company || '',
      rating: Number(val.rating) || 5,
      review: val.review || '',
      avatar: val.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    };

    this.portfolioData.addTestimonial(newTestimonial);
    this.testimonialForm.reset({
      name: '',
      role: '',
      company: '',
      rating: 5,
      review: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    });
    this.showToast(`Testimonial from "${newTestimonial.name}" added!`);
  }

  deleteTestimonial(name: string): void {
    if (confirm(`Remove review by "${name}"?`)) {
      this.portfolioData.deleteTestimonial(name);
      this.showToast(`Testimonial removed.`);
    }
  }

  // --- Security ---
  changePassword(): void {
    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }

    const curr = this.securityForm.get('currentPass')?.value || '';
    const newP = this.securityForm.get('newPass')?.value || '';

    const ok = this.portfolioData.changePasscode(curr, newP);
    if (ok) {
      this.showToast('Admin passcode changed successfully! Remember your new passcode.');
      this.securityForm.reset();
    } else {
      this.showToast('Failed to change passcode. Make sure your current passcode is correct.');
    }
  }

  resetAll(): void {
    if (
      confirm(
        'Are you sure you want to reset all portfolio data to original defaults? Any custom modifications will be restored to original state.'
      )
    ) {
      this.portfolioData.resetToDefaults();
      this.populateProfileForm();
      this.showToast('Portfolio data has been reset to defaults.');
    }
  }
}
