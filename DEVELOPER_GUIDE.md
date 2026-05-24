# Developer Guide

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Project Overview

This is a Next.js 16 wedding invitation application built with:
- **React 19** - Latest React with improved performance
- **TypeScript** - Type safety throughout
- **Tailwind CSS 4** - Utility-first styling
- **Next.js Image** - Optimized image loading

## Working with the Codebase

### Updating Wedding Content

All wedding content is in `src/config/wedding.config.json`:

```json
{
  "couple": {
    "bride": "Evelyn",
    "groom": "Julian",
    "weddingDate": "2024-12-24T16:00:00"
  },
  "images": {
    "hero": "https://...",
    "gallery": [...]
  },
  "story": [...],
  "events": [...],
  "rsvp": {...}
}
```

**To customize:**
1. Edit the JSON file
2. Save - hot reload will update the page
3. No code changes needed!

### Adding New Images

1. Add image URL to `wedding.config.json`
2. Ensure URL is in `next.config.ts` remote patterns:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-domain.com",
      pathname: "/path/**",
    },
  ],
}
```

### Creating New Components

Follow this structure:

```typescript
// src/components/[domain]/ComponentName.tsx

import type { PropsInterface } from "@/types/wedding.types";

interface ComponentNameProps {
  // Define minimal props needed
  requiredProp: string;
  optionalProp?: number;
}

export function ComponentName({ requiredProp, optionalProp }: ComponentNameProps) {
  return (
    <section className="py-section-gap px-margin-mobile">
      {/* Component content */}
    </section>
  );
}
```

**Best practices:**
- ✅ Use descriptive names
- ✅ Define TypeScript interfaces
- ✅ Export as named exports
- ✅ Add className prop for extensibility
- ✅ Use semantic HTML

### Creating Custom Hooks

```typescript
// src/hooks/useYourHook.ts

"use client"; // If hook uses client-side APIs

import { useState, useEffect } from "react";

export function useYourHook(param: string) {
  const [state, setState] = useState<Type>(initialValue);

  useEffect(() => {
    // Side effects here
  }, [param]);

  return state;
}
```

### Adding New Sections

1. **Create component** in `src/components/invitation/`:

```typescript
// NewSection.tsx
export function NewSection({ data }: NewSectionProps) {
  return <section>...</section>;
}
```

2. **Add to types** in `src/types/wedding.types.ts`:

```typescript
export interface NewSectionData {
  title: string;
  content: string;
}
```

3. **Update config** in `src/config/wedding.config.json`:

```json
{
  "newSection": {
    "title": "...",
    "content": "..."
  }
}
```

4. **Import in main component** `src/components/invitation/WeddingInvitation.tsx`:

```typescript
import { NewSection } from "./NewSection";

// In render:
<NewSection data={config.newSection} />
```

## Styling Guide

### Using Tailwind Classes

```typescript
// Responsive design
<div className="px-margin-mobile md:px-margin-desktop" />

// Custom spacing
<div className="py-section-gap" />

// Typography
<h1 className="font-display-lg text-display-lg" />
<p className="font-body-md text-body-md" />

// Colors
<div className="bg-primary text-on-primary" />
```

### Custom Spacing

Defined in `tailwind.config.ts`:
- `section-gap` - 120px (spacing between sections)
- `unit` - 8px (base unit)
- `margin-mobile` - 20px
- `margin-desktop` - 64px
- `gutter` - 24px (gap between grid items)

### Typography System

| Class | Font | Size | Use Case |
|-------|------|------|----------|
| `text-display-lg` | Playfair Display | 64px | Main headings (desktop) |
| `text-display-lg-mobile` | Playfair Display | 40px | Main headings (mobile) |
| `text-headline-md` | Playfair Display | 32px | Section titles |
| `text-headline-sm` | Playfair Display | 24px | Subsection titles |
| `text-body-lg` | Manrope | 18px | Large body text |
| `text-body-md` | Manrope | 16px | Regular body text |
| `text-detail-sm` | Manrope | 14px | Small details |
| `text-label-caps` | Manrope | 12px | Uppercase labels |

### Color System

Material Design color palette:
- `primary` - Main brand color (dark green)
- `secondary` - Accent color (olive green)
- `tertiary` - Tertiary color (gold)
- `surface` - Background surfaces
- `on-primary` - Text on primary color
- `outline` - Borders and dividers

## Animation Guide

### Scroll Reveal

Add `reveal-on-scroll` class to any element:

```typescript
<div className="reveal-on-scroll">
  Content fades in on scroll
