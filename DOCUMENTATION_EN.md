# Technical Manual: Ecos de una Ciudad

This document provides a deep technical overview of the architecture, functionality, libraries, and internal logic of the "Ecos de una Ciudad" project.

---

## 1. Project Architecture

The project is structured as a modern static web application (SPA-like flavor) using **Vanilla JavaScript (ES6 Modules)** for logic, **CSS3** for styling and animations, and semantic **HTML5** for structure. It requires no build steps, making it easy to deploy on any static server.

### Directory Structure

```
Ecos_de_una_ciudad/
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Global styles and core design system
│   │   ├── blog.css            # Blog-specific styles
│   │   ├── libro.css           # Exclusive styles for book effect (Turn.js)
│   │   └── bootstrap-grid...   # Grid system only (no Bootstrap JS)
│   │
│   ├── js/
│   │   ├── main.js             # Main Entry Point (Orchestrator)
│   │   ├── galeria.js          # Specific logic for galeria.html (Circular + Scroll)
│   │   ├── eventos.js          # Rendering and filtering logic for eventos.html
│   │   ├── turn.js             # External library for book effect
│   │   │
│   │   └── modules/            # Reusable Modules (Clean Code)
│   │       ├── loader.js       # Preloader control and load events
│   │       ├── ui.js           # Menu, Smooth Scroll, Parallax
│   │       ├── animations.js   # Observer for fade-ins and mouse effects
│   │       ├── voice.js        # Wrapper for Web Speech API
│   │       ├── chat.js         # Logic for "Don Gaitaloma" chatbot
│   │       └── blog-interactions.js # Blog modal and slider logic
│   │
│   ├── data/
│   │   └── chat_responses.json # Chatbot knowledge base
│   ├── img/                    # Optimized graphic assets
│   └── audio/                  # Sound effects (pigeon.mp3)
│
├── index.html                  # Landing Page
├── galeria.html                # Historical Gallery (Circular GSAP)
├── galeria-3d.html             # VR Experience (A-Frame)
├── chat.html                   # Conversational Interface
├── eventos.html                # Cultural Agenda (Dynamic filters)
├── sobre-nosotros.html         # Interactive Book (Turn.js)
└── blog/
    └── blog.html               # Article system with modals
```

---

## 2. Page-by-Page Analysis (HTML & Functionality)

### `index.html` (Home Page)

- **Function**: Brand presentation, main navigation, and narrative hook.
- **Scripts**: Uses `main.js` to initialize the loader and global animations (`fade-in-up`).
- **Key Features**:
  - **Hero Section**: Background image with Parallax effect (`ui.js`).
  - **Navigation Cards**: Visual links to sub-sections.
  - **Footer**: Simulated subscription form and social media links.

### `galeria.html` (Historical Gallery)

- **Function**: Interactive exhibition of characters and architecture.
- **Specific Logic (`galeria.js`)**:
  - **Circular Gallery**: Implemented with **GSAP**. Distributes elements in a mathematical circle and calculates positions `(sin/cos)`. Clicking an element moves it to the center.
  - **Scroll Galleries**: Vertical lists using a "reveal effect" with dynamic SVG masks (`clip-path`) manipulated on click.
- **Libraries**: `GSAP` (GreenSock) for complex interpolations.

### `galeria-3d.html` (Immersive Experience)

- **Function**: Virtual tour of a 3D space.
- **Technology**: **A-Frame** (WebVR Framework).
- **Logic**:
  - Loads a `.glb` model ("Pasillo").
  - **Inline Script**: Detects mobile vs. PC.
    - **Mobile**: Activates `tap-to-move` (touch to advance).
    - **PC**: Activates `WASD` + Mouse controls. Detects `Shift` key to toggle "Nitro" mode (4x speed).

### `chat.html` (Don Gaitaloma)

- **Function**: Narrative chatbot guiding the user through history.
- **Logic (`chat.js` + `voice.js`)**:
  - **State Engine**: Reads `chat_responses.json` to structure sequential topics and responses.
  - **Speech Synthesis**: Reads bot messages aloud.
  - **DOM Handling**: Dynamically creates chat bubbles, images, and audio players.

### `eventos.html` (Cultural Agenda)

