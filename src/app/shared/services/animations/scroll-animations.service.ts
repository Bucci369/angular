import { Injectable, ElementRef, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollAnimationsService implements OnDestroy {
  private observers: IntersectionObserver[] = [];

  initializeScrollAnimations(): void {
    this.setupFadeInAnimations();
    this.setupStaggeredAnimations();
    this.setupParallaxEffects();
  }

  private setupFadeInAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with fade-in-up class
    document.querySelectorAll('.fade-in-up').forEach(el => {
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  private setupStaggeredAnimations(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.stagger-item');
          children.forEach((child, index) => {
            setTimeout(() => {
              child.classList.add('animate-in');
            }, index * 100); // 100ms delay between each item
          });
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.stagger-container').forEach(el => {
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  private setupParallaxEffects(): void {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const rate = scrolled * -0.5;
        (element as HTMLElement).style.transform = `translateY(${rate}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  // Typewriter effect from andresjosehr
  typeWriter(element: ElementRef, text: string, speed: number = 50): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      const el = element.nativeElement;
      el.innerHTML = '';

      const typeChar = () => {
        if (i < text.length) {
          el.innerHTML += text.charAt(i);
          i++;
          setTimeout(typeChar, speed);
        } else {
          resolve();
        }
      };

      typeChar();
    });
  }

  // Glitch effect für Titel
  addGlitchEffect(element: ElementRef, text: string): void {
    const el = element.nativeElement;
    el.setAttribute('data-text', text);
    el.classList.add('glitch-effect');
  }

  ngOnDestroy(): void {
    this.observers.forEach(observer => observer.disconnect());
  }
}
