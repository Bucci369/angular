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
  technologies = [
    { name: 'Angular', icon: 'code' },
    { name: 'TypeScript', icon: 'javascript' },
    { name: 'SCSS', icon: 'palette' },
    { name: 'REST APIs', icon: 'api' },
    { name: 'RxJS', icon: 'stream' },
    { name: 'Angular Material', icon: 'design_services' }
  ];

  features = [
    {
      icon: 'dashboard',
      title: 'Intuitive Benutzeroberflächen',
      description: 'Entwicklung benutzerfreundlicher Dashboards und Oberflächen für Verwaltungsanwendungen mit Angular Material Design System.'
    },
    {
      icon: 'api',
      title: 'REST API Integration',
      description: 'Professionelle Integration von Backend-Services und APIs für Datenmanagement und Kommunalverwaltung.'
    },
    {
      icon: 'responsive_layout',
      title: 'Responsive Design',
      description: 'Mobile-first Entwicklung für optimale Nutzererfahrung auf allen Geräten - von Desktop bis Smartphone.'
    },
    {
      icon: 'speed',
      title: 'Performance Optimierung',
      description: 'Lazy Loading, OnPush Change Detection und weitere Optimierungstechniken für schnelle Ladezeiten.'
    }
  ];

  stats = [
    { value: '3+', label: 'Jahre Angular' },
    { value: '15+', label: 'Projekte' },
    { value: '100%', label: 'TypeScript' },
    { value: '5+', label: 'UI Libraries' }
  ];
}
