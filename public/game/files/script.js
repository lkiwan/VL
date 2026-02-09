/* =====================================================
   VALENTINE'S DAY WEBSITE - MAIN JAVASCRIPT
   ===================================================== */

// Global Variables
let currentSection = 0;
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
let musicPlaying = false;

// Current carousel slide
let currentSlide = 0;
const totalSlides = 6;

// Discovered hearts counter
let discoveredHearts = 0;

/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Initialize the Advanced Cinematic Intro (The "Whale")
    initCinematicIntroV2();

    // 2. Initialize Standard Features (Game, Animations)
    createFloatingHearts();
    initCursorTrail();
    initTiltEffect();
    initCarousel();
    initFlipCards();
    initSecretHearts();
    initAOS();
    initBigQuestion();

    // 3. Event Listeners
    setupEventListeners();
});

function setupEventListeners() {
    // Start button
    const startBtn = document.getElementById('startButton');
    if (startBtn) {
        startBtn.addEventListener('click', function () {
            startBackgroundMusic();
            goToSection(1);
        });
    }

    // Continue buttons
    const continueButtons = document.querySelectorAll('.continue-btn');
    continueButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            const nextSection = this.getAttribute('data-next');
            goToSectionByName(nextSection);
        });
    });

    // Progress dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSection(index);
        });
    });

    // Music toggle
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }

    // Utility buttons
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) downloadBtn.addEventListener('click', downloadStory);

    const replayBtn = document.getElementById('replayBtn');
    if (replayBtn) replayBtn.addEventListener('click', replayJourney);
}

/* =====================================================
   CINEMATIC INTRO V2 (ADVANCED ENGINE)
   ===================================================== */

function initCinematicIntroV2() {
    const introContainer = document.getElementById('cinematic-intro');
    const introContent = document.querySelector('.intro-content');
    const canvas = document.getElementById('particle-canvas');
    if (!introContainer || !canvas) return; // Guard clause

    const ctx = canvas.getContext('2d');

    // Resize canvas to full screen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initial State: Prevent scroll
    document.body.style.overflow = 'hidden';

    // INTERACTION: Click to Explode
    introContent.addEventListener('click', function (e) {
        // Prevent multiple clicks
        if (introContent.classList.contains('active')) return;
        introContent.classList.add('active');

        // 1. Start Music (Essential: click unlocks audio context)
        startBackgroundMusic();

        // 2. Play Sound Effect (Simulated for this demo, usually would be a new Audio object)
        // const boom = new Audio('assets/music/boom.mp3'); boom.play();

        // 3. The "Flash" Effect (White out)
        const flash = document.createElement('div');
        flash.style.position = 'fixed';
        flash.style.top = '0'; flash.style.left = '0';
        flash.style.width = '100vw'; flash.style.height = '100vh';
        flash.style.backgroundColor = 'white';
        flash.style.zIndex = '10001';
        flash.style.opacity = '1';
        flash.style.transition = 'opacity 0.2s ease-out';
        flash.style.pointerEvents = 'none';
        document.body.appendChild(flash);

        // Flash fade out fast
        setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 200);
        }, 50);

        // 4. Hide Text Immediately
        introContent.style.opacity = '0';
        introContent.style.transition = 'opacity 0.1s ease';

        // 5. Trigger Particle Explosion
        // Calculate center position based on text location
        const rect = introContent.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        createBigExplosion(ctx, centerX, centerY);

        // 6. Transition to Main Site
        setTimeout(() => {
            introContainer.classList.add('fade-out');

            // Allow scroll and cleanup
            setTimeout(() => {
                document.body.style.overflow = '';
                introContainer.style.display = 'none';

                // Trigger Title Animation
                const mainTitle = document.querySelector('.main-title');
                if (mainTitle) {
                    mainTitle.style.animation = 'none';
                    mainTitle.offsetHeight; /* reflow */
                    mainTitle.style.animation = 'zoomIn 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
                }
            }, 2000); // Wait for fade out
        }, 1500); // Wait for particles to fly a bit
    });
}

