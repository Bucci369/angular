import { signalStore, withState, withComputed, withMethods, patchState } from '@ngrx/signals';
import { computed } from '@angular/core';

// KOMMUNALVERWALTUNG DATENMODELLE - Perfekt für Axians IKVS
export interface MunicipalData {
  cityName: string;
  population: number;
  budget: number;
  expenses: number;
  income: number;
  departments: Department[];
  kpis: KPI[];
}

export interface Department {
  id: string;
  name: string;
  budget: number;
  employees: number;
  efficiency: number; // 0-100%
  category: 'social' | 'infrastructure' | 'administration' | 'environment';
}

export interface KPI {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  category: 'financial' | 'social' | 'environmental' | 'administrative';
}

// NGRX SIGNAL STORE (2024/2025) - Modernste State Management
export const MunicipalDashboardStore = signalStore(
  { providedIn: 'root' },
  
  // STATE DEFINITION
  withState<{
    selectedCity: string;
    cities: MunicipalData[];
    isLoading: boolean;
    selectedDepartment: string | null;
    comparisonMode: boolean;
    selectedKPICategory: KPI['category'];
  }>({
    selectedCity: 'Münster',
    cities: [
      {
        cityName: 'Münster',
        population: 317_000,
        budget: 1_200_000_000,
        expenses: 1_150_000_000,
        income: 1_180_000_000,
        departments: [
          {
            id: 'social',
            name: 'Soziales & Jugend',
            budget: 280_000_000,
            employees: 150,
            efficiency: 87,
            category: 'social'
          },
          {
            id: 'infrastructure',
            name: 'Tiefbau & Verkehr',
            budget: 320_000_000,
            employees: 95,
            efficiency: 92,
            category: 'infrastructure'
          },
          {
            id: 'administration',
            name: 'Verwaltung',
            budget: 180_000_000,
            employees: 220,
            efficiency: 78,
            category: 'administration'
          },
          {
            id: 'environment',
            name: 'Umwelt & Klimaschutz',
            budget: 95_000_000,
            employees: 45,
            efficiency: 89,
            category: 'environment'
          }
        ],
        kpis: [
          {
            id: 'debt-per-citizen',
            name: 'Verschuldung pro Einwohner',
            value: 2_340,
            target: 2_000,
            unit: '€',
            trend: 'down',
            category: 'financial'
          },
          {
            id: 'response-time',
            name: 'Bearbeitungszeit Anträge',
            value: 12,
            target: 10,
            unit: 'Tage',
            trend: 'down',
            category: 'administrative'
          },
          {
            id: 'satisfaction',
            name: 'Bürgerzufriedenheit',
            value: 7.8,
            target: 8.0,
            unit: '/10',
            trend: 'up',
            category: 'social'
          },
          {
            id: 'co2-reduction',
            name: 'CO2-Reduktion',
            value: 15.2,
            target: 20.0,
            unit: '%',
            trend: 'up',
            category: 'environmental'
          }
        ]
      },
      {
        cityName: 'Osnabrück',
        population: 165_000,
        budget: 650_000_000,
        expenses: 630_000_000,
        income: 645_000_000,
        departments: [
          {
            id: 'social',
            name: 'Soziales & Jugend',
            budget: 145_000_000,
            employees: 85,
            efficiency: 83,
            category: 'social'
          },
          {
            id: 'infrastructure',
            name: 'Tiefbau & Verkehr',
            budget: 165_000_000,
            employees: 52,
            efficiency: 88,
            category: 'infrastructure'
          },
          {
            id: 'administration',
            name: 'Verwaltung',
            budget: 95_000_000,
            employees: 125,
            efficiency: 82,
            category: 'administration'
          },
          {
            id: 'environment',
            name: 'Umwelt & Klimaschutz',
            budget: 48_000_000,
            employees: 25,
            efficiency: 91,
            category: 'environment'
          }
        ],
        kpis: [
          {
            id: 'debt-per-citizen',
            name: 'Verschuldung pro Einwohner',
            value: 1_890,
            target: 2_000,
            unit: '€',
            trend: 'stable',
            category: 'financial'
          },
          {
            id: 'response-time',
            name: 'Bearbeitungszeit Anträge',
            value: 9,
            target: 10,
            unit: 'Tage',
            trend: 'down',
            category: 'administrative'
          },
          {
            id: 'satisfaction',
            name: 'Bürgerzufriedenheit',
            value: 8.1,
            target: 8.0,
            unit: '/10',
            trend: 'stable',
            category: 'social'
          },
          {
            id: 'co2-reduction',
            name: 'CO2-Reduktion',
            value: 18.5,
            target: 20.0,
            unit: '%',
            trend: 'up',
            category: 'environmental'
          }
        ]
      }
    ],
    isLoading: false,
    selectedDepartment: null,
    comparisonMode: false,
    selectedKPICategory: 'financial'
  }),
  
  // COMPUTED SIGNALS - Automatische Berechnungen
  withComputed((state) => ({
    // Aktuelle Stadt-Daten
    currentCity: computed(() => 
      state.cities().find(city => city.cityName === state.selectedCity()) || state.cities()[0]
    ),
    
    // Budget-Analysen
    budgetBalance: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      return city ? city.income - city.expenses : 0;
    }),
    
    budgetUtilization: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      return city ? Math.round((city.expenses / city.budget) * 100) : 0;
    }),
    
    // Department-Analysen
    totalDepartmentBudget: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      return city ? city.departments.reduce((sum, dept) => sum + dept.budget, 0) : 0;
    }),
    
    averageDepartmentEfficiency: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      if (!city || city.departments.length === 0) return 0;
      return Math.round(city.departments.reduce((sum, dept) => sum + dept.efficiency, 0) / city.departments.length);
    }),
    
    departmentsByCategory: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      return city ? city.departments : [];
    }),
    
    // KPI-Analysen
    currentKPIs: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      const category = state.selectedKPICategory();
      return city ? city.kpis.filter(kpi => kpi.category === category) : [];
    }),
    
    kpisByCategory: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      return city ? city.kpis : [];
    }),
    
    performanceScore: computed(() => {
      const city = state.cities().find(city => city.cityName === state.selectedCity());
      if (!city) return 0;
      
      const kpiScore = city.kpis.reduce((sum, kpi) => {
        const achievement = Math.min(kpi.value / kpi.target, 1.5); // Cap at 150%
        return sum + achievement;
      }, 0) / city.kpis.length;
      
      const deptEfficiency = city.departments.reduce((sum, dept) => sum + dept.efficiency, 0) / city.departments.length / 100;
      
      return Math.round(((kpiScore + deptEfficiency) / 2) * 100);
    }),
    
    // Vergleichsdaten für Benchmarking (wie bei IKVS)
    cityComparison: computed(() => {
      if (!state.comparisonMode()) return null;
      
      return state.cities().map(city => ({
        name: city.cityName,
        population: city.population,
        budgetPerCapita: Math.round(city.budget / city.population),
        efficiency: Math.round(city.departments.reduce((sum, dept) => sum + dept.efficiency, 0) / city.departments.length),
        satisfaction: city.kpis.find(kpi => kpi.id === 'satisfaction')?.value || 0,
        debtPerCapita: city.kpis.find(kpi => kpi.id === 'debt-per-citizen')?.value || 0
      }));
    })
  })),
  
  // METHODS - Actions für State Updates
  withMethods((store) => ({
    // Stadt auswählen
    selectCity(cityName: string): void {
      patchState(store, { selectedCity: cityName, selectedDepartment: null });
    },
    
    // Department auswählen
    selectDepartment(departmentId: string | null): void {
      patchState(store, { selectedDepartment: departmentId });
    },
    
    // KPI Kategorie ändern
    selectKPICategory(category: KPI['category']): void {
      patchState(store, { selectedKPICategory: category });
    },
    
    // Vergleichsmodus ein/ausschalten
    toggleComparisonMode(): void {
      patchState(store, { comparisonMode: !store.comparisonMode() });
    },
    
    // Department Budget aktualisieren (für Interaktivität)
    updateDepartmentBudget(departmentId: string, newBudget: number): void {
      const cities = store.cities();
      const currentCity = store.selectedCity();
      
      const updatedCities = cities.map(city => {
        if (city.cityName === currentCity) {
          return {
            ...city,
            departments: city.departments.map(dept => 
              dept.id === departmentId ? { ...dept, budget: newBudget } : dept
            )
          };
        }
        return city;
      });
      
      patchState(store, { cities: updatedCities });
    },
    
    // KPI Wert aktualisieren
    updateKPI(kpiId: string, newValue: number): void {
      const cities = store.cities();
      const currentCity = store.selectedCity();
      
      const updatedCities = cities.map(city => {
        if (city.cityName === currentCity) {
          return {
            ...city,
            kpis: city.kpis.map(kpi => 
              kpi.id === kpiId ? { ...kpi, value: newValue } : kpi
            )
          };
        }
        return city;
      });
      
      patchState(store, { cities: updatedCities });
    },
    
    // Loading State
    setLoading(loading: boolean): void {
      patchState(store, { isLoading: loading });
    }
  }))
);