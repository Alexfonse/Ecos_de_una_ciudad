# Manual Técnico: Ecos de una Ciudad

Este documento proporciona una visión técnica profunda de la arquitectura, funcionamiento, librerías y lógica del proyecto "Ecos de una Ciudad".

---

## 1. Arquitectura del Proyecto

El proyecto está estructurado como una aplicación web estática moderna (SPA-like flavor) utilizando **Vanilla JavaScript (ES6 Modules)** para la lógica, **CSS3** para el estilo y animaciones, y **HTML5** semántico para la estructura. No requiere compilación (build steps), lo que facilita su despliegue en cualquier servidor estático.

### Estructura de Directorios

```
Ecos_de_una_ciudad/
│
├── assets/
│   ├── css/
│   │   ├── style.css           # Estilos globales y core design system
│   │   ├── blog.css            # Estilos específicos del blog
│   │   ├── libro.css           # Estilos exclusivos para efecto libro (Turn.js)
│   │   └── bootstrap-grid...   # Grid system únicamente (sin JS de Bootstrap)
│   │
│   ├── js/
│   │   ├── main.js             # Punto de entrada principal (Orquestador)
│   │   ├── galeria.js          # Lógica específica de galeria.html (Circular + Scroll)
│   │   ├── eventos.js          # Lógica de renderizado y filtros de eventos.html
│   │   ├── turn.js             # Librería externa para efecto de libro
│   │   │
│   │   └── modules/            # Módulos reutilizables (Clean Code)
│   │       ├── loader.js       # Control del preloader y eventos de carga
│   │       ├── ui.js           # Menú, Scroll suave, Parallax
│   │       ├── animations.js   # Observer para fade-ins y efectos de mouse
│   │       ├── voice.js        # Wrapper para Web Speech API
│   │       ├── chat.js         # Lógica del chatbot "Don Gaitaloma"
│   │       └── blog-interactions.js # Lógica de modales y sliders del blog
│   │
│   ├── data/
│   │   └── chat_responses.json # Base de conocimiento del chatbot
│   ├── img/                    # Recursos gráficos optimizados
│   └── audio/                  # Efectos de sonido (paloma.mp3)
│
├── index.html                  # Landing Page
├── galeria.html                # Galería Histórica (Circular GSAP)
├── galeria-3d.html             # Experiencia VR (A-Frame)
├── chat.html                   # Interfaz conversacional
├── eventos.html                # Agenda cultural (Filtros dinámicos)
├── sobre-nosotros.html         # Libro interactivo (Turn.js)
└── blog/
    └── blog.html               # Sistema de artículos con modales
```

---

## 2. Análisis por Página (HTML y Funcionalidad)

### `index.html` (Página de Inicio)

- **Función**: Presentación de la marca, navegación principal y "gancho" narrativo.
- **Scripts**: Utiliza `main.js` para inicializar el loader y las animaciones globales (`fade-in-up`).
- **Características Clave**:
  - **Hero Section**: Imagen de fondo con efecto Parallax (`ui.js`).
  - **Tarjetas de Navegación**: Enlaces visuales a las sub-secciones.
  - **Footer**: Formulario de suscripción (simulado) y redes sociales.

### `galeria.html` (Galería Histórica)

- **Función**: Exhibición interactiva de personajes y arquitectura.
- **Lógica Específica (`galeria.js`)**:
  - **Galería Circular**: Implementada con **GSAP**. Distribuye elementos en un círculo matemático y calcula posiciones `(sin/cos)`. Al hacer clic, el elemento activo viaja al centro.
  - **Galerías de Scroll**: Listas verticales que usan un "efecto de revelado" con máscara SVG (`clip-path`) manipulada dinámicamente al hacer clic.
- **Librerías**: `GSAP` (GreenSock) para las interpolaciones complejas.

### `galeria-3d.html` (Experiencia Inmersiva)

- **Función**: Recorrido virtual por un espacio tridimensional.
- **Tecnología**: **A-Frame** (WebVR Framework).
- **Lógica**:
  - Carga un modelo `.glb` ("Pasillo").
  - **Script Inline**: Detecta si es móvil o PC.
    - **Móvil**: Activa `tap-to-move` (tocar para avanzar).
    - **PC**: Activa controles `WASD` + Mouse. Detecta la tecla `Shift` para activar el modo "Nitro" (velocidad x4).

### `chat.html` (Don Gaitaloma)

- **Función**: Chatbot narrativo que guía al usuario por la historia.
- **Lógica (`chat.js` + `voice.js`)**:
  - **Motor de Estado**: Lee `chat_responses.json` para estructurar temas y respuestas secuenciales.
  - **Síntesis de Voz**: Lee los mensajes del bot en voz alta.
  - **Manejo de DOM**: Crea burbujas de chat, imágenes y reproductores de audio dinámicamente.

### `eventos.html` (Agenda Cultural)

