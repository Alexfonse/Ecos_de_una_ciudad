/* ========================================================================
   |||||||||||||| CÓDIGO COMPLETO Y FINAL para eventos.js |||||||||||||||
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- BASE DE DATOS DE EVENTOS (¡ACTUALIZADA CON IMÁGENES REALES!) ---
    const eventsData = [
        {
            title: "Rock al Parque 2025",
            category: "Música",
            location: "Parque Simón Bolívar",
            date: "2025-07-06",
            description: "El festival de rock gratuito más grande de Latinoamérica. Tres días de pura energía con bandas nacionales e internacionales.",
            image: "assets/img/rock.webp"
        },
        {
            title: "La Obra que Sale Mal",
            category: "Teatro",
            location: "Teatro Nacional La Castellana",
            date: "2025-07-15",
            description: "Una comedia galardonada internacionalmente que te hará reír a carcajadas. Perfecta para una noche de humor y caos.",
            image: "assets/img/la_obra_sal.jpeg"
        },
        {
            title: "Festival de Cine Independiente - IndieBo",
            category: "Cine",
            location: "Múltiples salas de Bogotá",
            date: "2025-07-18",
            description: "Descubre propuestas cinematográficas audaces y creativas de todo el mundo en uno de los festivales más importantes.",
            image: "assets/img/Cine_independiente.jpg"
        },
        {
            title: "Ciclo de Cine Colombiano",
            category: "Cine",
            location: "Cinemateca de Bogotá",
            date: "2025-07-20",
            description: "Un recorrido por las joyas del cine nacional, desde clásicos hasta las producciones más recientes.",
            image: "assets/img/CicloCine-Colombiano-program.jpg"
        },
        {
            title: "Orquesta Filarmónica de Bogotá",
            category: "Música",
            location: "Auditorio León de Greiff",
            date: "2025-07-25",
            description: "Disfruta de una noche mágica con interpretaciones de obras clásicas por la aclamada orquesta de la ciudad.",
            image: "assets/img/Filarmonica .jpeg"
        },
        {
            title: "Jardín Botánico de Noche",
            category: "Cultural",
            location: "Jardín Botánico de Bogotá",
            date: "2025-07-26",
            description: "Un recorrido mágico y sensorial por las colecciones del jardín bajo la luz de la luna. Una experiencia única.",
            image: "assets/img/Jardin_botanico.jpg"
        },
        {
            title: "Baum Festival",
            category: "Música",
            location: "Corferias",
            date: "2025-07-27",
            description: "La cita obligada para los amantes de la música electrónica. Un lineup de DJs de talla mundial en el corazón de Bogotá.",
            image: "assets/img/Baum_festival.jpg"
        },
        {
            title: "Noche de Museos",
            category: "Cultural",
            location: "Varios Museos del Centro",
            date: "2025-07-28",
            description: "Explora las exposiciones del Museo del Oro, Museo Botero y más, con entrada libre y horarios extendidos.",
            image: "assets/img/Museo_noctruno.jpg"
        },
        {
            title: "Bogotá Food Fest",
            category: "Cultural",
            location: "Parque El Virrey",
            date: "2025-08-02",
            description: "Un festival gastronómico que reúne los mejores restaurantes y food trucks de la ciudad. ¡Un paraíso para los amantes de la comida!",
            image: "assets/img/Food_festival.jpg"
        },
        {
            title: "Aterciopelados en Concierto",
            category: "Música",
            location: "Movistar Arena",
            date: "2025-08-05",
            description: "La icónica banda bogotana regresa a los escenarios con sus grandes éxitos y nuevo material. ¡Una noche de rock inolvidable!",
            image: "assets/img/Aterciopelados.jpg"
        },
        {
            title: "El Método",
            category: "Teatro",
            location: "Teatro Libre de Chapinero",
            date: "2025-08-10",
            description: "Un thriller psicológico que explora la crueldad de los procesos de selección laboral. Una obra intensa y reflexiva.",
            image: "assets/img/el_metodo.jpg"
        },
        {
            title: "Retrospectiva Alfred Hitchcock",
            category: "Cine",
            location: "Cinemateca de Bogotá",
            date: "2025-08-15",
            description: "Un ciclo imperdible con las obras maestras del maestro del suspenso. Vértigo, Psicosis y más en pantalla grande.",
            image: "assets/img/Maestro_del_suspenso .jpeg"
        },
        {
            title: "Feria Internacional del Libro (FILBo)",
            category: "Cultural",
            location: "Corferias",
            date: "2025-08-18",
            description: "El evento literario y cultural más importante de Colombia. Encuentros con autores, lanzamientos y una inmensa oferta editorial.",
            image: "/assets/img/Filbo.png"
        },
        {
            title: "Exposición de Arte Urbano",
            category: "Cultural",
            location: "Galería La Cometa",
            date: "2025-08-20",
            description: "Una muestra que celebra el talento de los artistas del graffiti y el street art de Bogotá y el mundo.",
            image: "/assets/img/Arte_urbano.jpg"
        },
        {
            title: "El Coronel No Tiene Quien le Escriba",
            category: "Teatro",
            location: "Teatro Colón",
            date: "2025-08-22",
            description: "Magistral adaptación teatral de la aclamada novela de Gabriel García Márquez. Una joya de la dramaturgia colombiana.",
            image: "/assets/img/El_coronel.jpg"
        },
        {
            title: "Alimentarte Food Festival",
            category: "Cultural",
            location: "Parque El Country",
            date: "2025-08-25",
            description: "El festival gastronómico con causa social. Disfruta de lo mejor de la cocina local e internacional y apoya una buena causa.",
            image: "assets/img/festival_alimentartejpg.jpg"
        },
        {
            title: "Festival de Jazz al Parque",
            category: "Música",
            location: "Parque Metropolitano El Country",
            date: "2025-09-14",
            description: "Artistas nacionales e internacionales se reúnen para dos días de improvisación y virtuosismo en este evento gratuito.",
            image: "/assets/img/festival_de_jazz.png"
        },
        {
            title: "Andrés Cepeda: Gira 'Tengo Ganas'",
            category: "Música",
            location: "Movistar Arena",
            date: "2025-09-20",
            description: "El cantautor colombiano presenta su más reciente trabajo en una noche llena de romanticismo y sus grandes éxitos.",
            image: "assets/img/andres_cepeda.jpg"
        },
        {
            title: "Woyzeck, un lamento",
            category: "Teatro",
            location: "Teatro Colón",
            date: "2025-09-01",
            description: "Una adaptación moderna del clásico de Georg Büchner que explora la locura y la opresión social.",
            image: "assets/img/Woyzeck (1).jpg"
        }
    ];

    // --- El resto del código se queda exactamente igual ---
    // (Lógica para renderizar, filtrar, buscar, etc.)

    const eventGrid = document.getElementById('event-grid');
    const searchInput = document.getElementById('searchInput');
    const filterContainer = document.getElementById('filterContainer');
    const noResultsMessage = document.getElementById('no-results');
    let activeCategory = 'Todos';

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString + 'T00:00:00');
        return date.toLocaleDateString('es-CO', options);
    }

    function renderEvents(events) {
        eventGrid.innerHTML = '';
        noResultsMessage.classList.toggle('hidden', events.length > 0);
        
        events.sort((a, b) => new Date(a.date) - new Date(b.date));

        events.forEach(event => {
            const card = document.createElement('div');
            card.className = 'col-xl-3 col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
                <div class="event-card">
                    <div class="event-card-image" style="background-image: url('${event.image}')">
                        <span class="event-card-category">${event.category}</span>
                    </div>
                    <div class="event-card-content">
                        <h3 class="event-card-title">${event.title}</h3>
                        <div class="event-card-details">
                            <span><i data-lucide="calendar-days"></i> ${formatDate(event.date)}</span>
                            <span><i data-lucide="map-pin"></i> ${event.location}</span>
                        </div>
                        <p class="event-card-description">${event.description}</p>
                        <a href="#" class="event-card-link">Ver más</a>
                    </div>
                </div>
            `;
            eventGrid.appendChild(card);
        });
        lucide.createIcons();
    }

    function filterAndRender() {
        const searchTerm = searchInput.value.toLowerCase();
        let filteredEvents = eventsData;

        if (activeCategory !== 'Todos') {
            filteredEvents = filteredEvents.filter(event => event.category === activeCategory);
        }
        if (searchTerm) {
            filteredEvents = filteredEvents.filter(event => event.title.toLowerCase().includes(searchTerm));
        }
        renderEvents(filteredEvents);
    }
    
    filterContainer.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            document.querySelector('.filter-btn.active').classList.remove('active');
            e.target.classList.add('active');
            activeCategory = e.target.dataset.category;
            filterAndRender();
        }
    });

    searchInput.addEventListener('input', filterAndRender);

    filterAndRender();
});