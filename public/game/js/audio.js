// Audio Management
let musicPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

function initAudio() {
    if (musicToggle) {
        musicToggle.addEventListener('click', toggleMusic);
    }
}

function startBackgroundMusic() {
    if (!musicPlaying && bgMusic) {
        bgMusic.volume = 0.5;
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

// Global exposure
window.startBackgroundMusic = startBackgroundMusic;

document.addEventListener('DOMContentLoaded', initAudio);
