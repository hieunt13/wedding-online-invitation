# Architecture Documentation

## Overview

This wedding invitation application is built with Next.js 16, React 19, and TypeScript, following SOLID principles for maintainable, scalable code.

## SOLID Principles Implementation

### 1. Single Responsibility Principle (SRP)

Each component and module has a single, well-defined purpose:

#### Components
- **`EnvelopeAnimation`**: Handles only the opening animation sequence
- **`HeroSection`**: Displays hero content with parallax effect
- **`StoryTimeline`**: Renders the couple's love story timeline
- **`CelebrationDetails`**: Shows wedding event information
- **`PhotoGallery`**: Displays pre-wedding photos
- **`Countdown`**: Manages and displays the countdown timer
- **`RSVPForm`**: Handles RSVP form logic and submission
- **`Footer`**: Displays footer content
- **`WeddingInvitation`**: Main orchestrator that composes all sections

#### Hooks
- **`useCountdown`**: Manages countdown logic only
- **`useScrollReveal`**: Handles scroll-based reveal animations
- **`useParallax`**: Implements parallax scrolling effect

#### Shared Components
- **`MaterialIcon`**: Renders Material icons with proper styling
- **`GlassCard`**: Provides glass morphism card UI
- **`ParticleCanvas`**: Manages particle animation system

### 2. Open/Closed Principle (OCP)

Components are **open for extension** but **closed for modification**:

```typescript
// Example: GlassCard is extensible via props
interface GlassCardProps {
  children: ReactNode;
  className?: string;  // Allows extension without modification
}

// TimelineEvent can accept different event types
interface TimelineEventProps {
  event: StoryEvent;  // Interface-based, can be extended
}
```

### 3. Liskov Substitution Principle (LSP)

Components can be substituted with their specialized versions without breaking functionality:

```typescript
// All form field types (text, tel, textarea) implement the same interface
interface FormFieldProps {
  field: RSVPField;
  value: string;
  onChange: (e: React.ChangeEvent<...>) => void;
}

// Each celebration event (ceremony, reception) follows the same contract
interface EventCardProps {
  event: CelebrationEvent;
}
```

### 4. Interface Segregation Principle (ISP)

Components receive only the props they need:

```typescript
// HeroSection only gets what it needs
interface HeroSectionProps {
  bride: string;
  groom: string;
  date: string;
  heroImage: string;
}

// Footer only gets what it needs
interface FooterProps {
  bride: string;
  groom: string;
  date: string;
}

// No component is forced to depend on props it doesn't use
```

### 5. Dependency Inversion Principle (DIP)

High-level components depend on abstractions (interfaces/types), not concrete implementations:

```typescript
// WeddingInvitation depends on the WeddingConfig interface
interface WeddingInvitationProps {
  config: WeddingConfig;  // Abstract interface
}

// Custom hooks abstract business logic
function useCountdown(targetDate: string): CountdownTime {
  // Implementation details hidden
}
```

## Project Structure

```
src/
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout with fonts
│   ├── page.tsx                   # Home page (entry point)
│   └── globals.css                # Global styles
│
├── components/
│   ├── invitation/                # Domain-specific components
│   │   ├── WeddingInvitation.tsx  # Main orchestrator (Facade pattern)
│   │   ├── EnvelopeAnimation.tsx  # Opening sequence
│   │   ├── HeroSection.tsx        # Hero with parallax
│   │   ├── StoryTimeline.tsx      # Love story timeline
│   │   ├── CelebrationDetails.tsx # Event details
│   │   ├── PhotoGallery.tsx       # Photo grid
│   │   ├── Countdown.tsx          # Countdown timer
│   │   ├── RSVPForm.tsx           # RSVP form
│   │   └── Footer.tsx             # Footer section
│   │
│   └── shared/                    # Reusable UI components
│       ├── MaterialIcon.tsx       # Icon wrapper
│       ├── GlassCard.tsx          # Glass morphism card
│       └── ParticleCanvas.tsx     # Particle animation
│
├── hooks/                         # Custom React hooks (logic abstraction)
│   ├── useCountdown.ts            # Countdown logic
│   ├── useScrollReveal.ts         # Scroll animations
│   └── useParallax.ts             # Parallax effect
│
├── config/                        # Configuration (data layer)
│   └── wedding.config.json        # All wedding data & images
│
└── types/                         # TypeScript definitions (contracts)
    └── wedding.types.ts           # Type definitions
```

## Design Patterns Used

