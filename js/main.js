/**
 * INVITACIÓN DIGITAL PREMIUM DE XV AÑOS - LÓGICA PRINCIPAL VANILLA JS
 * Quinceañera: Romina Salazar Vidal
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener la configuración centralizada
    const data = window.invitationData || {};

    // 2. Inicializar contenido dinámico
    initDynamicContent(data);
    initCountdown(data.eventDate);
    
    // 3. Inicializar manejador de sobre/portada inicial
    initEnvelopeScreen(data);

    // 4. Inicializar navegación y utilidades
    initMobileNav();
    initScrollAnimations();
    initLightbox(data.gallery || []);
    initFloatingPetals();
    initRsvp(data);
});

/* --------------------------------------------------------------------------
   1. POBLAR CONTENIDO DINÁMICO DESDE CONFIG.JS
   -------------------------------------------------------------------------- */
function initDynamicContent(data) {
    const displayName = data.shortName || "Romina";
    const fullName = data.quinceaneraName || "Romina Salazar Vidal";

    // Portada Inicial (Sobre Digital)
    setElementText('env-name', displayName);
    setElementText('env-subtitle', data.eventSubtitle || "Mis XV Años");
    setElementText('env-phrase', data.heroPhrase);

    if (data.heroImage) {
        const envSec = document.getElementById('envelope-screen');
        if (envSec) {
            envSec.style.backgroundImage = `url('${data.heroImage}')`;
        }
    }

    // Cabecera de la Invitación Interna
    setElementText('header-quinceanera-name', displayName);
    setElementText('header-phrase', data.heroPhrase);

    // Bienvenida
    setElementText('welcome-title', data.welcomeTitle);
    setElementText('welcome-message', data.welcomeMessage);

    // Event Info Cards (Mi Celebración 4 círculos)
    setElementText('info-date-val', data.displayDate || "06 de Noviembre");
    setElementText('info-time-val', data.eventTime || "14:00 hrs");
    setElementText('info-venue-val', data.venue || "Salón de Eventos");
    setElementText('info-address-val', data.address ? data.address.split(',')[0] : "Huanimaro");

    // Ubicación & Mapa
    setElementText('map-venue-name', data.venue);
    setElementText('map-address-text', data.address);
    const mapBtn = document.getElementById('map-directions-btn');
    if (mapBtn) {
        if (data.googleMapsUrl) {
            mapBtn.href = data.googleMapsUrl;
            mapBtn.style.display = 'inline-flex';
        } else {
            mapBtn.style.display = 'none';
        }
    }

    const mapIframe = document.getElementById('google-map-iframe');
    if (mapIframe && data.googleMapsEmbedUrl) {
        mapIframe.src = data.googleMapsEmbedUrl;
    }

    // Dress Code
    setElementText('dresscode-title', data.dressCode || "Formal");
    setElementText('dresscode-desc', data.dressCodeDescription || "");

    // Itinerario Timeline
    renderItinerary(data.itinerary || []);

    // Galería
    renderGallery(data.gallery || []);

    // Padres y Padrinos
    renderParentsAndGodparents(data.parentsAndGodparents);

    // Mensaje Final y Footer
    setElementText('final-phrase-text', data.finalMessage);
    setElementText('final-quinceanera-name', displayName);
    setElementText('footer-text', data.footerText || `Con cariño, ${fullName} • Mis XV Años 🌸`);
}

function setElementText(id, text) {
    const el = document.getElementById(id);
    if (el && text !== undefined) {
        el.textContent = text;
    }
}

/* --------------------------------------------------------------------------
   2. PANTALLA DE APERTURA (ENVELOPE SCREEN TRIGGER & MUSIC AUTOPLAY)
   -------------------------------------------------------------------------- */
let audioPlayerInstance = null;

