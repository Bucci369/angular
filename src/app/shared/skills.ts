import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Skill } from './skill-card/skill-card';

// ANGULAR SERVICE - Demonstriert Dependency Injection & State Management
@Injectable({
  providedIn: 'root' // SINGLETON PATTERN - Überall wiederverwendbar!
})
export class SkillsService {
  // RXJS BEHAVIORAL SUBJECT - Reactive State Management
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
  
  // PUBLIC API METHODS
  getAllSkills(): Observable<Skill[]> {
    return this.skills$;
  }
  
  getSkillsByCategory(category: Skill['category']): Observable<Skill[]> {
    return this.skills$.pipe(
      map(skills => skills.filter(skill => skill.category === category))
    );
  }
  
  updateSkillLevel(skillName: string, newLevel: number): void {
    const currentSkills = this.skillsSubject.value;
    const updatedSkills = currentSkills.map(skill => 
      skill.name === skillName ? { ...skill, level: newLevel } : skill
    );
    this.skillsSubject.next(updatedSkills);
  }
  
  addSkill(newSkill: Skill): void {
    const currentSkills = this.skillsSubject.value;
    this.skillsSubject.next([...currentSkills, newSkill]);
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
