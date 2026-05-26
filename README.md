# Wedding Online Invitation

A beautiful, animated wedding invitation built with Next.js 16, React 19, and Tailwind CSS 4.

## 🎨 Features

- **Elegant Envelope Animation**: Interactive opening sequence
- **Parallax Hero Section**: Smooth scrolling effects
- **Particle System**: Floating petal animations
- **Responsive Timeline**: Beautiful love story presentation
- **Countdown Timer**: Real-time countdown to the big day
- **RSVP Form**: Integrated guest response system
- **Photo Gallery**: Pre-wedding photo showcase
- **Optimized Performance**: Built with Next.js for speed

## 🏗️ Architecture

This project follows SOLID principles with a clean, maintainable structure:

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/
│   ├── invitation/        # Wedding-specific components
│   │   ├── WeddingInvitation.tsx    # Main orchestrator
│   │   ├── EnvelopeAnimation.tsx    # Opening animation
│   │   ├── HeroSection.tsx          # Hero with parallax
│   │   ├── StoryTimeline.tsx        # Love story timeline
│   │   ├── CelebrationDetails.tsx   # Event details
│   │   ├── PhotoGallery.tsx         # Photo grid
│   │   ├── Countdown.tsx            # Countdown timer
│   │   ├── RSVPForm.tsx             # RSVP form
│   │   └── Footer.tsx               # Footer section
│   └── shared/            # Reusable components
│       ├── MaterialIcon.tsx         # Icon wrapper
│       ├── GlassCard.tsx            # Glass morphism card
│       └── ParticleCanvas.tsx       # Particle animation
├── hooks/                 # Custom React hooks
│   ├── useCountdown.ts    # Countdown logic
│   ├── useScrollReveal.ts # Scroll animations
│   └── useParallax.ts     # Parallax effect
├── config/                # Configuration files
│   └── wedding.config.json # All wedding data & images
└── types/                 # TypeScript definitions
    └── wedding.types.ts   # Type definitions
```

## 🎯 SOLID Principles Applied

1. **Single Responsibility**: Each component has one clear purpose
2. **Open/Closed**: Components are extensible through props
3. **Liskov Substitution**: Proper component composition and inheritance
4. **Interface Segregation**: Minimal, specific props interfaces
5. **Dependency Inversion**: Custom hooks abstract business logic

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the invitation.

## ⚙️ Configuration

Edit `src/config/wedding.config.json` to customize:

- Couple names
- Wedding date and time
- Story timeline events
- Event locations
- Gallery images
- RSVP form fields

## 🎨 Customization

### Colors

Colors are defined in `src/app/globals.css` using CSS variables. Modify the root variables to change the theme.

### Typography

Fonts are configured in `src/app/layout.tsx`:
- **Display**: Playfair Display
- **Body**: Manrope

### Images

Update image URLs in `src/config/wedding.config.json`. The app uses Next.js Image component for optimization.

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Fonts**: Google Fonts (Playfair Display, Manrope)
- **Icons**: Material Symbols

## 📱 Responsive Design

The invitation is fully responsive and optimized for:
- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support for animations
- Proper color contrast ratios

## 📄 License

This project is private and intended for personal use.