// --- PARTICLE ENGINE ---

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 15 + 2; // Explosive speed
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.gravity = 0.2;
        this.drag = 0.96;
        this.life = 1.0;
        this.decay = Math.random() * 0.01 + 0.005;
        this.color = color;
        this.size = Math.random() * 5 + 2;
        this.type = Math.random() > 0.8 ? 'emoji' : 'circle';
        this.emoji = ['🌸', '✨', '❤️', '🌹'][Math.floor(Math.random() * 4)];
    }

    update() {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.life -= this.decay;
        this.size *= 0.99; // Shrink slowly
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;

        if (this.type === 'emoji') {
            ctx.font = `${this.size * 3}px Arial`; // Bigger for emoji
            ctx.fillText(this.emoji, this.x, this.y);
        } else {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Add a "glow" to circles
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
        }

        ctx.restore();
    }
}

let particles = [];
let animationId;

function createBigExplosion(ctx, x, y) {
    const colors = ['#ff6b9d', '#ff9a9e', '#fad0c4', '#ffffff', '#ffd1ff'];

    // Create 400 particles
    for (let i = 0; i < 400; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push(new Particle(x, y, color));
    }

    animateParticles(ctx);
}

function animateParticles(ctx) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Update and draw
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }

    if (particles.length > 0) {
        animationId = requestAnimationFrame(() => animateParticles(ctx));
    } else {
        // Cleanup loop when empty
        cancelAnimationFrame(animationId);
    }
}

/* =====================================================
   CURSOR TRAIL & EFFECTS
   ===================================================== */

function initCursorTrail() {
    const container = document.getElementById('cursorTrail');
    let lastX = 0;
    let lastY = 0;
    if (!container) return;

    document.addEventListener('mousemove', function (e) {
        if (Math.abs(e.clientX - lastX) < 30 && Math.abs(e.clientY - lastY) < 30) return;
        lastX = e.clientX;
        lastY = e.clientY;

        const heart = document.createElement('div');
        heart.className = 'cursor-trail';
        heart.innerHTML = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
        heart.style.left = e.clientX + 'px';
        heart.style.top = e.clientY + 'px';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    });
}

function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.tilt-effect');
    tiltElements.forEach(el => {
        el.addEventListener('mousemove', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        el.addEventListener('mouseleave', function () {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* =====================================================
   SECTION NAVIGATION
   ===================================================== */

function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[currentSection].classList.remove('active');
    dots[currentSection].classList.remove('active');
    currentSection = index;
    sections[currentSection].classList.add('active');
    dots[currentSection].classList.add('active');
    triggerAOSAnimations();
}

function goToSectionByName(name) {
    const sectionNames = ['landing', 'welcome', 'howWeMet', 'memories', 'reasons', 'future', 'question', 'letter'];
    const index = sectionNames.indexOf(name);
    if (index !== -1) goToSection(index);
}

/* =====================================================
   AUDIO CONTROL
   ===================================================== */

function startBackgroundMusic() {
    if (!musicPlaying && bgMusic) {
        bgMusic.volume = 0.5; // Start at 50%
        bgMusic.play().then(() => {
            musicPlaying = true;
            if (musicToggle) {
                musicToggle.style.display = 'block';
                musicToggle.classList.remove('muted');
            }
        }).catch(err => console.log('Music autoplay prevented:', err));
    }
}

function toggleMusic() {
    if (!bgMusic) return;
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.classList.add('muted');
        musicPlaying = false;
    } else {
        bgMusic.play();
        musicToggle.classList.remove('muted');
        musicPlaying = true;
    }
}

/* =====================================================
   STANDARD ANIMATIONS
   ===================================================== */

function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    const hearts = ['❤️', '💕', '💖', '💗', '💓', '💝'];
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
        heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }, 300);
}

function initSecretHearts() {
    const secretHearts = document.querySelectorAll('.secret-heart');
    secretHearts.forEach(heart => {
        heart.addEventListener('click', function () {
            const message = this.getAttribute('data-message');
            showMessage(message);
            this.style.animation = 'bounce 0.5s ease';
            setTimeout(() => this.style.animation = '', 500);
        });
    });
}

function showMessage(message) {
    const msgElement = document.createElement('div');
    msgElement.textContent = message;
    msgElement.style.cssText = `
        position: fixed; top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        background: white; padding: 2rem 3rem;
        border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        font-size: 1.5rem; z-index: 10000;
        animation: scaleIn 0.3s ease;
    `;
    document.body.appendChild(msgElement);
    setTimeout(() => {
        msgElement.style.animation = 'zoomOut 0.3s ease';
        setTimeout(() => msgElement.remove(), 300);
    }, 2000);
}

function initCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.getElementById('carouselIndicators');
    if (!prevBtn || !nextBtn || !indicators) return;

    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = 'carousel-indicator' + (i === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(i));
        indicators.appendChild(indicator);
    }
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    setInterval(() => {
        if (currentSection === 3) goToSlide(currentSlide + 1);
    }, 5000);
}

function goToSlide(index) {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const track = document.getElementById('carouselTrack');
    const indicators = document.querySelectorAll('.carousel-indicator');
    if (slides.length === 0) return;
    slides[currentSlide].classList.remove('active');
    slides[index].classList.add('active');
    indicators[currentSlide].classList.remove('active');
    indicators[index].classList.add('active');
    track.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

function initFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    const totalHeartsElement = document.getElementById('totalHearts');
    const discoveredCountElement = document.getElementById('discoveredCount');
    const collectedHeartsContainer = document.getElementById('collectedHearts');
    if (!totalHeartsElement) return;

    totalHeartsElement.textContent = flipCards.length;
    flipCards.forEach(card => {
        card.addEventListener('click', function () {
            if (!this.classList.contains('flipped')) {
                this.classList.add('flipped');
                discoveredHearts++;
                discoveredCountElement.textContent = discoveredHearts;
                const miniHeart = document.createElement('span');
                miniHeart.className = 'mini-heart';
                miniHeart.textContent = '💖';
                collectedHeartsContainer.appendChild(miniHeart);
            }
        });
    });
}

function initAOS() {
    const aosElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('aos-animate');
        });
    }, { threshold: 0.1 });
    aosElements.forEach(element => observer.observe(element));
}

function triggerAOSAnimations() {
    const currentSectionElement = sections[currentSection];
    const aosElements = currentSectionElement.querySelectorAll('[data-aos]');
    aosElements.forEach(element => {
        element.classList.remove('aos-animate');
        setTimeout(() => element.classList.add('aos-animate'), 100);
    });
}

function initBigQuestion() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const questionContainer = document.querySelector('.question-container');
    const successMessage = document.getElementById('successMessage');
    if (!yesBtn || !noBtn) return;

    yesBtn.addEventListener('click', function () {
        questionContainer.style.display = 'none';
        successMessage.classList.add('show');
        createConfetti();
    });

    const moveNoButton = (e) => {
        e.preventDefault();
        const maxX = window.innerWidth - noBtn.offsetWidth - 100;
        const maxY = window.innerHeight - noBtn.offsetHeight - 100;
        noBtn.style.position = 'fixed';
        noBtn.style.left = Math.random() * maxX + 'px';
        noBtn.style.top = Math.random() * maxY + 'px';
        noBtn.style.animation = 'wiggle 0.3s ease';
        setTimeout(() => noBtn.style.animation = '', 300);
    };
    noBtn.addEventListener('mouseover', moveNoButton);
    noBtn.addEventListener('click', moveNoButton);
}

function createConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const pieces = [];
    const colors = ['#ff6b9d', '#c44569', '#ffc3a0', '#667eea', '#764ba2', '#f093fb'];
    for (let i = 0; i < 150; i++) {
        pieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 5 - 2.5
        });
    }
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        pieces.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
            p.y += p.speedY; p.x += p.speedX; p.rotation += p.rotationSpeed;
            if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
        });
        requestAnimationFrame(animate);
    }
    animate();
    setTimeout(() => ctx.clearRect(0, 0, canvas.width, canvas.height), 10000);
}

function downloadStory() {
    const content = document.querySelector('.letter-content');
    if (!content) return;
    const text = `❤️ OUR LOVE STORY ❤️\n\nHappy Valentine's Day!\n\n${content.innerText}\n\n---\nCreated with love on ${new Date().toLocaleDateString()}`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Our_Love_Story.txt';
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    showMessage('Love story downloaded! 💝');
}

function replayJourney() {
    discoveredHearts = 0;
    currentSlide = 0;
    document.querySelectorAll('.flip-card').forEach(card => card.classList.remove('flipped'));
    document.getElementById('collectedHearts').innerHTML = '';
    document.getElementById('discoveredCount').textContent = '0';
    document.getElementById('successMessage').classList.remove('show');
    document.querySelector('.question-container').style.display = 'block';
    const noBtn = document.getElementById('noBtn');
    noBtn.style.position = 'relative'; noBtn.style.left = 'auto'; noBtn.style.top = 'auto';
    goToSection(0);
    showMessage('Let\'s relive our story again! ❤️');
}

window.addEventListener('resize', function () {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
});