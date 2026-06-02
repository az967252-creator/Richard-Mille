# Richard Mille Website - Specification Document

## 1. Project Overview

- **Project Name**: Richard Mille Official Website Clone
- **Project Type**: Single-page luxury brand website
- **Core Functionality**: Showcase Richard Mille watches with video hero section, elegant black/white/orange color scheme
- **Target Users**: Luxury watch enthusiasts, collectors, potential buyers

## 2. UI/UX Specification

### Layout Structure

**Header (Fixed)**
- Logo on left (Richard Mille wordmark)
- Navigation links: COLLECTIONS | TIMEPIECES | HERITAGE | BOUTIQUES | CONTACT
- Height: 80px
- Background: Transparent (becomes black on scroll)

**Hero Section**
- Full-screen video background
- Video source: Use a luxury watch video from stock footage
- Overlay text centered: "MASTERPIECE OF INNOVATION"
- CTA button: "DISCOVER THE COLLECTION"

**Collections Section**
- Grid layout (3 columns on desktop, 1 on mobile)
- Featured watch cards with image, name, price

**About Section**
- Split layout: Text left, image right
- Brand story and philosophy

**Footer**
- Newsletter signup
- Social media links
- Copyright notice

### Visual Design

**Color Palette**
- Primary Black: `#0A0A0A`
- Secondary Black: `#1A1A1A`
- Primary White: `#FFFFFF`
- Secondary White: `#F5F5F5`
- Accent Orange: `#FF6B00` (Richard Mille signature orange)
- Accent Orange Light: `#FF8533`
- Accent Orange Dark: `#CC5500`

**Typography**
- Headings: "Bodoni Moda" (elegant serif) - Google Fonts
- Body: "Outfit" (modern sans-serif) - Google Fonts
- Logo/Brand: Custom letter-spacing, uppercase

**Font Sizes**
- Hero Title: 72px (desktop), 36px (mobile)
- Section Titles: 48px (desktop), 32px (mobile)
- Body Text: 18px
- Navigation: 14px, letter-spacing: 3px
- Buttons: 14px, letter-spacing: 2px

**Spacing System**
- Section Padding: 100px vertical (desktop), 60px (mobile)
- Container Max Width: 1400px
- Grid Gap: 30px

**Visual Effects**
- Video overlay: Linear gradient from rgba(0,0,0,0.3) to rgba(0,0,0,0.7)
- Card hover: Scale 1.02, shadow increase
- Button hover: Background color shift to orange
- Smooth scroll behavior
- Fade-in animations on scroll

### Components

**Navigation**
- States: Default (transparent), Scrolled (black background)
- Mobile: Hamburger menu with slide-in drawer

**Buttons**
- Primary: Black background, white text, orange border
- Hover: Orange background, black text

**Watch Cards**
- Image container with aspect ratio 1:1
- Watch name (Bodoni Moda)
- Price (Outfit)
- "View Details" link

**Video Hero**
- Autoplay, muted, loop
- Fallback image for mobile
- Dark overlay for text readability

## 3. Functionality Specification

### Core Features
1. Responsive navigation with mobile menu
2. Video hero section with autoplay
3. Smooth scroll to sections
4. Scroll-triggered fade animations
5. Newsletter form (visual only)
6. Watch collection grid display

### User Interactions
- Click navigation → smooth scroll to section
- Hover watch card → scale effect
- Click CTA → scroll to collections
- Scroll → header background change, animations trigger

### Edge Cases
- Video fails to load → show fallback background image
- Mobile viewport → hamburger menu activates below 768px

## 4. Acceptance Criteria

1. ✓ Hero section plays video automatically
2. ✓ All text uses specified fonts (Bodoni Moda, Outfit)
3. ✓ Color scheme matches black/white/orange palette
4. ✓ Navigation is fixed and changes on scroll
5. ✓ Website is fully responsive
6. ✓ Hover effects work on buttons and cards
7. ✓ Animations trigger on scroll
8. ✓ All sections are accessible via navigation

## 5. File Structure

```
/Richard Mille/
├── index.html
├── styles.css
├── script.js
└── SPEC.md
```

## 6. External Resources

**Fonts (Google Fonts)**
- Bodoni Moda: https://fonts.google.com/specimen/Bodoni+Moda
- Outfit: https://fonts.google.com/specimen/Outfit

**Video Source**
- Use royalty-free luxury watch video from Pexels or similar

**Images**
- Richard Mille watch images (use placeholder luxury watch images)
