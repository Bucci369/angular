import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

// TypeScript Interface - DEMONSTRIERT TYPE SAFETY!
export interface Skill {
  name: string;
  level: number; // 1-100
  icon: string;
  description: string;
  category: 'frontend' | 'backend' | 'tools' | 'soft-skills';
  yearsOfExperience: number;
  projects?: string[];
}

@Component({
  selector: 'app-skill-card',
  imports: [CommonModule, MatIconModule],
  templateUrl: './skill-card.html',
  styleUrl: './skill-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush // PERFORMANCE OPTIMIERUNG!
})
export class SkillCardComponent {
  // INPUT PROPERTIES - Wiederverwendbarkeit!
  @Input({ required: true }) skill!: Skill;
  @Input() showDetails = false;
  @Input() animationDelay = 0;
  
  // OUTPUT EVENTS - Bidirektionale Kommunikation!
  @Output() skillClicked = new EventEmitter<Skill>();
  @Output() levelUpdated = new EventEmitter<{skill: Skill, newLevel: number}>();
  
  // COMPUTED PROPERTIES
  get skillLevelText(): string {
    if (this.skill.level >= 90) return 'Experte';
    if (this.skill.level >= 75) return 'Fortgeschritten';
    if (this.skill.level >= 50) return 'Mittel';
    return 'Grundlagen';
  }
  
  get categoryColor(): string {
    const colors = {
      'frontend': '#61dafb',
      'backend': '#8cc84b', 
      'tools': '#f39c12',
      'soft-skills': '#e74c3c'
    };
    return colors[this.skill.category];
  }
  
  // METHODS - Component Logic
  onSkillClick(): void {
    this.skillClicked.emit(this.skill);
  }
  
  onLevelChange(newLevel: number): void {
    this.levelUpdated.emit({ skill: this.skill, newLevel });
  }
  
  // LIFECYCLE HOOKS
  ngOnInit(): void {
    console.log(`Skill Card für ${this.skill.name} initialisiert`);
  }
}
