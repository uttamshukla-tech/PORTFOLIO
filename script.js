/**
 * Portfolio Animation & Navigation System
 * Clean architecture with proper state management
 */

// ==========================================
// GLOBAL STATE
// ==========================================
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

const state = {
    particlesArray: [],
    animationId: null,
    currentTab: 'home',
    validPages: ['home', 'education', 'skills', 'experience']
};

// ==========================================
// CANVAS MANAGEMENT
// ==========================================
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initAnimation(state.currentTab);
});

resizeCanvas();

// ==========================================
// PARTICLE CLASSES
// ==========================================

// Home: Constellation Network
class ParticleHome {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = '#3b82f6';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Education: Rising Squares
class ParticleEdu {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 15 + 5;
        this.speedY = Math.random() * 1 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.y -= this.speedY;
        
        if (this.y < 0 - this.size) {
            this.y = canvas.height + this.size;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// Skills: Matrix Rain
class ParticleSkill {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        this.y = Math.random() * -canvas.height;
        this.speedY = Math.random() * 5 + 2;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.color = '#06b6d4';
        this.changeInterval = Math.floor(Math.random() * 20 + 5);
        this.frameCounter = 0;
    }

    update() {
        this.y += this.speedY;
        this.frameCounter++;
        
        if (this.frameCounter >= this.changeInterval) {
            this.value = Math.random() > 0.5 ? '1' : '0';
            this.frameCounter = 0;
        }
        
        if (this.y > canvas.height) {
            this.y = Math.random() * -100;
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.font = '14px monospace';
        ctx.fillText(this.value, this.x, this.y);
    }
}

// Experience: Starfield
class ParticleExp {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 3 + 1;
    }

    update() {
        this.x += this.speedX;
        
        if (this.x > canvas.width) {
            this.x = 0;
            this.y = Math.random() * canvas.height;
        }
    }

    draw() {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Trail effect
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(this.x - 20, this.y - this.size, 20, this.size * 2);
    }
}

// ==========================================
// ANIMATION HANDLERS
// ==========================================
const animationHandlers = {
    home: () => {
        const particles = state.particlesArray;
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Draw connections
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    },
    
    education: () => {
        state.particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
    },
    
    skills: () => {
        state.particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
    },
    
    experience: () => {
        state.particlesArray.forEach(p => {
            p.update();
            p.draw();
        });
    }
};

// ==========================================
// ANIMATION CONTROL
// ==========================================
function initAnimation(type) {
    // Validate type
    if (!state.validPages.includes(type)) {
        type = 'home';
    }
    
    // Clear existing particles
    state.particlesArray = [];
    
    // Particle counts per animation type
    const particleCounts = {
        home: 80,
        education: 50,
        skills: 100,
        experience: 100
    };
    
    // Particle classes per animation type
    const particleClasses = {
        home: ParticleHome,
        education: ParticleEdu,
        skills: ParticleSkill,
        experience: ParticleExp
    };
    
    const count = particleCounts[type];
    const ParticleClass = particleClasses[type];
    
    // Create new particles
    for (let i = 0; i < count; i++) {
        state.particlesArray.push(new ParticleClass());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const handler = animationHandlers[state.currentTab];
    if (handler) {
        handler();
    }
    
    state.animationId = requestAnimationFrame(animate);
}

// Start initial animation
initAnimation('home');
animate();

// ==========================================
// NAVIGATION SYSTEM
// ==========================================

/**
 * Updates the visual state (DOM) without touching browser history
 */
function updateView(pageId) {
    // Validate page ID
    if (!state.validPages.includes(pageId)) {
        pageId = 'home';
    }
    
    // Update animation state
    state.currentTab = pageId;
    initAnimation(pageId);
    
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn, .home-btn').forEach(btn => {
        btn.classList.remove('active');
        
        // Match button to page by data attribute or text content
        const btnPage = btn.getAttribute('data-page') || 
                       btn.textContent.toLowerCase().trim();
        
        if (btnPage === pageId) {
            btn.classList.add('active');
        }
    });
    
    // Scroll to top
    window.scrollTo(0, 0);
}

/**
 * Main navigation function - updates view AND browser history
 */
function showPage(pageId) {
    // Validate page ID
    if (!state.validPages.includes(pageId)) {
        pageId = 'home';
    }
    
    // Update the view
    updateView(pageId);
    
    // Update browser history only if different from current state
    if (history.state?.page !== pageId) {
        const newUrl = `${window.location.pathname}#${pageId}`;
        history.pushState({ page: pageId }, '', newUrl);
    }
}

/**
 * Handle browser back/forward buttons
 */
window.addEventListener('popstate', (event) => {
    const pageId = event.state?.page || 
                   window.location.hash.substring(1) || 
                   'home';
    
    // Only update view, don't push new history
    updateView(pageId);
});

/**
 * Handle initial page load and refreshes
 */
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.substring(1);
    const initialPage = state.validPages.includes(hash) ? hash : 'home';
    
    // Set initial view
    updateView(initialPage);
    
    // Replace history state so back button works correctly
    history.replaceState(
        { page: initialPage }, 
        '', 
        `${window.location.pathname}#${initialPage}`
    );
});

/**
 * Optional: Auto-attach click handlers if data-page attribute is used
 * Usage: <button class="nav-btn" data-page="skills">Skills</button>
 */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = btn.getAttribute('data-page');
            showPage(pageId);
        });
    });
});

/**
 * Cleanup on page unload (optional but good practice)
 */
window.addEventListener('beforeunload', () => {
    if (state.animationId) {
        cancelAnimationFrame(state.animationId);
    }
});