- **Función**: Listado de eventos con buscador y filtros.
- **Lógica (`eventos.js`)**:
  - **Base de Datos Local**: Array de objetos `eventsData` hardcodeado (simulando backend).
  - **Renderizado Dinámico**: Genera el HTML de las tarjetas basado en los datos.
  - **Filtros**:
    - Filtro por Categoría (Botones).
    - Búsqueda en tiempo real (`input event`) sobre el título.

### `sobre-nosotros.html` (El Libro / Equipo)

- **Función**: Presentación del equipo y manual de marca.
- **Característica Especial**: Efecto de "pasar página" real.
- **Librería**: **Turn.js** (basada en jQuery).
- **Lógica**:
  - Inicializa el libro con imágenes.
  - Detecta el tamaño de pantalla para mostrar 1 página (móvil) o 2 páginas (escritorio).
  - Añade botones de navegación dinámicos.
  - Tarjetas del equipo con efecto "Flip" (CSS 3D Transform).

### `blog/blog.html` (Historias Urbanas)

- **Función**: Artículos detallados sobre la ciudad.
- **Lógica (`blog-interactions.js`)**:
  - **Sistema de Modales**: Al hacer clic en una tarjeta, no recarga la página. Abre un modal (`dialog` overlay) e inyecta el contenido detallado hidden en el mismo HTML.
  - **Sliders de Comparación**: Script personalizado para manejar el "Antes/Después" arrastrando una barra sobre dos imágenes superponiendo `clip-path`.
  - **Contadores Animados**: Números que suben de 0 a N cuando entran en pantalla.

---

## 3. Desglose de Módulos (Core JavaScript)

Estos módulos se encuentran en `assets/js/modules/` y siguen el patrón ES Modules.

### `loader.js`

- **Propósito**: Gestionar la pantalla de carga inicial.
- **Funcionamiento**:
  - Escucha `DOMContentLoaded` (DOM listo) y `window.onload` (recursos listos).
  - Garantiza un tiempo mínimo de visualización (500ms) para evitar parpadeos.
  - Dispara un evento personalizado `js-loaded` y añade la clase `.js-loaded` al body, lo que desbloquea las animaciones CSS.

### `ui.js`

- **Propósito**: Interacciones globales de interfaz.
- **Funciones**:
  - `initMenu()`: Lógica del menú hamburguesa pantalla completa.
  - `initScroll()`: Scroll suave (`behavior: smooth`) para anclas internas.
  - `initParallax()`: Efecto de movimiento sutil en el header al hacer scroll.

### `animations.js`

- **Propósito**: Efectos visuales reactivos.
- **API**: **IntersectionObserver**.
- **Funciones**:
  - `initFadeIn()`: Busca elementos con clase `.fade-in-up`. Cuando entran al viewport, les añade `.fade-visible` (transformación CSS).
  - `initHoverEffects()`: Rastrea la posición del mouse `(e.clientX)` sobre tarjetas para efectos de brillo o "linterna".

### `voice.js`

- **Propósito**: Interfaz de voz (Text-to-Speech).
- **API**: **Web Speech API (`SpeechSynthesisUtterance`)**.
- **Lógica**:
  - Detecta voces disponibles en el sistema. Prioriza voces de "Google Español" o "Microsoft Español".
  - Permite activar/desactivar sonido globalmente.
  - Gestiona colas de audio (cancela el anterior antes de hablar).

---

## 4. Librerías y APIs Externas

Explicación detallada de herramientas de terceros utilizadas.

| Librería / API           | Archivo(s)                              | Uso y Propósito                                                                                                                                                       |
| :----------------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GSAP (GreenSock)**     | `galeria.html`                          | Motor de animaciones de alto rendimiento. Se usa para coordinar la entrada secuencial de la galería circular y las interpolaciones matemáticas complejas de posición. |
| **A-Frame**              | `galeria-3d.html`                       | Framework de Realidad Virtual basado en Three.js. Permite definir escenas 3D usando etiquetas HTML (`<a-scene>`, `<a-box>`).                                          |
| **Lucide Icons**         | Global                                  | Librería de iconos SVG ligeros. Se inyectan dinámicamente con `lucide.createIcons()`.                                                                                 |
| **Turn.js**              | `sobre-nosotros.html`                   | Plugin de jQuery para simular el efecto físico de pasar páginas en un libro o revista.                                                                                |
| **jQuery**               | `sobre-nosotros.html`                   | Dependencia requerida únicamente por Turn.js. No se usa en el resto del sitio moderno.                                                                                |
| **IntersectionObserver** | `animations.js`, `blog-interactions.js` | **API Nativa**. Permite detectar cuándo un elemento entra en la pantalla de forma eficiente (sin escuchar el evento scroll constantemente).                           |
| **Web Speech API**       | `voice.js`                              | **API Nativa**. Permite al navegador sintetizar voz humana a partir de texto.                                                                                         |

---

> **Nota para desarrollo local**: No abra el archivo `index.html` directamente haciendo doble clic. Use una extensión como "Live Server" en VS Code debido a las políticas de seguridad de los módulos ES6.
