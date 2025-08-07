import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Observable, map, combineLatest } from 'rxjs';
import { SkillCardComponent, Skill } from '../../shared/skill-card/skill-card';
import { SkillsService } from '../../shared/skills';

// TypeScript Interfaces für Type Safety
interface SkillStats {
  totalSkills: number;
  averageLevel: number;
  expertSkills: number;
  totalExperience: number;
}

interface CLICommand {
  cmd: string;
  description: string;
  result?: string;
}

interface TypeScriptExamples {
  interface: string;
  component: string;
  service: string;
}

@Component({
  selector: 'app-about',
  imports: [
    CommonModule,          // NgFor, NgIf, etc.
    TitleCasePipe,        // titlecase Pipe
    SkillCardComponent    // Unsere wiederverwendbare Komponente
  ],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent implements OnInit {
  // DEPENDENCY INJECTION - Angular Service Pattern
  private skillsService = inject(SkillsService);
  
  // ANGULAR SIGNALS (2024/2025) - Modernste Reactive State
  selectedCategory = signal<Skill['category']>('frontend');
  selectedSkill = signal<string | null>(null);
  
  // COMPUTED SIGNALS - Automatische Updates
  currentCategorySkills = computed(() => 
    this.skillsService.getSkillsByCategory(this.selectedCategory())()
  );
  
  skillStats = computed(() => ({
    totalSkills: this.skillsService.getTotalSkillsCount()(),
    averageLevel: this.skillsService.getAverageSkillLevel()(),
    expertSkills: this.skillsService.getExpertSkillsCount()(),
    totalExperience: this.skillsService.getTotalExperience()()
  }));
  
  // STATIC DATA
  categories: Skill['category'][] = ['frontend', 'backend', 'tools', 'soft-skills'];
  
  cliCommands: CLICommand[] = [
    {
      cmd: 'ng new angular-portfolio --routing --style=scss',
      description: 'Erstellt neues Angular-Projekt mit Routing und SCSS',
      result: 'Projekt-Struktur generiert'
    },
    {
      cmd: 'ng generate component shared/skill-card',
      description: 'Generiert wiederverwendbare Skill-Card Komponente',
      result: 'Komponente mit HTML, SCSS, TS und Tests erstellt'
    },
    {
      cmd: 'ng generate service shared/skills',
      description: 'Erstellt Angular Service für Datenmanagement',
      result: 'Service mit Dependency Injection konfiguriert'
    },
    {
      cmd: 'ng build --prod',
      description: 'Produktions-Build mit Optimierungen',
      result: 'Minifizierte Bundles für Deployment'
    }
  ];
  
  typeScriptExamples: TypeScriptExamples = {
    interface: `// MODERNE ANGULAR SIGNALS (2024/2025)
interface Skill {
  name: string;
  level: number;
  category: 'frontend' | 'backend' | 'tools';
  projects?: string[];
  yearsOfExperience: number;
}`,
    component: `// SIGNALS COMPONENT (Angular 20+)
@Component({
  selector: 'app-skill-card',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillCardComponent {
  skill = input.required<Skill>();
  showDetails = signal(false);
  clicked = output<Skill>();
  
  // COMPUTED SIGNAL
  skillProgress = computed(() => 
    this.skill().level + '%'
  );
}`,
    service: `// MODERNSTE SIGNALS SERVICE (2024/2025)
@Injectable({providedIn: 'root'})
export class SkillsService {
  private skillsSignal = signal<Skill[]>([]);
  public skills = this.skillsSignal.asReadonly();
  
  // COMPUTED SIGNALS - Auto Updates
  frontendSkills = computed(() => 
    this.skills().filter(s => s.category === 'frontend')
  );
  
  totalCount = computed(() => this.skills().length);
}`
  };
  
  ngOnInit(): void {
    // EFFECTS - Modernste Angular Reaktivität
    effect(() => {
      console.log(`Aktuelle Kategorie: ${this.selectedCategory()}`);
      console.log(`Skills in Kategorie: ${this.currentCategorySkills().length}`);
    });
  }
  
  // SIGNAL-BASED METHODS - Event Handling (2024/2025 Style)
  selectCategory(category: Skill['category']): void {
    this.selectedCategory.set(category);
    this.selectedSkill.set(null); // Reset selection
  }
  
  getCurrentCategorySkills() {
    return this.currentCategorySkills;
  }
  
  getSkillCount(category: Skill['category']) {
    return this.skillsService.getSkillCount(category);
  }
  
  onSkillClicked(skill: Skill): void {
    const currentSelection = this.selectedSkill();
    this.selectedSkill.set(currentSelection === skill.name ? null : skill.name);
    console.log('Skill angeklickt:', skill.name);
  }
  
  onLevelUpdated(event: {skill: Skill, newLevel: number}): void {
    this.skillsService.updateSkillLevel(event.skill.name, event.newLevel);
    console.log(`${event.skill.name} Level aktualisiert auf ${event.newLevel}%`);
  }
  
  // LEGACY METHODS für Template Compatibility
  getCurrentCategorySkillsObservable(): Observable<Skill[]> {
    return this.skillsService.getSkillsByCategoryObservable(this.selectedCategory());
  }
  
  getSkillCountObservable(category: Skill['category']): Observable<number> {
    return this.skillsService.getSkillsByCategoryObservable(category).pipe(
      map(skills => skills.length)
    );
  }
  
  // TRACKBY FUNCTION - Performance Optimierung
  trackBySkill(index: number, skill: Skill): string {
    return skill.name;
  }
  
  // PRIVATE METHODS
  private calculateStats(skills: Skill[]): SkillStats {
    const totalSkills = skills.length;
    const averageLevel = Math.round(
      skills.reduce((sum, skill) => sum + skill.level, 0) / totalSkills
    );
    const expertSkills = skills.filter(skill => skill.level >= 90).length;
    const totalExperience = skills.reduce((sum, skill) => sum + skill.yearsOfExperience, 0);
    
    return {
      totalSkills,
      averageLevel,
      expertSkills,
      totalExperience
    };
  }
}