</div>
```

The `useScrollReveal` hook automatically handles this.

### Custom Animations

```css
/* Add to globals.css */
@keyframes customAnimation {
  from { ... }
  to { ... }
}

.custom-class {
  animation: customAnimation 1s ease-in-out;
}
```

## Common Tasks

### Change Wedding Date

Edit `wedding.config.json`:

```json
{
  "couple": {
    "weddingDate": "2025-06-15T16:00:00"
  }
}
```

### Add Story Timeline Event

Add to `story` array in `wedding.config.json`:

```json
{
  "story": [
    {
      "season": "Summer 2023",
      "title": "The Adventure",
      "description": "A memorable trip that brought us closer."
    }
  ]
}
```

### Add RSVP Field

Add to `rsvp.fields` in `wedding.config.json`:

```json
{
  "rsvp": {
    "fields": [
      {
        "name": "dietary",
        "label": "DIETARY RESTRICTIONS",
        "type": "text",
        "placeholder": "Any dietary needs?",
        "required": false
      }
    ]
  }
}
```

Update the type in `wedding.types.ts`:

```typescript
export interface RSVPFormData {
  fullName: string;
  phone: string;
  wishes?: string;
  dietary?: string; // Add new field
}
```

### Connect Real RSVP Backend

Replace the mock submission in `RSVPForm.tsx`:

```typescript
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Replace with your API endpoint
    const response = await fetch('/api/rsvp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error('Submission failed');
    
    setIsSubmitted(true);
  } catch (error) {
    console.error('RSVP submission error:', error);
    // Handle error (show error message to user)
  } finally {
    setIsSubmitting(false);
  }
};
```

## Troubleshooting

### Build Errors

**Issue**: TypeScript errors during build

```bash
# Check for type errors
npx tsc --noEmit
```

**Issue**: Linting errors

```bash
# Run linter
npm run lint

# Auto-fix where possible
npx eslint --fix
```

### Image Loading Issues

**Issue**: Images not loading from external domain

**Solution**: Add domain to `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "your-domain.com",
    },
  ],
}
```

### Animation Performance

**Issue**: Animations are laggy

**Solutions:**
1. Reduce number of particles (edit `ParticleCanvas.tsx`)
2. Use `will-change` CSS property sparingly
3. Disable animations on lower-end devices
4. Use CSS transforms instead of position changes

### Hot Reload Not Working

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

## Testing

### Manual Testing Checklist

- [ ] Envelope animation works
- [ ] All sections scroll smoothly
- [ ] Countdown updates in real-time
- [ ] RSVP form validates inputs
- [ ] Form submission works
- [ ] Images load correctly
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Parallax works (desktop only)
- [ ] Particles animate smoothly
- [ ] No console errors
- [ ] Accessibility: keyboard navigation
- [ ] Accessibility: screen reader friendly

### Browser Testing

Test in:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Custom Deployment

```bash
# Build
npm run build

# Output is in .next folder
# Serve with:
npm start
```

### Environment Variables

If you add backend integration, create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
```

## Performance Tips

1. **Images**: Use Next.js Image component (already implemented)
2. **Code Splitting**: Automatic with Next.js
3. **Server Components**: Most components are server-rendered
4. **Lazy Loading**: Images and below-fold content lazy load
5. **Caching**: Configure cache headers in `next.config.ts`

## SEO Optimization

Update `layout.tsx` metadata:

```typescript
export const metadata: Metadata = {
  title: "Your Wedding Title",
  description: "Your description",
  openGraph: {
    title: "...",
    description: "...",
    images: ["..."],
  },
};
```

## Support

For questions about:
- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

## File Structure Quick Reference

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── invitation/         # Wedding sections
│   └── shared/             # Reusable UI
├── hooks/                  # Custom hooks
├── config/                 # Configuration
│   └── wedding.config.json # Main config
└── types/                  # TypeScript types
    └── wedding.types.ts
```

## Next Steps

1. Customize `wedding.config.json` with your data
2. Replace placeholder images with your photos
3. Test on multiple devices
4. Set up RSVP backend (if needed)
5. Deploy to production
6. Share your beautiful invitation! 🎉