### 1. **Facade Pattern**
`WeddingInvitation` acts as a facade, providing a simple interface to the complex subsystems of different sections.

### 2. **Strategy Pattern**
Form fields use different rendering strategies based on their type (text, tel, textarea).

### 3. **Observer Pattern**
Custom hooks like `useScrollReveal` and `useParallax` observe browser events and update UI accordingly.

### 4. **Composite Pattern**
Timeline and gallery components compose child components into tree structures.

### 5. **Dependency Injection**
All components receive their dependencies (data, callbacks) via props.

## Data Flow

```
wedding.config.json (Source of Truth)
        ↓
WeddingInvitation (Orchestrator)
        ↓
Individual Sections (Props-based)
        ↓
Shared Components (Reusable)
```

## Component Communication

1. **Props Down**: Parent components pass data to children via props
2. **Events Up**: Child components notify parents via callback functions
3. **Context-Free**: No global state management needed (configuration-driven)
4. **Server Components**: Most components are server-rendered (default in Next.js 16)
5. **Client Components**: Only interactive components use `"use client"` directive

## Benefits of This Architecture

### Maintainability
- Each file has a clear, single purpose
- Easy to locate and modify specific functionality
- Changes to one component don't affect others

### Scalability
- New sections can be added without modifying existing code
- Easy to extend functionality through props
- Components can be reused across different pages

### Testability
- Components have minimal dependencies
- Pure functions and hooks are easy to unit test
- Mock data can be injected via props

### Performance
- Server components reduce client-side JavaScript
- Code splitting happens automatically per component
- Images are optimized via Next.js Image component
- Animations use CSS transforms (GPU-accelerated)

### Type Safety
- Full TypeScript coverage
- Interface-based design catches errors at compile time
- Autocomplete and IntelliSense in IDEs

## Configuration-Driven Design

All content is centralized in `wedding.config.json`:

```json
{
  "couple": { ... },
  "images": { ... },
  "story": [ ... ],
  "events": [ ... ],
  "rsvp": { ... }
}
```

**Benefits:**
- Non-developers can update content
- Easy to create multiple wedding invitations from the same codebase
- Separation of data and presentation logic
- Version control for content changes

## Performance Optimizations

1. **Server-Side Rendering**: Most components render on the server
2. **Image Optimization**: Next.js Image component with lazy loading
3. **Code Splitting**: Automatic per-route and per-component
4. **CSS-in-JS Alternative**: Tailwind CSS for minimal runtime cost
5. **Memoization**: `useCallback` prevents unnecessary re-renders
6. **Canvas Optimization**: Particle system uses requestAnimationFrame

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy, sections, and landmarks
2. **ARIA Labels**: Where semantic HTML isn't sufficient
3. **Keyboard Navigation**: All interactive elements are keyboard-accessible
4. **Reduced Motion**: Respects `prefers-reduced-motion` media query
5. **Color Contrast**: WCAG 2.1 AA compliant color ratios
6. **Focus Indicators**: Visible focus states for all interactive elements

## Responsive Design Strategy

1. **Mobile-First**: Base styles for mobile, enhanced for larger screens
2. **Breakpoints**: Using Tailwind's responsive utilities (md:, lg:)
3. **Fluid Typography**: Responsive font sizes
4. **Flexible Layouts**: Flexbox and Grid for adaptive layouts
5. **Touch-Friendly**: Minimum 44x44px touch targets

## Future Enhancements

### Easy to Add:
- Multiple language support (i18n)
- Dark mode toggle
- Gallery lightbox
- Map integration for venues
- Guest list management
- Gift registry links
- Photo upload by guests
- Live streaming integration
- Guest book comments
- Save-the-date reminders

All these can be added without breaking existing code, thanks to the modular architecture.

## Folder Structure Rationale

```
components/
├── invitation/     # Domain-specific, co-located by feature
└── shared/         # Generic, reusable across domains

hooks/              # Custom logic, reusable state management
config/             # Data layer, easily modifiable
types/              # Type contracts, single source of truth
```

This structure promotes:
- **Feature co-location**: Related files are grouped
- **Clear boundaries**: Shared vs domain-specific
- **Easy navigation**: Predictable file locations
- **Scalability**: New features get their own folder

## Conclusion

This architecture demonstrates professional React development practices:
- **SOLID principles** ensure maintainability
- **TypeScript** provides type safety
- **Next.js 16** offers modern features
- **Configuration-driven** design enables flexibility
- **Component-based** architecture promotes reusability

The result is a production-ready, maintainable, and beautiful wedding invitation application.
