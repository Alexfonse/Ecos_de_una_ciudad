/* ========================================================================
   |||||||||||| CÓDIGO COMPLETO Y DEFINITIVO para galeria3d.js ||||||||||||
   ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Verificamos que estamos en la página correcta (la que tiene una <a-scene>)
    const sceneEl = document.querySelector('a-scene');
    if (!sceneEl) return;

    // --- 1. BASE DE DATOS DE NUESTRAS EXHIBICIONES ---
    const exhibits = [
        {
            id: 'pasillo',
            modelSrc: 'assets/models/Pasillo.glb', // Asegúrate que la ruta es correcta
            position: '0 0 0',
            scale: '2.5 2.5 2.5',
            rotation: '0 0 0',
            infoText: 'Estás dentro del pasillo. Vuela para salir y descubrir otras obras.',
            infoPosition: '0 2.5 -4',
            cameraPosition: '0 1.6 5'
        },
        {
            id: 'estadio',
            modelSrc: 'assets/models/estadio_campin.glb', // Tu nuevo modelo
            position: '15 1 -15',
            scale: '1 1 1',
            rotation: '0 -45 0',
            infoText: 'Estadio Nemesio Camacho El Campín, el coloso de la 57.',
            infoPosition: '12 3 -13',
            cameraPosition: '15 2 -11'
        }
    ];

    // --- 2. REFERENCIAS Y CONFIGURACIÓN ---
    const rig = document.querySelector('#rig');
    const cameraEl = document.querySelector('#camera');
    const clickSound = document.querySelector('#click-sound');
    const exhibitContainer = document.querySelector('#exhibit-container');
    const movementConfig = "speed: 0.2; fly: true;"; // Guardamos la configuración de movimiento
    const initialRigPosition = '0 1.6 0';

    // --- 3. FUNCIÓN PARA CONSTRUIR LA GALERÍA ---
    function buildGallery() {
        exhibits.forEach(exhibit => {
            const modelEl = document.createElement('a-gltf-model');
            modelEl.setAttribute('id', exhibit.id);
            modelEl.setAttribute('src', exhibit.modelSrc);
            modelEl.setAttribute('position', exhibit.position);
            modelEl.setAttribute('rotation', exhibit.rotation);
            modelEl.setAttribute('scale', exhibit.scale);
            modelEl.setAttribute('shadow', 'cast: true');

            const textEl = document.createElement('a-text');
            textEl.setAttribute('id', `${exhibit.id}-text`);
            textEl.setAttribute('value', exhibit.infoText);
            textEl.setAttribute('color', '#FFD6A5');
            textEl.setAttribute('position', exhibit.infoPosition);
            textEl.setAttribute('align', 'center');
            textEl.setAttribute('width', '4');
            textEl.setAttribute('visible', 'false');
            textEl.setAttribute('look-at', '[camera]');

            const clickTarget = document.createElement('a-entity');
            clickTarget.setAttribute('geometry', 'primitive: sphere; radius: 3');
            clickTarget.setAttribute('material', 'visible: false');
            clickTarget.classList.add('clickable');
            
            clickTarget.addEventListener('click', () => {
                // ¡SOLUCIÓN! Pausamos el movimiento libre antes de animar
                rig.removeAttribute('movement-controls');

                rig.setAttribute('animation', {
                    property: 'position', to: exhibit.cameraPosition, dur: 2000, easing: 'easeInOutCubic'
                });

                document.querySelectorAll('a-text[id$="-text"]').forEach(t => t.setAttribute('visible', 'false'));
                textEl.setAttribute('visible', 'true');
                
                if(clickSound) clickSound.components.sound.playSound();
            });
            
            modelEl.appendChild(clickTarget);
            exhibitContainer.appendChild(modelEl);
            exhibitContainer.appendChild(textEl);
        });
    }

    // --- 4. LÓGICA DE INTERACCIÓN GENERAL ---

    // ¡SOLUCIÓN! Cuando una animación del rig TERMINA, reactivamos el movimiento libre.
    rig.addEventListener('animationcomplete', () => {
        rig.setAttribute('movement-controls', movementConfig);
    });

    // Al presionar 'Escape', volvemos al punto de partida.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            rig.removeAttribute('movement-controls'); // También pausamos aquí
            rig.setAttribute('animation', {
                property: 'position', to: initialRigPosition, dur: 1500, easing: 'easeInOutCubic'
            });
            document.querySelectorAll('a-text[id$="-text"]').forEach(t => t.setAttribute('visible', 'false'));
        }
    });

    // --- LÓGICA DE BOTONES (VR Y GIROSCOPIO) ---
    const vrButton = document.getElementById('enter-vr-btn');
    const gyroButton = document.getElementById('gyro-btn');

    sceneEl.addEventListener('loaded', () => {
        // Lógica VR
        if (vrButton && (AFRAME.utils.device.isVRDisplay() || sceneEl.is('vr-mode-available'))) {
            vrButton.style.display = 'inline-block';
            vrButton.addEventListener('click', () => sceneEl.enterVR());
        }

        // Lógica Giroscopio
        if (gyroButton && cameraEl && AFRAME.utils.device.isMobile()) {
            gyroButton.style.display = 'inline-block';
            gyroButton.addEventListener('click', () => {
                const lookControlsComponent = cameraEl.components['look-controls'];
                if (lookControlsComponent) {
                    const currentData = lookControlsComponent.data;
                    const newGyroState = !currentData.magicWindowTrackingEnabled;
                    // Usamos setAttribute para actualizar el componente correctamente
                    cameraEl.setAttribute('look-controls', {
                        ...currentData,
                        magicWindowTrackingEnabled: newGyroState
                    });
                    gyroButton.classList.toggle('active', newGyroState);
                }
            });
        }
        
        // Finalmente, construimos la galería
        buildGallery();
    });
});