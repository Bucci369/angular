import { Component, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-particles',
  template: `
    <canvas #canvas class="particles-canvas"></canvas>
  `,
  styles: [`
    .particles-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
    }
  `]
})
export class ParticlesComponent implements AfterViewInit, OnDestroy {
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private animationId!: number;
  private mouseX = 0;
  private mouseY = 0;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.canvas = this.el.nativeElement.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d')!;
    this.initializeCanvas();
    this.createParticles();
    this.animate();
    this.addEventListeners();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private initializeCanvas(): void {
    const resizeCanvas = () => {
      this.canvas.width = this.canvas.offsetWidth;
      this.canvas.height = this.canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  }

  private createParticles(): void {
    const particleCount = Math.floor((this.canvas.width * this.canvas.height) / 15000);
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(this.canvas.width, this.canvas.height));
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach(particle => {
      particle.update(this.mouseX, this.mouseY);
      particle.draw(this.ctx);
    });

    this.connectParticles();
    this.animationId = requestAnimationFrame(() => this.animate());
  }

  private connectParticles(): void {
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (120 - distance) / 120 * 0.3;
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }
  }

  private addEventListeners(): void {
    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouseX = e.clientX - rect.left;
      this.mouseY = e.clientY - rect.top;
    });
  }
}

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.originalX = this.x;
    this.originalY = this.y;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }

  update(mouseX: number, mouseY: number): void {
    // Mouse interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 100;

    if (distance < maxDistance) {
      const force = (maxDistance - distance) / maxDistance;
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 0.01;
      this.vy -= Math.sin(angle) * force * 0.01;
    }

    // Return to original position
    this.vx += (this.originalX - this.x) * 0.001;
    this.vy += (this.originalY - this.y) * 0.001;

    // Apply velocity
    this.x += this.vx;
    this.y += this.vy;

    // Damping
    this.vx *= 0.99;
    this.vy *= 0.99;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = 'rgba(99, 102, 241, 0.6)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
