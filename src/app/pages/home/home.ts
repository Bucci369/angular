import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule, MatIconModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  // Skills for code preview
  skills = {
    angular: 'Experte',
    typescript: 'Advanced'
  };

  // Quick stats for hero section
  quickStats = [
    { value: '3+', label: 'Jahre Angular' },
    { value: '15+', label: 'Projekte' },
    { value: '100%', label: 'TypeScript' }
  ];

  // Floating background elements
  floatingElements = Array(6).fill(null);

  // Tech stack with modern icons
  technologies = [
    { name: 'Angular', icon: 'code' },
    { name: 'TypeScript', icon: 'javascript' },
    { name: 'SCSS', icon: 'palette' },
    { name: 'RxJS', icon: 'stream' },
    { name: 'Material', icon: 'design_services' },
    { name: 'REST API', icon: 'api' }
  ];

  // Features with modern descriptions
  features = [
    {
      icon: 'dashboard',
      title: 'Moderne UI/UX Design',
      description: 'Entwicklung intuitiver und benutzerfreundlicher Interfaces für Verwaltungsanwendungen mit modernen Design-Patterns und Angular Material.'
    },
    {
      icon: 'integration_instructions',
      title: 'API Integration & State Management',
      description: 'Professionelle Integration von REST APIs mit RxJS Observables und effizientem State Management für komplexe Anwendungen.'
    },
    {
      icon: 'devices',
      title: 'Responsive & Performance',
      description: 'Mobile-first Development mit optimaler Performance durch Lazy Loading, OnPush Change Detection und moderne Optimierungstechniken.'
    },
    {
      icon: 'rocket_launch',
      title: 'Modern Angular Features',
      description: 'Verwendung neuester Angular Features wie Standalone Components, Signals und moderne Development-Patterns für zukunftssichere Lösungen.'
    }
  ];

  // Enhanced stats for stats section
  stats = [
    { value: '3+', label: 'Jahre Angular' },
    { value: '15+', label: 'Projekte' },
    { value: '100%', label: 'TypeScript' },
    { value: '10+', label: 'Technologien' }
  ];
}
