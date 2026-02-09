// Letter Content and Management
// This file contains the romantic story sections and the logic to display them.

const letters = [
    {
        id: 'letter1',
        title: "How We Met",
        content: `
            <div class="welcome-content">
                <h1 class="welcome-title">Happy Valentine's Day</h1>
                <h2 class="girlfriend-name">Chaymae</h2>
                
                <div class="couple-container">
                    <div class="character-placeholder">
                        <div class="char-circle char-left"></div>
                        <div class="char-circle char-right"></div>
                        <div class="heart-between">❤️</div>
                    </div>
                </div>
                <p class="welcome-text">I created this special journey to show you how much you mean to me...</p>
            </div>

            <div class="timeline">
                <div class="timeline-item aos-animate">
                    <div class="timeline-content">
                        <div class="photo-placeholder tilt-effect">
                            <img src="photos/photo1.jpeg" alt="Our first meeting" class="story-photo" style="display:block;">
                        </div>
                        <p class="story-text">
                            From the moment I saw you, I knew there was something special. 
                            Your smile lit up the entire room, and I couldn't help but be drawn to you.
                        </p>
                    </div>
                </div>

                <div class="timeline-item aos-animate">
                    <div class="timeline-content">
                        <p class="story-text">
                            That first conversation we had felt like time stood still. 
                            Every word, every laugh, every moment was perfect.
                        </p>
                        <div class="photo-placeholder tilt-effect">
                            <img src="photos/photo2.jpeg" alt="Early days" class="story-photo" style="display:block;">
                        </div>
                    </div>
                </div>

                <div class="timeline-item aos-animate">
                    <div class="timeline-content">
                        <div class="photo-placeholder tilt-effect">
                            <img src="photos/photo3.jpeg" alt="Together" class="story-photo" style="display:block;">
                        </div>
                        <p class="story-text">
                            And just like that, I fell completely and hopelessly in love with you.
                        </p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'letter2',
        title: "Our Memories",
        content: `
            <div class="carousel-container">
                <button class="carousel-btn prev" id="modalPrevBtn">❮</button>
                <div class="carousel">
                    <div class="carousel-track" id="modalCarouselTrack">
                        <div class="carousel-slide active">
                            <div class="memory-card">
                                <div class="memory-photo"><img src="photos/photo1.jpeg" style="display:block;"></div>
                                <div class="memory-caption"><h3>Our First Adventure</h3><p>Every moment with you is an adventure.</p></div>
                            </div>
                        </div>
                        <div class="carousel-slide">
                            <div class="memory-card">
                                <div class="memory-photo"><img src="photos/photo2.jpeg" style="display:block;"></div>
                                <div class="memory-caption"><h3>That Special Evening</h3><p>One of the best nights of my life.</p></div>
                            </div>
                        </div>
                        <div class="carousel-slide">
                            <div class="memory-card">
                                <div class="memory-photo"><img src="photos/photo3.jpeg" style="display:block;"></div>
                                <div class="memory-caption"><h3>Pure Happiness</h3><p>Your smile melts my heart.</p></div>
                            </div>
                        </div>
                    </div>
                </div>
                <button class="carousel-btn next" id="modalNextBtn">❯</button>
            </div>
        `
    },
    {
        id: 'letter3',
        title: "Reasons I Love You",
        content: `
            <div class="reasons-container">
                <p class="reasons-subtitle">Click each heart to discover why you're so special</p>
                <div class="flip-cards-container">
                    <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div class="heart-icon">💖</div></div><div class="flip-card-back"><p>Your Beautiful Smile</p></div></div></div>
                    <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div class="heart-icon">💕</div></div><div class="flip-card-back"><p>The Way You Laugh</p></div></div></div>
                    <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div class="heart-icon">💗</div></div><div class="flip-card-back"><p>Your Kind Heart</p></div></div></div>
                    <div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><div class="heart-icon">💝</div></div><div class="flip-card-back"><p>Your Intelligence</p></div></div></div>
                </div>
            </div>
        `
    },
    {
        id: 'letter4',
        title: "Our Future",
        content: `
            <div class="future-container">
                <div class="future-timeline">
                    <div class="future-item aos-animate">
                        <div class="future-icon">🌟</div>
                        <h3>More Adventures</h3>
                        <p>Exploring the world together</p>
                    </div>
                    <div class="future-item aos-animate">
                        <div class="future-icon">🏡</div>
                        <h3>Building Our Home</h3>
                        <p>Creating a space filled with love</p>
                    </div>
                </div>
            </div>
        `
    },
    {
        id: 'letter5',
        title: "The Question",
        content: `
            <div class="question-container" style="padding: 2rem; background: rgba(0,0,0,0.05); border-radius: 20px;">
                <h1 class="big-question" style="color: #ff6b9d; font-size: 2.5rem;">Will You Be My Valentine?</h1>
                <div class="buttons-container">
                    <button id="modalYesBtn" class="answer-btn yes-btn">YES! ❤️</button>
                    <button id="modalNoBtn" class="answer-btn no-btn">No</button>
                </div>
            </div>
        `
    }
];

let currentLetterIndex = 0;

function showLetter(index) {
    if (index < 0 || index >= letters.length) return;
    currentLetterIndex = index;

    const letter = letters[index];
    const overlay = document.getElementById('letter-overlay');
    const titleEl = document.getElementById('letter-title');
    const contentEl = document.getElementById('letter-content');

    titleEl.textContent = letter.title;
    contentEl.innerHTML = letter.content;

    overlay.classList.remove('hidden');
    overlay.classList.add('show');

    // Initialize interactive elements based on which letter is shown
    setTimeout(() => {
        if (index === 1) initModalCarousel();
        if (index === 2) initModalFlipCards();
        if (index === 4) initModalBigQuestion();
    }, 100);
}

function hideLetter() {
    const overlay = document.getElementById('letter-overlay');
    overlay.classList.remove('show');
    setTimeout(() => {
        overlay.classList.add('hidden');
        if (currentLetterIndex === letters.length - 1 && window.hasSaidYes) {
            triggerFinale();
        }
    }, 500);
}

function nextLetter() {
    hideLetter();
}

// --- Interactive Components for Modals ---

function initModalCarousel() {
    let currentSlide = 0;
    const track = document.getElementById('modalCarouselTrack');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('modalPrevBtn');
    const nextBtn = document.getElementById('modalNextBtn');
    if (!track || !prevBtn || !nextBtn) return;

    function goToSlide(n) {
        if (n < 0) n = slides.length - 1;
        if (n >= slides.length) n = 0;
        slides[currentSlide].classList.remove('active');
        slides[n].classList.add('active');
        track.style.transform = `translateX(-${n * 100}%)`;
        currentSlide = n;
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
}

function initModalFlipCards() {
    const cards = document.querySelectorAll('.flip-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

function initModalBigQuestion() {
    const yesBtn = document.getElementById('modalYesBtn');
    const noBtn = document.getElementById('modalNoBtn');
    if (!yesBtn || !noBtn) return;

    yesBtn.addEventListener('click', () => {
        window.hasSaidYes = true;
        document.querySelector('.question-container').innerHTML = `
            <h1 class="welcome-title" style="color: #ff6b9d; font-size: 3rem;">I knew you'd say Yes! ❤️</h1>
            <p class="welcome-text">You've made me the happiest person ever.</p>
        `;
        // Create some small confetti inside the modal?
    });

    noBtn.addEventListener('mouseover', () => {
        const maxX = 200;
        const maxY = 200;
        noBtn.style.transform = `translate(${(Math.random() - 0.5) * maxX}px, ${(Math.random() - 0.5) * maxY}px)`;
    });
}

window.showLetter = showLetter;
window.hideLetter = hideLetter;
window.letters = letters;