- **Function**: Event listing with search and filters.
- **Logic (`eventos.js`)**:
  - **Local Database**: Hardcoded `eventsData` array (simulating backend).
  - **Dynamic Rendering**: Generates card HTML based on data.
  - **Filters**:
    - Category Filter (Buttons).
    - Real-time Search (`input event`) on title.

### `sobre-nosotros.html` (The Book / Team)

- **Function**: Team presentation and brand manual.
- **Special Feature**: Realistic "page-turning" effect.
- **Library**: **Turn.js** (based on jQuery).
- **Logic**:
  - Initializes book with images.
  - Detects screen size to show 1 page (mobile) or 2 pages (desktop).
  - Adds dynamic navigation buttons.
  - Team cards with "Flip" effect (CSS 3D Transform).

### `blog/blog.html` (Urban Stories)

- **Function**: Detailed articles about the city.
- **Logic (`blog-interactions.js`)**:
  - **Modal System**: Clicking a card does not reload the page. It opens a modal (`dialog` overlay) and injects detailed hidden content from the same HTML.
  - **Comparison Sliders**: Custom script to handle "Before/After" by dragging a bar over two images using overlapping `clip-path`.
  - **Animated Counters**: Numbers counting up from 0 to N when entering the viewport.

---

## 3. Module Breakdown (Core JavaScript)

These modules are located in `assets/js/modules/` and follow the ES Modules pattern.

### `loader.js`

- **Purpose**: Manage the initial loading screen.
- **Behavior**:
  - Listens for `DOMContentLoaded` (DOM ready) and `window.onload` (assets ready).
  - Ensures a minimum display time (500ms) to prevent flashing.
  - Dispatches a custom `js-loaded` event and adds `.js-loaded` class to body, unlocking CSS animations.

### `ui.js`

- **Purpose**: Global interface interactions.
- **Functions**:
  - `initMenu()`: Fullscreen hamburger menu logic.
  - `initScroll()`: Smooth scroll (`behavior: smooth`) for internal anchors.
  - `initParallax()`: Subtle movement effect in header on scroll.

### `animations.js`

- **Purpose**: Reactive visual effects.
- **API**: **IntersectionObserver**.
- **Functions**:
  - `initFadeIn()`: Finds elements with `.fade-in-up`. Adds `.fade-visible` (CSS transform) when they enter viewport.
  - `initHoverEffects()`: Tracks mouse position `(e.clientX)` over cards for shine or "flashlight" effects.

### `voice.js`

- **Purpose**: Voice Interface (Text-to-Speech).
- **API**: **Web Speech API (`SpeechSynthesisUtterance`)**.
- **Logic**:
  - Detects available system voices. Prioritizes "Google Español" or "Microsoft Español".
  - Allows global sound toggle.
  - Manages audio queues (cancels previous before speaking).

---

## 4. External Libraries & APIs

Detailed explanation of third-party tools used.

| Library / API            | File(s)                                 | Usage & Purpose                                                                                                                          |
| :----------------------- | :-------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **GSAP (GreenSock)**     | `galeria.html`                          | High-performance animation engine. Used to coordinate sequential entry of the circular gallery and complex position math interpolations. |
| **A-Frame**              | `galeria-3d.html`                       | WebVR Framework based on Three.js. Allows defining 3D scenes using HTML tags (`<a-scene>`, `<a-box>`).                                   |
| **Lucide Icons**         | Global                                  | Lightweight SVG icon library. Injected dynamically with `lucide.createIcons()`.                                                          |
| **Turn.js**              | `sobre-nosotros.html`                   | jQuery plugin to simulate physical page-turning effect for books or magazines.                                                           |
| **jQuery**               | `sobre-nosotros.html`                   | Dependency required only by Turn.js. Not used in the rest of the modern site.                                                            |
| **IntersectionObserver** | `animations.js`, `blog-interactions.js` | **Native API**. Efficiently detects when an element enters the screen (without constant scroll listeners).                               |
| **Web Speech API**       | `voice.js`                              | **Native API**. Allows the browser to synthesize human speech from text.                                                                 |

---

> **Note for Local Development**: Do not open `index.html` directly by double-clicking. Use an extension like "Live Server" in VS Code due to ES6 module security policies.