function initEnvelopeScreen(data) {
    const openBtn = document.getElementById('open-invitation-btn');
    const envScreen = document.getElementById('envelope-screen');
    const mainContent = document.getElementById('invitation-content');

    const topNavBar = document.getElementById('top-nav-bar');
    const bottomNav = document.getElementById('mobile-bottom-nav');

    audioPlayerInstance = initAudioPlayer(data.musicUrl);

    if (!openBtn || !envScreen || !mainContent) return;

    openBtn.addEventListener('click', () => {
        // 1. Iniciar animación de salida de la portada
        envScreen.classList.add('hidden');
        
        // 2. Desbloquear scroll en el body
        document.body.classList.remove('envelope-active');

        // 3. Revelar la invitación completa con transición suave
        mainContent.classList.add('visible');

        // 4. Mostrar top nav bar y bottom nav bar
        if (topNavBar) topNavBar.classList.remove('hidden');
        if (bottomNav) bottomNav.classList.remove('hidden');

        // 5. Iniciar la música de fondo
        if (audioPlayerInstance && typeof audioPlayerInstance.playAudio === 'function') {
            audioPlayerInstance.playAudio();
        }

        // 6. Activar observador de animaciones
        setTimeout(() => {
            initScrollAnimations();
        }, 100);
    });
}

/* --------------------------------------------------------------------------
   3. REPRODUCTOR DE MÚSICA DE FONDO
   -------------------------------------------------------------------------- */
function initAudioPlayer(musicUrl) {
    const btn = document.getElementById('music-toggle-btn');
    if (!btn || !musicUrl || musicUrl.trim() === "") {
        if (btn) btn.style.display = 'none';
        return null;
    }

    const audio = new Audio(musicUrl);
    audio.loop = true;
    let isPlaying = false;

    btn.addEventListener('click', () => {
        if (isPlaying) pauseAudio();
        else playAudio();
    });

    function playAudio() {
        audio.play().then(() => {
            btn.classList.add('playing');
            btn.setAttribute('aria-label', 'Pausar música');
            isPlaying = true;
        }).catch(err => {
            console.log("Audio play prevented:", err);
        });
    }

    function pauseAudio() {
        audio.pause();
        btn.classList.remove('playing');
        btn.setAttribute('aria-label', 'Reproducir música');
        isPlaying = false;
    }

    return { playAudio, pauseAudio };
}

/* --------------------------------------------------------------------------
   4. CUENTA REGRESIVA DINÁMICA
   -------------------------------------------------------------------------- */
function initCountdown(targetDateIso) {
    const daysEl = document.getElementById('cd-days');
    const hoursEl = document.getElementById('cd-hours');
    const minutesEl = document.getElementById('cd-minutes');
    const secondsEl = document.getElementById('cd-seconds');

    if (!daysEl || !targetDateIso) return;

    const targetTime = new Date(targetDateIso).getTime();

    function update() {
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    update();
    setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   5. RENDERIZADO DE ITINERARIO (TIMELINE REFINADA)
   -------------------------------------------------------------------------- */
function renderItinerary(items) {
    const container = document.getElementById('itinerary-timeline');
    if (!container) return;

    container.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'timeline-row';
        div.innerHTML = `
            <div class="timeline-row-dot"></div>
            <div class="timeline-time-text">${item.time}</div>
            <div class="timeline-event-name">${item.title}</div>
        `;
        container.appendChild(div);
    });
}

/* --------------------------------------------------------------------------
   6. RENDERIZADO DE GALERÍA Y LIGHTBOX INTERACTIVO
   -------------------------------------------------------------------------- */
let currentImageIndex = 0;
let galleryImages = [];

function renderGallery(images) {
    const grid = document.getElementById('gallery-grid');
    if (!grid) return;

    grid.innerHTML = '';
    galleryImages = images;

    images.forEach((imgObj, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item reveal-on-scroll';
        item.setAttribute('data-index', index);
        item.innerHTML = `
            <img src="${imgObj.url}" alt="${imgObj.caption || 'Foto de Romina'}" loading="lazy" />
        `;

        item.addEventListener('click', () => openLightbox(index));
        grid.appendChild(item);
    });
}

function initLightbox(images) {
    const modal = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (!modal) return;

    closeBtn?.addEventListener('click', closeLightbox);
    prevBtn?.addEventListener('click', showPrevImage);
    nextBtn?.addEventListener('click', showNextImage);

    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) showNextImage();
        if (touchEndX > touchStartX + swipeThreshold) showPrevImage();
    }
}

