// ===================================================
// VALENTINE'S DAY WEBSITE - CONFIGURATION FILE
// ===================================================

export interface Memory {
    title: string;
    description: string;
    image: string;
}

export interface FutureItem {
    icon: string;
    title: string;
    description: string;
}

export const CONFIG = {
    // ============ PERSONAL INFORMATION ============
    GIRLFRIEND_NAME: "Chaymae",
    YOUR_NAME: "Omar",

    // ============ CINEMATIC INTRO ============
    INTRO_ENABLED: true,
    INTRO_TEXT_LINE1: "Happy Valentine's Day My Love",
    // Line 2 is auto-filled with GIRLFRIEND_NAME in the code

    // ============ IMAGES ============
    // Using placeholder images for demonstration. 
    // Replace these URLs with local paths like "images/story/photo1.jpg"
    IMAGES: {
        COUPLE_AVATAR: "/music/pics/Avatar.PNG",

        // How We Met section
        STORY_PHOTO_1: "https://picsum.photos/800/800?random=2",
        STORY_PHOTO_2: "https://picsum.photos/800/800?random=3",
        STORY_PHOTO_3: "https://picsum.photos/800/800?random=4",

        // Memories carousel
        MEMORY_PHOTO_1: "https://picsum.photos/1200/800?random=5",
        MEMORY_PHOTO_2: "https://picsum.photos/1200/800?random=6",
        MEMORY_PHOTO_3: "https://picsum.photos/1200/800?random=7",
        MEMORY_PHOTO_4: "https://picsum.photos/1200/800?random=8",
        MEMORY_PHOTO_5: "https://picsum.photos/1200/800?random=9",
        MEMORY_PHOTO_6: "https://picsum.photos/1200/800?random=10",

        // Background montage
        LETTER_BG_1: "https://picsum.photos/1200/800?random=11",
    },

    // ============ MUSIC ============
    // Replace with a valid .mp3 path
    BACKGROUND_MUSIC: "/music/Laufey - From The Start (Official Music Video) - Copie.mp3",

    // ============ STORY TEXT ============
    STORY_PARAGRAPHS: [
        "From the moment I saw you, I knew there was something special. Your smile lit up the entire room, and I couldn't help but be drawn to you.",
        "That first conversation we had felt like time stood still. Every word, every laugh, every moment was perfect.",
        "And just like that, I fell completely and hopelessly in love with you."
    ],

    // ============ MEMORY CAPTIONS ============
    MEMORY_CAPTIONS: [
        {
            title: "Our First Adventure",
            description: "Remember this amazing day? Every moment with you is an adventure."
        },
        {
            title: "That Special Evening",
            description: "One of the best nights of my life, just being with you."
        },
        {
            title: "Making Memories",
            description: "Every photo tells a story, and I love our story."
        },
        {
            title: "Pure Happiness",
            description: "Your smile in this photo melts my heart every time."
        },
        {
            title: "Together Forever",
            description: "Building beautiful memories, one moment at a time."
        },
        {
            title: "My Favorite Person",
            description: "Creating countless memories with you is my favorite thing."
        }
    ] as Omit<Memory, 'image'>[], // Helper type to match structure

    // ============ REASONS I LOVE YOU ============
    LOVE_REASONS: [
        "Your Beautiful Smile",
        "The Way You Laugh",
        "Your Kind Heart",
        "Your Intelligence",
        "How You Care for Others",
        "Your Sense of Humor",
        "How You Make Me Feel",
        "Your Passion for Life",
        "The Way You Support Me",
        "Your Beautiful Eyes",
        "How You Understand Me",
        "Everything About You"
    ],

    // ============ SECRET HEARTS MESSAGES ============
    SECRET_MESSAGES: [
        "You make every day brighter! ☀️",
        "I love your laugh! 😊",
        "You're my best friend! 🌟"
    ],

    // ============ FUTURE DREAMS ============
    FUTURE_ITEMS: [
        {
            icon: "🌟",
            title: "More Adventures",
            description: "Exploring the world together, creating memories everywhere we go"
        },
        {
            icon: "🏡",
            title: "Building Our Home",
            description: "Creating a space filled with love, laughter, and happiness"
        },
        {
            icon: "💑",
            title: "Growing Together",
            description: "Supporting each other's dreams and growing stronger every day"
        },
        {
            icon: "❤️",
            title: "Forever Love",
            description: "A lifetime of love, happiness, and being together"
        }
    ] as FutureItem[],

    // ============ LOVE LETTER ============
    LOVE_LETTER: {
        greeting: "My Dearest Love,",
        paragraphs: [
            "As I sit here writing this, my heart is overflowing with love for you. Words can barely capture what you mean to me, but I'll try...",
            "You are my sunshine on cloudy days, my anchor in stormy seas, and my greatest adventure. Every moment with you is a treasure, every laugh we share is a melody, and every day with you is a blessing.",
            "You've shown me what true love really means. You've taught me patience, kindness, and the beauty of simply being together. You make me want to be a better person, not because I have to, but because you inspire me to be.",
            "I promise to love you fiercely and gently, to support your dreams, to make you laugh when you're sad, to hold you when you need comfort, and to dance with you in both the sunshine and the rain.",
            "Thank you for choosing me, for loving me, for being you. You are my today and all of my tomorrows."
        ],
        signature: "Forever yours,"
    }
};
