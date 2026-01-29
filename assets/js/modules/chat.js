/**
 * Chat Module
 * Manages the interaction with Don Gaitaloma.
 */
import { VoiceModule } from './voice.js';

// Global State
let chatResponses = {};
const chatContainer = document.getElementById('chat-container');
const AVATAR_GAITALOMA = 'assets/img/gaita_sola.png';
let currentCategory = null;
let stepIndex = 0;

/**
 * Adds a message to the chat interface.
 * @param {string|object} content - Text or object {text, imageURL, audioURL}.
 * @param {string} sender - 'bot' or 'user'.
 */
function addMessage(content, sender = 'bot') {
    const messageRow = document.createElement('div');
    messageRow.className = `mensaje-fila ${sender}`; // Keeping CSS class compatible

    let htmlContent = '';
    let speechText = '';

    if (sender === 'bot') {
        htmlContent += `<img src="${AVATAR_GAITALOMA}" alt="Avatar Don Gaitaloma" class="avatar-chat">`;
    }

    const bubble = document.createElement('div');
    bubble.className = `mensaje ${sender}`;

    if (typeof content === 'object' && content !== null) {
        speechText = content.texto || content.text; // Support both for now
        
        if (speechText) {
            const p = document.createElement('p');
            p.textContent = speechText;
            bubble.appendChild(p);
        }
        
        // Image support
        const imgUrl = content.imagenURL || content.imageURL;
        if (imgUrl) {
            const img = document.createElement('img');
            img.src = imgUrl.replace('../assets', 'assets'); // Fix path relative to root
            img.alt = "Imagen de Don Gaitaloma";
            img.className = "chat-image";
            bubble.appendChild(img);
        }

        // Audio support
        if (content.audioURL) {
            const audio = document.createElement('audio');
            audio.src = content.audioURL.replace('../assets', 'assets');
            audio.controls = true;
            audio.className = "chat-audio";
            bubble.appendChild(audio);
        }

    } else {
        speechText = content;
        bubble.textContent = content;
    }

    messageRow.innerHTML = htmlContent;
    messageRow.appendChild(bubble);
    chatContainer.appendChild(messageRow);

    // Animation
    messageRow.style.opacity = '0';
    messageRow.style.transform = 'translateY(10px)';
    
    requestAnimationFrame(() => {
        messageRow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageRow.style.opacity = '1';
        messageRow.style.transform = 'translateY(0)';
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Voice Interaction
    if (sender === 'bot' && speechText) {
        setTimeout(() => {
            VoiceModule.playSound('pigeon');
            VoiceModule.speak(speechText);
        }, 400);
    }
}

function addOptions(options) {
    const btnContainer = document.createElement('div');
    btnContainer.className = 'opciones';
    
    options.forEach(opt => {
        const btn = document.createElement('button');
        btn.textContent = opt.text || opt.texto;
        btn.onclick = () => handleUserSelection(btn.textContent, opt.action || opt.funcion);
        btnContainer.appendChild(btn);
    });

    chatContainer.appendChild(btnContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function handleUserSelection(text, nextAction) {
    addMessage(text, 'user');

    const currentOptions = chatContainer.querySelector('.opciones');
    if (currentOptions) {
        currentOptions.style.opacity = '0';
        setTimeout(() => currentOptions.remove(), 300);
    }

    // Typing indicator
    const indicator = document.createElement('div');
    indicator.className = 'mensaje-fila bot typing';
    indicator.innerHTML = `
      <img src="${AVATAR_GAITALOMA}" alt="Avatar" class="avatar-chat">
      <div class="typing-indicator"><span></span><span></span><span></span></div>
    `;
    chatContainer.appendChild(indicator);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    setTimeout(() => {
        indicator.remove();
        nextAction();
    }, 1500);
}

function showMainMenu() {
    addMessage("¿En qué le puedo colaborar, sumercé? Elija un tema:", 'bot');
    const categories = Object.keys(chatResponses);
    const options = categories.map(cat => ({
        text: cat,
        action: () => selectCategory(cat)
    }));
    addOptions(options);
}

function selectCategory(categoryName) {
    currentCategory = categoryName;
    stepIndex = 0;
    const categoryData = chatResponses[categoryName];

    if (categoryData.intro) {
        // Handle intro object or string
        const introContent = typeof categoryData.intro === 'string' 
            ? categoryData.intro 
            : categoryData.intro;
        addMessage(introContent, 'bot');
    }

    if (categoryData.items && categoryData.items.length > 0) {
        if (categoryData.items[0].title) {
            // List mode
            const subOptions = categoryData.items.map(item => ({
                text: item.title,
                action: () => showSubItem(item)
            }));
            subOptions.push({ text: '↩ Volver al menú', action: showMainMenu });
            addOptions(subOptions);
        } else {
            // Narrative mode
            showSequentialStep();
        }
    }
}

function showSubItem(item) {
    addMessage(item, 'bot'); // Item can be object with image/audio
    
    const options = [
        { text: `🔄 Ver otro de "${currentCategory}"`, action: () => selectCategory(currentCategory) },
        { text: '↩ Volver al menú', action: showMainMenu }
    ];
    addOptions(options);
}

function showSequentialStep() {
    const items = chatResponses[currentCategory].items;
    if (stepIndex < items.length) {
        addMessage(items[stepIndex], 'bot');
        stepIndex++;

        const nextOptions = [];
        if (stepIndex < items.length) {
            nextOptions.push({ text: '▶ Siguiente', action: showSequentialStep });
        }
        nextOptions.push({ text: '↩ Volver al menú', action: showMainMenu });
        addOptions(nextOptions);
    }
}

// Initialization
function initChat() {
    fetch('assets/data/chat_responses.json')
        .then(res => res.json())
        .then(data => {
            chatResponses = data;
            
            // Allow loader to be handled by loader.js or manually hide if it exists inside chat container
            const localLoader = document.querySelector('#chat-container #loader');
            if(localLoader) localLoader.style.display = 'none';

            chatContainer.innerHTML = '';
            showMainMenu();
            if (typeof lucide !== 'undefined') lucide.createIcons();
        })
        .catch(err => {
            console.error("Error loading chat data:", err);
            addMessage("Lo siento, no pude cargar mi memoria (Error JSON).", 'bot');
        });

    const soundToggle = document.getElementById('sound-checkbox');
    if (soundToggle) {
        soundToggle.addEventListener('change', () => {
            VoiceModule.toggleSound();
        });
    }
}

document.addEventListener('DOMContentLoaded', initChat);
