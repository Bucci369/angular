import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MunicipalDashboardStore } from '../../shared/stores/municipal-dashboard.store';

@Component({
  selector: 'app-projects',
  imports: [
    CommonModule,
    CurrencyPipe
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent implements OnInit {
  // NGRX SIGNAL STORE INJECTION - Modernste State Management
  protected readonly store = inject(MunicipalDashboardStore);
  
  // Demo-Interaktion
  selectedMetric: string = 'efficiency';
  
  ngOnInit(): void {
    // Simuliere Datenlade-Prozess
    this.store.setLoading(true);
    
    setTimeout(() => {
      this.store.setLoading(false);
      console.log('Kommunalverwaltung Dashboard geladen - Perfekt für Axians IKVS!');
    }, 800);
  }
  
  // Interaktive Methoden für Live-Demo
  onCityChange(cityName: string): void {
    this.store.selectCity(cityName);
  }
  
  onDepartmentSelect(deptId: string): void {
    this.store.selectDepartment(deptId);
  }
  
  onKPICategoryChange(category: any): void {
    this.store.selectKPICategory(category);
  }
  
  onBudgetUpdate(deptId: string, newBudget: number): void {
    this.store.updateDepartmentBudget(deptId, newBudget);
  }
  
  onKPIUpdate(kpiId: string, newValue: number): void {
    this.store.updateKPI(kpiId, newValue);
  }
  
  toggleComparison(): void {
    this.store.toggleComparisonMode();
  }
  
  // Utility Methoden
  formatNumber(value: number): string {
    return new Intl.NumberFormat('de-DE').format(value);
  }
  
  getTrendIcon(trend: string): string {
    switch(trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      default: return '➡️';
    }
  }
  
  getDepartmentColor(category: string): string {
    const colors = {
      'social': '#3B82F6',      // Blue
      'infrastructure': '#10B981', // Green  
      'administration': '#F59E0B', // Amber
      'environment': '#06D6A0'  // Teal
    };
    return colors[category as keyof typeof colors] || '#6B7280';
  }
  
  getCategoryName(category: string): string {
    const names = {
      'financial': 'Finanzen',
      'administrative': 'Verwaltung',
      'social': 'Soziales',
      'environmental': 'Umwelt'
    };
    return names[category as keyof typeof names] || category;
  }
  
  // TrackBy function for performance
  trackByDept(index: number, dept: any): string {
    return dept.id;
  }
  
  // Math für Template
  Math = Math;
}
