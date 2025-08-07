import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink?: string;
  githubLink?: string;
  isHighlighted?: boolean;
}

@Component({
  selector: 'app-projects-showcase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects-showcase.component.html',
  styleUrls: ['./projects-showcase.component.scss']
})
export class ProjectsShowcaseComponent implements OnInit {
  
  highlightedProjects: Project[] = [
    {
      id: 1,
      title: 'Enterprise Admin Dashboard',
      description: 'Vollständige <span class="highlight">Verwaltungsanwendung</span> für komplexe Business-Prozesse. Entwickelt mit <span class="highlight">Angular</span> und <span class="highlight">Spring Boot</span>. Features: User Management, Dynamic Charts, Real-time Notifications, Advanced Data Tables.',
      image: 'assets/images/projects/admin-dashboard.jpg',
      technologies: ['Angular', 'TypeScript', 'Angular Material', 'Spring Boot', 'PostgreSQL'],
      demoLink: 'https://demo-admin-dashboard.com',
      githubLink: 'https://github.com/username/admin-dashboard',
      isHighlighted: true
    },
    {
      id: 2,
      title: 'Customer Portal Platform',
      description: 'Moderne <span class="highlight">Kundenportal-Lösung</span> mit Self-Service Features. Responsive Design, Multi-language Support, Integration mit Legacy-Systemen über RESTful APIs.',
      image: 'assets/images/projects/customer-portal.jpg',
      technologies: ['Angular', 'RxJS', 'PrimeNG', 'REST APIs', 'Docker'],
      demoLink: 'https://demo-customer-portal.com',
      githubLink: 'https://github.com/username/customer-portal',
      isHighlighted: true
    },
    {
      id: 3,
      title: 'Workflow Management System',
      description: 'Digitale <span class="highlight">Workflow-Automatisierung</span> für Unternehmensprozesse. Drag & Drop Process Builder, Status Tracking, Email Notifications, Approval Workflows.',
      image: 'assets/images/projects/workflow-system.jpg',
      technologies: ['Angular', 'TypeScript', 'D3.js', 'Node.js', 'MongoDB'],
      demoLink: 'https://demo-workflow.com',
      githubLink: 'https://github.com/username/workflow-system',
      isHighlighted: true
    }
  ];

  otherProjects: Project[] = [
    {
      id: 4,
      title: 'Real-time Analytics Dashboard',
      description: 'Live-Datenvisualisierung mit Chart.js und WebSockets für Echtzeit-Updates.',
      image: 'assets/images/projects/analytics.jpg',
      technologies: ['Angular', 'Chart.js', 'WebSockets', 'SCSS'],
      githubLink: 'https://github.com/username/analytics-dashboard'
    },
    {
      id: 5,
      title: 'E-Commerce Admin Panel',
      description: 'Vollständiges Backend-Interface für Online-Shop Management mit Inventory Control.',
      image: 'assets/images/projects/ecommerce.jpg',
      technologies: ['Angular', 'PrimeNG', 'REST APIs', 'JWT'],
      githubLink: 'https://github.com/username/ecommerce-admin'
    },
    {
      id: 6,
      title: 'Document Management System',
      description: 'Digitale Dokumentenverwaltung mit Upload, Versionierung und Approval-Workflows.',
      image: 'assets/images/projects/document-management.jpg',
      technologies: ['Angular', 'Angular Material', 'File Upload', 'PDF.js'],
      githubLink: 'https://github.com/username/document-management'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  openExternalLink(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
