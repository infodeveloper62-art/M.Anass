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
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-site',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './business-site.html',
  styleUrl: './business-site.css',
})
export class BusinessSite implements OnInit {
  private readonly router = inject(Router);

  readonly consultationSuccess = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);
  readonly activeTab = signal<string>('all');

  // Interactive Quote Estimator
  readonly selectedServiceType = signal<number>(2500);
  readonly selectedTimeline = signal<number>(1);
  readonly estimatedCost = signal<number>(2500);

  readonly consultationForm = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    contactPerson: new FormControl('', [Validators.required, Validators.minLength(2)]),
    workEmail: new FormControl('', [Validators.required, Validators.email]),
    serviceRequired: new FormControl('Enterprise Strategy & Growth', [Validators.required]),
    projectBrief: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  readonly services = [
    {
      title: 'Enterprise Digital Strategy',
      desc: 'Holistic digital roadmap alignment, architecture design, and competitive capability mapping for high-growth firms.',
      icon: 'insights',
      deliverables: ['Strategy Blueprint', 'Tech Stack Evaluation', 'ROI Projections'],
    },
    {
      title: 'Cloud & System Modernization',
      desc: 'Seamless transition of legacy infrastructure to modern cloud microservices with zero operational downtime.',
      icon: 'cloud_sync',
      deliverables: ['AWS/GCP Setup', 'CI/CD Automation', 'Scalability Audits'],
    },
    {
      title: 'Custom Web & Product Engineering',
      desc: 'High-performance web applications, enterprise portals, and customer-facing platforms built with clean code.',
      icon: 'devices',
      deliverables: ['Frontend Architecture', 'API Integrations', 'Speed Optimization'],
    },
    {
      title: 'Data Analytics & Business BI',
      desc: 'Transform raw company telemetry into actionable visual dashboards and predictive revenue forecasts.',
      icon: 'query_stats',
      deliverables: ['Executive Dashboards', 'Pipeline Analytics', 'Conversion Tracking'],
    },
  ];

  readonly caseStudies = [
    {
      client: 'FinTech Velocity Inc.',
      tag: 'Fintech',
      title: 'Automated Payment Pipeline & Cloud Modernization',
      result: '+310% Transaction Throughput',
      duration: '4 Months',
      desc: 'Re-architected the legacy transaction engine, reducing latency from 4.2s to 180ms and cutting infrastructure overhead by 42%.',
    },
    {
      client: 'OmniHealth Logistics',
      tag: 'Healthcare',
      title: 'Real-Time Medical Supply Distribution Platform',
      result: '99.99% Guaranteed Uptime',
      duration: '6 Months',
      desc: 'Built an end-to-end hospital dispatch management system servicing 85+ medical facilities nationwide with zero system drops.',
    },
    {
      client: 'Vanguard Retail Group',
      tag: 'E-Commerce',
      title: 'Global Omnichannel Storefront & Conversion Optimization',
      result: '$18.4M Annual Growth',
      duration: '5 Months',
      desc: 'Designed a high-velocity responsive storefront that increased average cart checkout conversion by 2.8x across mobile devices.',
    },
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }

  updateEstimate(base: number, timelineMultiplier: number): void {
    this.selectedServiceType.set(base);
    this.selectedTimeline.set(timelineMultiplier);
    this.estimatedCost.set(Math.round(base * timelineMultiplier));
  }

  goBackToPortfolio(): void {
    this.router.navigate(['/']);
  }

  scrollTo(sectionId: string): void {
    if (typeof document === 'undefined') return;
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  submitConsultation(): void {
    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.consultationSuccess.set(true);
      this.consultationForm.reset({
        companyName: '',
        contactPerson: '',
        workEmail: '',
        serviceRequired: 'Enterprise Strategy & Growth',
        projectBrief: '',
      });
      setTimeout(() => {
        this.consultationSuccess.set(false);
      }, 7000);
    }, 800);
  }
}
