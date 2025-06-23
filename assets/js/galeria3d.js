// assets/js/galeria3d.js

document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    if (!sceneEl) return;

    // --- REFERENCIAS Y CONFIGURACIÓN ---
    const rig = document.querySelector('#rig');
    const cameraEl = document.querySelector('#camera');
    const vrButton = document.getElementById('enter-vr-btn');
    const gyroButton = document.getElementById('gyro-btn');

    // Guardamos la configuración de movimiento para poder restaurarla.
    const movementConfig = {
        speed: 0.15,
        fly: true
    };

    // --- LÓGICA DE BOTONES (VR Y GIROSCOPIO) ---
    function setupButtons() {
        // Lógica para el botón de VR
        if (vrButton && (AFRAME.utils.device.isVRDisplay() || sceneEl.is('vr-mode-available'))) {
            vrButton.style.display = 'inline-block';
            vrButton.addEventListener('click', () => sceneEl.enterVR());
        }

        // Lógica para el botón de Giroscopio
        if (gyroButton && cameraEl && AFRAME.utils.device.isMobile()) {
            gyroButton.style.display = 'inline-block';
            
            gyroButton.addEventListener('click', () => {
                const lookControls = cameraEl.components['look-controls'];
                if (!lookControls) return;

                const isGyroEnabled = lookControls.data.magicWindowTrackingEnabled;
                const newGyroState = !isGyroEnabled;

                // Actualizamos el giroscopio
                cameraEl.setAttribute('look-controls', {
                    ...lookControls.data,
                    magicWindowTrackingEnabled: newGyroState
                });

                // ¡LA MAGIA! Activamos o desactivamos el movimiento libre para evitar conflictos.
                if (newGyroState) {
                    // Si activamos el giroscopio, quitamos el movimiento con los dedos.
                    rig.removeAttribute('movement-controls');
                } else {
                    // Si desactivamos el giroscopio, restauramos el movimiento con los dedos.
                    rig.setAttribute('movement-controls', movementConfig);
                }

                // Actualizamos el estilo del botón
                gyroButton.classList.toggle('active', newGyroState);
            });
        }
    }

    // --- EJECUCIÓN ---
    if (sceneEl.hasLoaded) {
        setupButtons();
    } else {
        sceneEl.addEventListener('loaded', setupButtons);
    }
});