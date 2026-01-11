// Modern About Page Animation Script
// Gen-Z inspired with Framer Motion principles

// ============================================
// CUSTOM CURSOR ANIMATION
// ============================================
class CustomCursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.follower = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.follower.className = 'cursor-follower';
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.follower);
    
    this.cursorPos = { x: 0, y: 0 };
    this.followerPos = { x: 0, y: 0 };
    
    this.init();
  }
  
  init() {
    document.addEventListener('mousemove', (e) => {
      this.cursorPos.x = e.clientX;
      this.cursorPos.y = e.clientY;
    });
    
    // Hover effects on interactive elements
    const interactives = document.querySelectorAll('a, button, .value-card, .team-member, .stat-item');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        this.follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
      });
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        this.follower.style.transform = 'translate(-50%, -50%) scale(1)';
      });
    });
    
    this.animate();
  }
  
  animate() {
    // Cursor follows mouse instantly
    this.cursor.style.left = this.cursorPos.x + 'px';
    this.cursor.style.top = this.cursorPos.y + 'px';
    
    // Follower has smooth delay (lerp effect)
    this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.15;
    this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.15;
    
    this.follower.style.left = this.followerPos.x + 'px';
    this.follower.style.top = this.followerPos.y + 'px';
    
    requestAnimationFrame(() => this.animate());
  }
}

// ============================================
// FLOATING PARTICLES ANIMATION
// ============================================
function createParticles() {
  const hero = document.querySelector('.about-hero');
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'hero-particles';
  hero.appendChild(particlesContainer);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (10 + Math.random() * 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
class ScrollReveal {
  constructor() {
    this.elements = document.querySelectorAll('.value-card, .team-member, .stat-item, .story-content');
    this.init();
  }
  
  init() {
    this.observe();
    window.addEventListener('scroll', () => this.observe());
  }
  
  observe() {
    this.elements.forEach((el, index) => {
      const rect = el.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.85;
      
      if (isVisible && !el.classList.contains('visible')) {
        setTimeout(() => {
          el.classList.add('visible');
        }, index * 100); // Stagger effect
      }
    });
  }
}

// ============================================
// NUMBER COUNTER ANIMATION
// ============================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      // Format number with appropriate suffix
      if (target >= 1000) {
        element.textContent = Math.floor(current / 1000) + 'K+';
      } else if (target === 100) {
        element.textContent = Math.floor(current) + '%';
      } else {
        element.textContent = Math.floor(current) + '%';
      }
    }
  }, 16);
}

// ============================================
// MISSION STATS ANIMATION
// ============================================
function initStatsAnimation() {
  const stats = [
    { element: document.querySelectorAll('.stat-number')[0], value: 100 },
    { element: document.querySelectorAll('.stat-number')[1], value: 70 },
    { element: document.querySelectorAll('.stat-number')[2], value: 50000 },
    { element: document.querySelectorAll('.stat-number')[3], value: 1000 }
  ];
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        stats.forEach((stat, index) => {
          setTimeout(() => {
            const target = stat.value;
            animateCounter(stat.element, target);
          }, index * 200);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  const missionSection = document.querySelector('.our-mission');
  if (missionSection) observer.observe(missionSection);
}

// ============================================
// PARALLAX SCROLL EFFECT
// ============================================
function initParallax() {
  const parallaxElements = [
    { el: document.querySelector('.about-hero-content'), speed: 0.5 },
    { el: document.querySelector('.story-image-wrapper'), speed: 0.3 },
    { el: document.querySelector('.mission-container'), speed: 0.4 }
  ];
  
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(item => {
      if (item.el) {
        const yPos = -(scrolled * item.speed);
        item.el.style.transform = `translateY(${yPos}px)`;
      }
    });
  });
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.cta-button, .nav-cta');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translate(0, 0)';
    });
  });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// TEXT REVEAL ANIMATION
// ============================================
function initTextReveal() {
  const headings = document.querySelectorAll('.about-hero h1, .story-content h2, .values-container h2, .team-container h2, .mission-container h2');
  
  headings.forEach(heading => {
    const text = heading.textContent;
    heading.innerHTML = '';
    
    text.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.animation = `textReveal 0.5s ease forwards ${index * 0.03}s`;
      heading.appendChild(span);
    });
  });
}

// Add text reveal keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes textReveal {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }
`;
document.head.appendChild(style);

// ============================================
// 3D TILT EFFECT FOR CARDS
// ============================================
function init3DTilt() {
  const cards = document.querySelectorAll('.value-card, .team-member, .stat-item');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      navbar.classList.remove('scroll-up');
      return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-up');
      navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
      navbar.classList.remove('scroll-down');
      navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
  });
}

// Add navbar styles
const navStyle = document.createElement('style');
navStyle.textContent = `
  .navbar {
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .navbar.scroll-down {
    transform: translateY(-100%);
  }
  
  .navbar.scroll-up {
    transform: translateY(0);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  }
`;
document.head.appendChild(navStyle);

// ============================================
// IMAGE REVEAL ON SCROLL
// ============================================
function initImageReveal() {
  const images = document.querySelectorAll('.story-image-wrapper, .team-member-image');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  images.forEach(img => observer.observe(img));
}

// ============================================
// FLOATING CARDS ANIMATION
// ============================================
function createFloatingCards() {
  const storyImage = document.querySelector('.story-image-wrapper');
  if (!storyImage) return;
  
  const card1 = document.createElement('div');
  card1.className = 'floating-card card-1';
  card1.innerHTML = '<h4>2020</h4><p>Founded</p>';
  
  const card2 = document.createElement('div');
  card2.className = 'floating-card card-2';
  card2.innerHTML = '<h4>50K+</h4><p>Customers</p>';
  
  storyImage.appendChild(card1);
  storyImage.appendChild(card2);
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function initScrollProgress() {
  const progress = document.createElement('div');
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--gold), var(--gold-light));
    z-index: 10000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progress);
  
  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progress.style.width = scrolled + '%';
  });
}

// ============================================
// INITIALIZE ALL ANIMATIONS
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Initialize custom cursor
  new CustomCursor();
  
  // Create floating particles
  createParticles();
  
  // Initialize scroll reveal
  new ScrollReveal();
  
  // Initialize stats animation
  initStatsAnimation();
  
  // Initialize parallax
  initParallax();
  
  // Initialize magnetic buttons
  initMagneticButtons();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize text reveal
  initTextReveal();
  
  // Initialize 3D tilt
  init3DTilt();
  
  // Initialize navbar
  initNavbar();
  
  // Initialize image reveal
  initImageReveal();
  
  // Create floating cards
  createFloatingCards();
  
  // Initialize scroll progress
  initScrollProgress();
  
  console.log('🚀 All animations initialized!');
});

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimize scroll animations
window.addEventListener('scroll', debounce(() => {
  // Scroll-based animations here
}, 10));