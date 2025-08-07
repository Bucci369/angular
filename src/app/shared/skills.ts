import { Injectable, signal, computed } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Skill } from './skill-card/skill-card';

// ANGULAR SERVICE - Modernste Signals + Backward Compatibility
@Injectable({
  providedIn: 'root' // SINGLETON PATTERN - Überall wiederverwendbar!
})
export class SkillsService {
  // ANGULAR SIGNALS (2024/2025) - Modernste Reactive State Management
  private skillsSignal = signal<Skill[]>(this.getInitialSkills());
  public skills = this.skillsSignal.asReadonly();
  
  // COMPUTED SIGNALS - Automatische Updates bei Änderungen
  public frontendSkills = computed(() => 
    this.skills().filter(skill => skill.category === 'frontend')
  );
  
  public backendSkills = computed(() => 
    this.skills().filter(skill => skill.category === 'backend')
  );
  
  public toolsSkills = computed(() => 
    this.skills().filter(skill => skill.category === 'tools')
  );
  
  public softSkills = computed(() => 
    this.skills().filter(skill => skill.category === 'soft-skills')
  );
  
  // LEGACY SUPPORT - RxJS für Backward Compatibility
  private skillsSubject = new BehaviorSubject<Skill[]>(this.getInitialSkills());
  public skills$ = this.skillsSubject.asObservable();
  
  // OBSERVABLES für gefilterte Daten - Functional Programming
  public frontendSkills$ = this.skills$.pipe(
    map(skills => skills.filter(skill => skill.category === 'frontend'))
  );
  
  public backendSkills$ = this.skills$.pipe(
    map(skills => skills.filter(skill => skill.category === 'backend'))
  );
  
  public toolsSkills$ = this.skills$.pipe(
    map(skills => skills.filter(skill => skill.category === 'tools'))
  );
  
  constructor() {
    console.log('SkillsService initialisiert - Dependency Injection funktioniert!');
  }
  
  // MODERNE SIGNALS API (2024/2025)
  getSkillsByCategory(category: Skill['category']) {
    return computed(() => 
      this.skills().filter(skill => skill.category === category)
    );
  }
  
  getSkillCount(category: Skill['category']) {
    return computed(() => 
      this.skills().filter(skill => skill.category === category).length
    );
  }
  
  getTotalSkillsCount() {
    return computed(() => this.skills().length);
  }
  
  getAverageSkillLevel() {
    return computed(() => {
      const allSkills = this.skills();
      return allSkills.length > 0 
        ? Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length)
        : 0;
    });
  }
  
  getExpertSkillsCount() {
    return computed(() => 
      this.skills().filter(skill => skill.level >= 90).length
    );
  }
  
  getTotalExperience() {
    return computed(() => 
      this.skills().reduce((sum, skill) => sum + skill.yearsOfExperience, 0)
    );
  }
  
  // SIGNALS UPDATE METHODS
  updateSkillLevel(skillName: string, newLevel: number): void {
    const currentSkills = this.skillsSignal();
    const updatedSkills = currentSkills.map(skill => 
      skill.name === skillName ? { ...skill, level: newLevel } : skill
    );
    this.skillsSignal.set(updatedSkills);
    
    // Legacy Support - auch RxJS aktualisieren
    this.skillsSubject.next(updatedSkills);
  }
  
  addSkill(newSkill: Skill): void {
    const currentSkills = this.skillsSignal();
    const updatedSkills = [...currentSkills, newSkill];
    this.skillsSignal.set(updatedSkills);
    
    // Legacy Support
    this.skillsSubject.next(updatedSkills);
  }
  
  // LEGACY RxJS API (für Backward Compatibility)
  getAllSkills(): Observable<Skill[]> {
    return this.skills$;
  }
  
  getSkillsByCategoryObservable(category: Skill['category']): Observable<Skill[]> {
    return this.skills$.pipe(
      map(skills => skills.filter(skill => skill.category === category))
    );
  }
  
  // PRIVATE METHODS
  private getInitialSkills(): Skill[] {
    return [
      {
        name: 'Angular',
        level: 95,
        icon: 'code',
        description: 'Expertenkenntnisse in Angular 15+ mit Standalone Components, Signals, und modernen Patterns.',
        category: 'frontend',
        yearsOfExperience: 4,
        projects: ['Kommunalverwaltung Dashboard', 'E-Commerce Platform', 'Real-time Chat App']
      },
      {
        name: 'TypeScript',
        level: 92,
        icon: 'javascript',
        description: 'Fortgeschrittene TypeScript Patterns, Generics, Decorators und Advanced Types.',
        category: 'frontend',
        yearsOfExperience: 4,
        projects: ['Angular Portfolio', 'Node.js APIs', 'React Components']
      },
      {
        name: 'RxJS',
        level: 88,
        icon: 'stream',
        description: 'Reactive Programming mit Observables, Operators und State Management.',
        category: 'frontend',
        yearsOfExperience: 3,
        projects: ['Data Streaming App', 'Real-time Notifications', 'Form Validation']
      },
      {
        name: 'SCSS/CSS',
        level: 90,
        icon: 'palette',
        description: 'Moderne CSS mit Grid, Flexbox, Custom Properties und responsive Design.',
        category: 'frontend',
        yearsOfExperience: 5,
        projects: ['Design System', 'Mobile-first Layouts', 'CSS Animations']
      },
      {
        name: 'Node.js',
        level: 82,
        icon: 'dns',
        description: 'Backend-Entwicklung mit Express, REST APIs und Microservices.',
        category: 'backend',
        yearsOfExperience: 3,
        projects: ['REST API Server', 'GraphQL Gateway', 'Authentication Service']
      },
      {
        name: 'Git',
        level: 85,
        icon: 'source',
        description: 'Versionskontrolle, Branching Strategies und CI/CD Integration.',
        category: 'tools',
        yearsOfExperience: 5,
        projects: ['GitHub Actions', 'GitLab CI', 'Bitbucket Pipelines']
      },
      {
        name: 'Problemlösung',
        level: 93,
        icon: 'lightbulb',
        description: 'Analytisches Denken, Debugging und systematische Lösungsansätze.',
        category: 'soft-skills',
        yearsOfExperience: 6
      },
      {
        name: 'Teamarbeit',
        level: 90,
        icon: 'group',
        description: 'Agile Methoden, Code Reviews und kollaborative Entwicklung.',
        category: 'soft-skills',
        yearsOfExperience: 5
      }
    ];
  }
}
