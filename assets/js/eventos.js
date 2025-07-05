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
            image: "https://www.radionica.rocks/sites/default/files/styles/1366x768/public/2022-06/Peliculas-Indiebo-2022.jpg"
        },
        {
            title: "Ciclo de Cine Colombiano",
            category: "Cine",
            location: "Cinemateca de Bogotá",
            date: "2025-07-20",
            description: "Un recorrido por las joyas del cine nacional, desde clásicos hasta las producciones más recientes.",
            image: "/assets/img/CicloCine-Colombiano-program.jpg"
        },
        {
            title: "Orquesta Filarmónica de Bogotá",
            category: "Música",
            location: "Auditorio León de Greiff",
            date: "2025-07-25",
            description: "Disfruta de una noche mágica con interpretaciones de obras clásicas por la aclamada orquesta de la ciudad.",
            image: "https://filarmonicabogota.gov.co/wp-content/uploads/2022/07/La-Filarmonica-de-Bogota-celebra-el-cumpleanos-de-la-ciudad-en-el-Teatro-Mayor-Julio-Mario-Santo-Domingo-prensa-credito-Alcaldia-Mayor.jpeg"
        },
        {
            title: "Jardín Botánico de Noche",
            category: "Cultural",
            location: "Jardín Botánico de Bogotá",
            date: "2025-07-26",
            description: "Un recorrido mágico y sensorial por las colecciones del jardín bajo la luz de la luna. Una experiencia única.",
            image: "https://jbb.gov.co/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-29-at-12.03.48-PM.jpeg"
        },
        {
            title: "Baum Festival",
            category: "Música",
            location: "Corferias",
            date: "2025-07-27",
            description: "La cita obligada para los amantes de la música electrónica. Un lineup de DJs de talla mundial en el corazón de Bogotá.",
            image: "https://www.billboard.com/wp-content/uploads/2023/05/Baum-Festival-2023-billboard-1548.jpg"
        },
        {
            title: "Noche de Museos",
            category: "Cultural",
            location: "Varios Museos del Centro",
            date: "2025-07-28",
            description: "Explora las exposiciones del Museo del Oro, Museo Botero y más, con entrada libre y horarios extendidos.",
            image: "https://www.infobae.com/new-resizer/O0vBfG98X4o3nJ0QY9B2p9G8q3o=/1200x900/filters:format(webp):quality(85)//cloudfront-us-east-1.images.arcpublishing.com/infobae/4W4YJ6Z7B5E2LMXE2355YTCVPE.jpg"
        },
        {
            title: "Bogotá Food Fest",
            category: "Cultural",
            location: "Parque El Virrey",
            date: "2025-08-02",
            description: "Un festival gastronómico que reúne los mejores restaurantes y food trucks de la ciudad. ¡Un paraíso para los amantes de la comida!",
            image: "https://revistadc.com/wp-content/uploads/2023/11/DC_MOSAICO_ALIMENTARTE.jpg"
        },
        {
            title: "Aterciopelados en Concierto",
            category: "Música",
            location: "Movistar Arena",
            date: "2025-08-05",
            description: "La icónica banda bogotana regresa a los escenarios con sus grandes éxitos y nuevo material. ¡Una noche de rock inolvidable!",
            image: "https://www.radionica.rocks/sites/default/files/styles/1366x768/public/2023-03/Aterciopelados%20en%20el%20estadio%20el%20campin.jpg"
        },
        {
            title: "El Método",
            category: "Teatro",
            location: "Teatro Libre de Chapinero",
            date: "2025-08-10",
            description: "Un thriller psicológico que explora la crueldad de los procesos de selección laboral. Una obra intensa y reflexiva.",
            image: "https://files.lapatria.com/s3fs-public/styles/620x/public/obrasubal290124.jpg?itok=8L10mN7f"
        },
        {
            title: "Retrospectiva Alfred Hitchcock",
            category: "Cine",
            location: "Cinemateca de Bogotá",
            date: "2025-08-15",
            description: "Un ciclo imperdible con las obras maestras del maestro del suspenso. Vértigo, Psicosis y más en pantalla grande.",
            image: "https://cloudfront-us-east-1.images.arcpublishing.com/semana/N6YTY344R5B27I227O653CJD5A.jpg"
        },
        {
            title: "Feria Internacional del Libro (FILBo)",
            category: "Cultural",
            location: "Corferias",
            date: "2025-08-18",
            description: "El evento literario y cultural más importante de Colombia. Encuentros con autores, lanzamientos y una inmensa oferta editorial.",
            image: "https://imagenes.eltiempo.com/files/image_1200_600/uploads/2023/04/18/643f211756475.jpeg"
        },
        {
            title: "Exposición de Arte Urbano",
            category: "Cultural",
            location: "Galería La Cometa",
            date: "2025-08-20",
            description: "Una muestra que celebra el talento de los artistas del graffiti y el street art de Bogotá y el mundo.",
            image: "https://revistadiners.com.co/wp-content/uploads/2018/09/calle_800x669.jpg"
        },
        {
            title: "El Coronel No Tiene Quien le Escriba",
            category: "Teatro",
            location: "Teatro Colón",
            date: "2025-08-22",
            description: "Magistral adaptación teatral de la aclamada novela de Gabriel García Márquez. Una joya de la dramaturgia colombiana.",
            image: "https://www.teatrocolon.gov.co/sites/default/files/2021-10/El%20coronel%20no%20tiene%20quien%20le%20escriba%20%2815%29.jpg"
        },
        {
            title: "Alimentarte Food Festival",
            category: "Cultural",
            location: "Parque El Country",
            date: "2025-08-25",
            description: "El festival gastronómico con causa social. Disfruta de lo mejor de la cocina local e internacional y apoya una buena causa.",
            image: "https://www.semana.com/resizer/l9jU4lM2t2d1m-i_Y-X8n8r6G5o=/1200x675/filters:format(jpg):quality(50)//cloudfront-us-east-1.images.arcpublishing.com/semana/S2G4AWP7YRG5VODG7AWV336YLA.jpg"
        },
        {
            title: "Festival de Jazz al Parque",
            category: "Música",
            location: "Parque Metropolitano El Country",
            date: "2025-09-14",
            description: "Artistas nacionales e internacionales se reúnen para dos días de improvisación y virtuosismo en este evento gratuito.",
            image: "https://canaltrece.com.co/uploads/ckeditor/pictures/33232/content_jazz_al_parque_2023.jpg"
        },
        {
            title: "Andrés Cepeda: Gira 'Tengo Ganas'",
            category: "Música",
            location: "Movistar Arena",
            date: "2025-09-20",
            description: "El cantautor colombiano presenta su más reciente trabajo en una noche llena de romanticismo y sus grandes éxitos.",
            image: "https://movistararena.co/wp-content/uploads/2023/11/ANDRES-CEPEDA-TENGO-GANAS-TOUR-1200x600-1.jpg"
        },
        {
            title: "Woyzeck, un lamento",
            category: "Teatro",
            location: "Teatro Colón",
            date: "2025-09-01",
            description: "Una adaptación moderna del clásico de Georg Büchner que explora la locura y la opresión social.",
            image: "https://www.teatrocolon.gov.co/sites/default/files/2023-08/Woyzeck%20un%20lamento%20%281%29.jpg"
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