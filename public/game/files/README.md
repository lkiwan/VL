# 💖 Valentine's Day Love Story Website

A beautiful, interactive, and romantic website created to celebrate Valentine's Day with your special someone!

## ✨ Features

- **8 Interactive Sections** with smooth transitions
- **Floating Hearts Animation** on landing page
- **Background Music** (starts on user interaction)
- **Photo Carousel** for memories with auto-advance
- **Flip Cards** revealing reasons you love them
- **The BIG Question** with a hilarious runaway "NO" button!
- **Confetti Celebration** when she says YES!
- **Love Letter** with beautiful styling
- **Downloadable Story** feature
- **Fully Responsive** design (mobile & desktop)
- **Progress Dots** navigation
- **Keyboard Navigation** support

## 📁 Files Included

1. **index.html** - Main website structure
2. **style.css** - Beautiful styling
3. **animations.css** - All animations
4. **script.js** - Interactive functionality
5. **README.md** - This guide

## 🚀 Quick Start Guide

### Step 1: Customize the Text

Open `index.html` and replace these placeholders:

**Line 62:** Replace `[Your Girlfriend's Name]` with her actual name
**Line 617:** Replace `[Your Name]` with your name

**Customize the Love Story (Lines 103-130):**
Replace the placeholder text with your actual love story.

**Customize Memory Captions (Lines 148-245):**
Edit the titles and descriptions for each memory.

**Customize Reasons Cards (Lines 270-412):**
Edit the flip card text with your own reasons.

**Customize Love Letter (Lines 596-611):**
Write your own heartfelt message.

### Step 2: Add Your Photos

**"How We Met" Section:**
- Replace `photo1.jpg`, `photo2.jpg`, `photo3.jpg`
- Upload your photos and update the filenames

**"Memories" Carousel:**
- Replace `memory1.jpg` through `memory6.jpg`
- Update captions for each memory

### Step 3: Add Background Music

1. Find a romantic instrumental song (see Free Music Sources below)
2. Download as MP3
3. Name it `romantic-music.mp3` OR update line 17 in `index.html` with your filename
4. Place the file in the same folder as your HTML files

**Free Music Sources:**
- YouTube Audio Library: https://www.youtube.com/audiolibrary
- Pixabay Music: https://pixabay.com/music/
- Bensound: https://www.bensound.com
- Free Music Archive: https://freemusicarchive.org

### Step 4: Optional - Add Couple Characters

**Where to Create Couple Avatars (FREE):**

