// assets/js/galeria3d.js

document.addEventListener('DOMContentLoaded', () => {
    // Verificamos que estamos en la página correcta antes de ejecutar nada.
    if (document.querySelector('a-scene')) {
        
        // --- 1. LA BASE DE DATOS DE NUESTRA GALERÍA ---
        // Aquí defines cada "exhibición". Puedes añadir tantas como quieras.
        const exhibits = [
            {
                id: 'pasillo',
                modelSrc: 'assets/img/Pasillo.glb',
                position: '0 0 -7',
                scale: '0.5 0.5 0.5',
                rotation: '0 15 0',
                infoText: 'Un pasillo que conecta épocas, donde cada puerta es un portal a otro tiempo de la ciudad.',
                infoPosition: '-3 1.6 -5',
                // El punto de vista ideal para observar este modelo
                cameraPosition: '0 1.6 -3'
            },
            {
                id: 'catedral',
                modelSrc: 'assets/models/catedral_lowpoly.glb', // <- NECESITARÁS ESTE MODELO
                position: '8 0 -10',
                scale: '1 1 1',
                rotation: '0 -30 0',
                infoText: 'La Catedral Primada, un ícono neoclásico que ha sido testigo silencioso de la historia del país.',
                infoPosition: '5 2 -8',
                cameraPosition: '8 1.8 -6'
            }
            // Puedes añadir más objetos aquí...
        ];

        // --- 2. REFERENCIAS A ELEMENTOS DE LA ESCENA ---
        const scene = document.querySelector('a-scene');
        const cameraRig = document.querySelector('#rig');
        const clickSound = document.querySelector('#click-sound');

        // --- 3. LÓGICA PARA CREAR Y COLOCAR CADA EXHIBICIÓN ---
        exhibits.forEach(exhibit => {
            // Crear el modelo 3D
            const modelEl = document.createElement('a-gltf-model');
            modelEl.setAttribute('id', exhibit.id);
            modelEl.setAttribute('src', exhibit.modelSrc);
            modelEl.setAttribute('position', exhibit.position);
            modelEl.setAttribute('rotation', exhibit.rotation);
            modelEl.setAttribute('scale', exhibit.scale);
            modelEl.setAttribute('shadow', 'cast: true');

            // Crear el texto de información (inicialmente invisible)
            const textEl = document.createElement('a-text');
            textEl.setAttribute('id', `${exhibit.id}-text`);
            textEl.setAttribute('value', exhibit.infoText);
            textEl.setAttribute('color', '#FFD6A5');
            textEl.setAttribute('position', exhibit.infoPosition);
            textEl.setAttribute('align', 'center');
            textEl.setAttribute('width', '3');
            textEl.setAttribute('visible', 'false');
            textEl.setAttribute('look-at', '[camera]');

            // Añadir el listener para la interacción
            modelEl.addEventListener('click', () => {
                // Mover la cámara a la posición ideal de esta exhibición
                cameraRig.setAttribute('animation', {
                    property: 'position',
                    to: exhibit.cameraPosition,
                    dur: 2000,
                    easing: 'easeInOutCubic'
                });

                // Ocultar todos los otros textos antes de mostrar el actual
                document.querySelectorAll('[id$="-text"]').forEach(t => t.setAttribute('visible', 'false'));
                // Mostrar el texto de esta exhibición
                textEl.setAttribute('visible', 'true');
                
                // Reproducir sonido
                if(clickSound) clickSound.components.sound.playSound();
            });

            // Añadimos los nuevos elementos a la escena
            scene.appendChild(modelEl);
            scene.appendChild(textEl);
        });

        // --- 4. LÓGICA PARA VOLVER A LA VISTA GENERAL ---
        // Al presionar la tecla 'Escape', la cámara vuelve al inicio y se ocultan los textos.
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                cameraRig.setAttribute('animation', {
                    property: 'position',
                    to: '0 0 0', // Posición inicial del rig
                    dur: 1500,
                    easing: 'easeInOutCubic'
                });
                document.querySelectorAll('[id$="-text"]').forEach(t => t.setAttribute('visible', 'false'));
            }
        });
    }
});