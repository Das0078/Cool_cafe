# Cafe Cool - AI Agent Instructions

## Tech Stack
- React (Next.js)
- TypeScript
- Tailwind CSS
- Framer Motion (for primary animations)
- React Icons

## Design System
- **Brand Name**: Cafe Cool
- **Main Background Color**: `#110a06` (for oval element)
- **Default Text Color**: `white`
- **Marquee Text Color**: `#b79d8b`
- **Typography**: 
  - Default Font: `Noto Sans`
  - Big Stretch Background Text: `Google Sans`

## Core Layout & Components

### 1. Loader Screen
- Aesthetic, smooth loading screen before the main content reveals, featuring the brand color and name.

### 2. Navigation (Glassmorphism)
- **Desktop**: Top navigation menu with a liquid glass effect. Active tab uses a bottom border.
- **Mobile**: Transforms into a bottom floating liquid glass navbar. Active tab uses a smooth background sliding indicator.

### 3. Hero Carousel (3 Slides)
- **Animation mechanics**: 
  - Auto-play every 3 seconds.
  - Active slide is centered and scaled up.
  - When transitioning: Active slide moves left and scales down. Next slide enters from right and scales up to replace it smoothly.
  - Previous and Next slides are partially visible on the left and right edges (scaled down).
- **Slide Data**:
  - **Slide 1**: bg: `#985528`, Text: `COFFEE`, Img: Coffee Cup, Floating: Coffee Beans
  - **Slide 2**: bg: `#d96017`, Text: `BURGER`, Img: Burger, Floating: French Fries
  - **Slide 3**: bg: `#de634c`, Text: `MOMO`, Img: Momo Pot, Floating: Momos

### 4. Bottom Oval Marquee
- A large oval-shaped element at the bottom of the screen.
- Background Color: `#110a06`
- Inside: A curvy SVG text path marquee looping continuously.
- Text content: `cafe cool  ✦   since 2022  ✦   we pride at  ✦   what we serve`
- Text Color: `#b79d8b`

## Development Principles
- Strict component-based architecture.
- DRY principles and clean coding practices.
- Smooth, optimized UI/UX.
- Fully mobile responsive.