1. **Picrew** (https://picrew.me) - Japanese avatar maker
   - Search for "couple" makers
   - Create matching avatars
   - Download and add to your site

2. **YesChat AI** - AI-generated couple avatars
   - Describe yourselves
   - Generate and download

3. **Canva** (https://www.canva.com) - Drag-and-drop
   - Use character builder
   - Create custom illustrations

**To add your couple image:**
Replace the character placeholder section (lines 66-73) with:
```html
<img src="your-couple-image.png" alt="Us" style="max-width: 300px;">
```

## 🌐 How to Make it Live (Deploy)

### Option 1: GitHub Pages (Recommended - FREE)

1. **Create GitHub Account** (if you don't have one)
   - Go to https://github.com
   - Sign up for free

2. **Create New Repository**
   - Click "+" → "New repository"
   - Name it: `valentine-surprise`
   - Make it Public
   - Click "Create repository"

3. **Upload Files**
   - Click "uploading an existing file"
   - Drag all your files (HTML, CSS, JS, photos, music)
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to Settings → Pages
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: `https://yourusername.github.io/valentine-surprise`

5. **Share the Link**
   - Copy the URL and send it to her!

### Option 2: Netlify (Easiest - FREE)

1. Go to https://www.netlify.com
2. Sign up (free)
3. Drag your entire project folder onto Netlify
4. Get instant custom URL
5. Share the link!

### Option 3: Vercel (FREE)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Automatic deployment
5. Get custom URL

### Option 4: Share as ZIP File

1. Put all files in one folder
2. Zip the folder
3. Send via email/USB drive
4. She opens `index.html` in her browser
5. Works offline!

## 🎨 Customization Guide

### Change Colors

Edit `style.css` lines 7-16:

```css
:root {
    --primary-color: #ff6b9d;      /* Change to your color */
    --secondary-color: #c44569;     /* Change to your color */
    --accent-color: #ffc3a0;        /* Change to your color */
}
```

**Color Palette Ideas:**
- Classic Red & Pink: `#ff0000`, `#ff69b4`, `#ffb6c1`
- Purple Romance: `#9b59b6`, `#8e44ad`, `#c39bd3`
- Soft Pastels: `#ffc3a0`, `#ff677d`, `#d4a5a5`

### Change Fonts

The website uses elegant serif fonts. To change:

1. Visit https://fonts.google.com
2. Choose your fonts
3. Copy the link code
4. Replace line 10 in `index.html`
5. Update font names in `style.css`

### Add More Memory Photos

1. Copy a carousel slide block (lines 168-180)
2. Paste before `</div>` of `carousel-track`
3. Update photo filename and caption
4. Update `totalSlides` in `script.js` (line 15)

### Add More Flip Cards

1. Copy a flip card block (lines 282-292)
2. Paste in `flip-cards-container`
3. Update the text
4. Automatically counted!

## 📱 Mobile Optimization

✅ Works perfectly on:
- iPhones (all sizes)
- Android phones
- iPads/Tablets
- Desktop computers

✅ Tested on:
- Chrome
- Safari
- Firefox
- Edge

## 🎯 Pro Tips

1. **Test Before Sharing**: Open the site yourself first to make sure everything works
2. **Compress Images**: Use https://tinypng.com to make photos load faster
3. **Choose Good Photos**: Use clear, well-lit images (minimum 800x800px)
4. **Meaningful Music**: Pick a song that's special to you both
5. **Be Authentic**: Personalize all text - she'll appreciate the effort!
6. **Preview on Phone**: Test on mobile before sending

## 🐛 Common Issues & Fixes

### Photos Not Showing?
- ✓ Check spelling of filenames (case-sensitive!)
- ✓ Make sure photos are in same folder as HTML
- ✓ Try using full file path

### Music Not Playing?
- ✓ Music only starts after clicking "Start" button (browser requirement)
- ✓ Check filename matches in HTML
- ✓ Make sure it's MP3 format
- ✓ File must be in same folder

### NO Button Not Moving?
- ✓ This is intentional! Try hovering over it
- ✓ Works best on desktop/laptop
- ✓ On mobile, touch it to see it run away

### Animations Laggy?
- ✓ Close other browser tabs
- ✓ Compress your images
- ✓ Use newer browser

## 🎁 Creative Ways to Share

1. **QR Code**: Generate a QR code linking to your site and put it in a card
2. **Treasure Hunt**: Leave clues leading to the website URL
3. **Valentine's Card**: Print a beautiful card with the link written inside
4. **Text Reveal**: Send her hints throughout the day, final hint is the link
5. **Breakfast Surprise**: Leave the URL on a note by her coffee

## 🔧 Advanced Customization

### Add Sound Effects

Add celebration sounds:
```html
<audio id="celebration">
    <source src="celebrate.mp3" type="audio/mpeg">
</audio>
```

Play in JavaScript:
```javascript
document.getElementById('celebration').play();
```

### Change Animation Speeds

In `animations.css`, find the animation you want to change:
- Faster: reduce the time (e.g., `2s` → `1s`)
- Slower: increase the time (e.g., `2s` → `4s`)

### Add Custom Domain

1. Buy domain from Namecheap/Google Domains ($10-15/year)
2. Connect to GitHub Pages or Netlify
3. Get custom URL like `ourlovestory2026.com`

## 📝 File Structure

```
valentine-website/
│
├── index.html              # Main page
├── style.css              # Styling
├── animations.css         # Animations
├── script.js              # Functionality
├── README.md              # This file
│
└── assets/                # Create this folder
    ├── photos/            # Your couple photos
    │   ├── photo1.jpg
    │   ├── photo2.jpg
    │   └── photo3.jpg
    │
    ├── memories/          # Memory carousel photos
    │   ├── memory1.jpg
    │   ├── memory2.jpg
    │   ├── memory3.jpg
    │   ├── memory4.jpg
    │   ├── memory5.jpg
    │   └── memory6.jpg
    │
    ├── couple-avatar.png  # Optional couple illustration
    └── romantic-music.mp3 # Background music
```

## ❤️ What Makes This Special

This isn't just a website - it's a digital love letter, a journey through your relationship, and a celebration of your love. The effort you put into customizing it will show her how much you care.

**Remember:**
- Be authentic in your words
- Choose photos that capture your best moments
- Pick music that means something to you both
- Take your time to make it perfect

## 🎊 After She Sees It

The "Download Story" button creates a text file with your love letter that she can keep forever. The "Replay Journey" button lets her experience it all over again.

## 💝 Final Checklist

Before sharing, make sure you've:
- [ ] Replaced girlfriend's name
- [ ] Replaced your name
- [ ] Added all photos
- [ ] Updated all text (story, reasons, letter)
- [ ] Added background music
- [ ] Tested on your phone
- [ ] Tested on desktop
- [ ] Checked all links work
- [ ] Fixed any typos
- [ ] Made it truly yours

## 📞 Need Help?

If something's not working:
1. Check this README first
2. Search the error online
3. Try a different browser
4. Check browser console (press F12)

## 🌟 Make it Memorable

This Valentine's Day, show her how much she means to you with this personalized website. It's not about the code - it's about the love and thought behind it.

**Happy Valentine's Day! 💖**

---

*Created with ❤️ for love stories everywhere*

**Remember**: The most romantic part isn't the animations or effects - it's the personal touch YOU add to every section!