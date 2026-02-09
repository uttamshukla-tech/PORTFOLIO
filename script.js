/**
 * Portfolio Logic
 * Includes Navigation and Dynamic Backgrounds
 */

// Canvas Setup
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let animationId;
let currentTab = 'home';

// Resize Canvas
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', () => {
    resizeCanvas();
    initAnimation(currentTab);
});
resizeCanvas();

// ==========================================
// ANIMATION CLASSES & LOGIC
// ==========================================

// 1. HOME: Constellation / Network Effect
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

function handleHome() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(59, 130, 246, ${1 - distance / 100})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
}

// 2. EDUCATION: Rising Squares (Structure)
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
        ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`; // Purple
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

function handleEdu() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

// 3. SKILLS: Matrix/Cyber Rain
class ParticleSkill {
    constructor() {
        this.x = Math.floor(Math.random() * (canvas.width / 20)) * 20;
        this.y = Math.random() * -canvas.height;
        this.speedY = Math.random() * 5 + 2;
        this.value = Math.random() > 0.5 ? '1' : '0';
        this.color = '#06b6d4'; // Cyan
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

function handleSkills() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

// 4. EXPERIENCE: Starfield / Flow
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
        // Trail
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fillRect(this.x - 20, this.y - this.size, 20, this.size * 2);
    }
}

function handleExp() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
}

// ==========================================
// CONTROLLER
// ==========================================

function initAnimation(type) {
    particlesArray = [];
    let count = 80;
    if (type === 'home') count = 80;
    else if (type === 'education') count = 50;
    else if (type === 'skills') count = 100;
    else if (type === 'experience') count = 100;

    for (let i = 0; i < count; i++) {
        if (type === 'home') particlesArray.push(new ParticleHome());
        else if (type === 'education') particlesArray.push(new ParticleEdu());
        else if (type === 'skills') particlesArray.push(new ParticleSkill());
        else if (type === 'experience') particlesArray.push(new ParticleExp());
    }
}

function animate() {
    // Clear canvas with slight fade for trail effects if desired, 
    // but here we do full clear for crispness
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (currentTab === 'home') handleHome();
    else if (currentTab === 'education') handleEdu();
    else if (currentTab === 'skills') handleSkills();
    else if (currentTab === 'experience') handleExp();

    animationId = requestAnimationFrame(animate);
}

// Start
initAnimation('home');
animate();

// ==========================================
// PAGE NAVIGATION
// ==========================================

function showPage(pageId) {
    // Update Animation State
    currentTab = pageId;
    initAnimation(pageId);

    // Standard Navigation Logic
    document.querySelectorAll('.nav-btn, .home-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        setTimeout(() => {
            targetPage.classList.add('active');
            targetPage.scrollTop = 0;
        }, 50);
    }

    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        if (btn.textContent.toLowerCase() === pageId) {
            btn.classList.add('active');
        }
    });
}