function openLightbox(index) {
    const modal = document.getElementById('lightbox-modal');
    if (!modal || galleryImages.length === 0) return;

    currentImageIndex = index;
    updateLightboxContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    modal.classList.remove('active');
    if (!document.getElementById('envelope-screen').classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function showPrevImage() {
    if (galleryImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxContent();
}

function showNextImage() {
    if (galleryImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const imgEl = document.getElementById('lightbox-img');
    const captionEl = document.getElementById('lightbox-caption');

    const item = galleryImages[currentImageIndex];
    if (item && imgEl) {
        imgEl.src = item.url;
        if (captionEl) captionEl.textContent = item.caption || '';
    }
}

/* --------------------------------------------------------------------------
   7. PADRES Y PADRINOS
   -------------------------------------------------------------------------- */

function renderParentsAndGodparents(data) {
    const section = document.getElementById('section-gifts');

    if (!section) return;

    // Si la sección está desactivada desde config.js
    if (!data || !data.enabled) {
        section.style.display = 'none';
        return;
    }

    // Título y descripción
    setElementText(
        'parents-godparents-title',
        data.title || 'Padres y Padrinos'
    );

    setElementText(
        'parents-godparents-subtitle',
        data.subtitle || ''
    );

    // Padres
    if (data.parents) {

        setElementText(
            'parents-title',
            data.parents.title || 'Mis Padres'
        );

        setElementText(
            'father-name',
            data.parents.father || ''
        );

        setElementText(
            'mother-name',
            data.parents.mother || ''
        );
    }

    // Padrinos
    if (data.godparents) {

        setElementText(
            'godparents-title',
            data.godparents.title || 'Mis Padrinos'
        );

        setElementText(
            'godfather-name',
            data.godparents.godfather || ''
        );

        setElementText(
            'godmother-name',
            data.godparents.godmother || ''
        );
    }
}

/* --------------------------------------------------------------------------
   8. CONFIRMACIÓN RSVP POR WHATSAPP
   -------------------------------------------------------------------------- */
function initRsvp(data) {
    const btn = document.getElementById('whatsapp-rsvp-btn');
    if (!btn) return;

    const phone = data.whatsappNumber ? data.whatsappNumber.replace(/[^0-9]/g, '') : '';
    let message = data.whatsappMessageTemplate || "Hola, confirmo mi asistencia a los XV años de {NAME}.";
    message = message.replace('{NAME}', data.shortName || 'Romina');
    message = message.replace('{DATE}', data.displayDate || '');

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`;

    btn.href = whatsappUrl;
    btn.target = "_blank";
}

/* --------------------------------------------------------------------------
   9. NAVEGACIÓN MÓVIL (DRAWER Y TAB BAR INFERIOR)
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const links = document.querySelectorAll('.mobile-nav-link, .mobile-bottom-tab');

    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
        const isOpen = drawer.classList.contains('open');
        if (isOpen) closeNav();
        else openNav();
    });

    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeNav();
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            closeNav();
            
            if (link.classList.contains('mobile-bottom-tab')) {
                document.querySelectorAll('.mobile-bottom-tab').forEach(t => t.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    function openNav() {
        drawer.classList.add('open');
        toggleBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeNav() {
        drawer.classList.remove('open');
        toggleBtn.classList.remove('active');
        if (!document.getElementById('envelope-screen').classList.contains('hidden')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

/* --------------------------------------------------------------------------
   10. ANIMACIONES AL SCROLL
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -15px 0px'
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/* --------------------------------------------------------------------------
   11. ANIMACIÓN CANVAS DE PÉTALOS ROSA FLOTANTES
   -------------------------------------------------------------------------- */
function initFloatingPetals() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const petalCount = 20;
    const petals = [];

    class Petal {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * -height;
            this.size = Math.random() * 8 + 5;
            this.speedY = Math.random() * 1.1 + 0.5;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 1.4;
            this.opacity = Math.random() * 0.45 + 0.25;
        }

        update() {
            this.y += this.speedY;
            this.x += Math.sin(this.y * 0.01) + this.speedX;
            this.rotation += this.rotationSpeed;

            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;

            ctx.fillStyle = '#E89CAE';
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, this.size / 3, 0, this.size);
            ctx.bezierCurveTo(this.size, this.size / 3, this.size / 2, -this.size / 2, 0, 0);
            ctx.fill();

            ctx.restore();
        }
    }

    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
}
