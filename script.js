
// === ENHANCED OVERLAY SYSTEM ===
function showOverlay(title, message, imageSrc = '/images/larry-evil-lookin.jpg') {
    const overlay = document.getElementById('custom-overlay');
    const overlayTitle = overlay.querySelector('.overlay-title');
    const overlayMessage = overlay.querySelector('.overlay-message');
    const overlayImage = overlay.querySelector('.overlay-image');
    
    // Set content
    overlayTitle.textContent = title;
    overlayMessage.textContent = message;
    if (imageSrc) {
        overlayImage.style.backgroundImage = `url('${imageSrc}')`;
    }
    
    // Show overlay with animation
    overlay.classList.add('show');
    overlay.setAttribute('aria-hidden', 'false');
    
    // Focus management for accessibility
    const closeBtn = overlay.querySelector('.overlay-close');
    closeBtn.focus();
    
    return overlay;
}

function hideOverlay() {
    const overlay = document.getElementById('custom-overlay');
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
}

// === ENHANCED CONTRACT COPY FUNCTION ===
function copyContract() {
    const contractDisplay = document.querySelector(".ca-display");
    const contractAddress = contractDisplay.textContent.trim();
    const statusElement = contractDisplay.querySelector(".ca-status");
    
    // Modern Clipboard API with fallback
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(contractAddress)
            .then(() => {
                statusElement.classList.add("show");
                setTimeout(() => statusElement.classList.remove("show"), 1500);
                
                // Success overlay
                showOverlay(
                    "Contract Copied! 📋",
                    `Larry's contract address is now in your clipboard. Use it wisely... or Larry will judge your trades.`,
                    '/images/larry-sit-eyecontact.jpg'
                );
                
                setTimeout(hideOverlay, 3000);
            })
            .catch(err => {
                console.warn('Clipboard API failed, using fallback:', err);
                fallbackCopyTextToClipboard(contractAddress, statusElement);
            });
    } else {
        fallbackCopyTextToClipboard(contractAddress, statusElement);
    }
}

function fallbackCopyTextToClipboard(text, statusElement) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            statusElement.classList.add("show");
            setTimeout(() => statusElement.classList.remove("show"), 1500);
            
            showOverlay(
                "Contract Copied! 📋",
                "Larry's contract address copied using legacy method. Your browser is almost as old as Larry's grudges.",
                '/images/larry-evil-lookin-2.jpg'
            );
            setTimeout(hideOverlay, 3000);
        } else {
            throw new Error('Copy command failed');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showOverlay(
            "Copy Failed! 😾",
            "Larry's claws prevented the copy. Please manually select and copy the contract address. Even Larry can't help you now.",
            '/images/larry-fud-bottom.jpg'
        );
        setTimeout(hideOverlay, 4000);
    }
    
    document.body.removeChild(textArea);
}

// === ENHANCED WALLET SACRIFICE FUNCTION ===
function sacrificeWallet() {
    const messages = [
        {
            title: "Burning Seed Phrase... 🔥",
            message: "Larry watches as your precious words turn to ash. Your wallet's soul now belongs to the void. Hope you have backups...",
            image: '/images/larry-evil-red-bg.jpg'
        },
        {
            title: "Sacrificing to Larry... 🩸",
            message: "The ritual is complete. Larry has accepted your offering. Your portfolio is now cursed with eternal volatility.",
            image: '/images/larry-dracula.jpg'
        },
        {
            title: "Rewriting LP in Blood... 💀",
            message: "Liquidity pools now flow with crimson. Every trade will remind you of this moment. Larry's signature is permanent.",
            image: '/images/larry-dracula-red-bg.jpg'
        },
        {
            title: "Portal to Cat-pocalypse... 🌀",
            message: "The gateway opens. Ancient feline forces pour into the markets. Your charts will never look the same again.",
            image: '/images/larry-shadow.jpg'
        }
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    showOverlay(
        randomMessage.title,
        randomMessage.message,
        randomMessage.image
    );
    
    // Auto-hide after 5 seconds
    setTimeout(hideOverlay, 5000);
    
    // Unlock any sealed cards (if they exist)
    try {
        document.querySelectorAll('.card.sealed').forEach(card => {
            card.classList.remove('sealed');
        });
    } catch (err) {
        console.warn('No sealed cards found:', err);
    }
}

// === WISDOM SYSTEM ===
const wisdoms = [
    {
        title: "🧪 1. Degenerate Wisdom",
        points: [
            "Every red candle is just Larry testing your soul integrity.",
            "Real conviction starts when your PnL cries for help.",
            "TA ends where Larry's tail begins. All else is cope.",
            "You don't buy dips. You marry pain in cold blood.",
            "If it made sense, it wouldn't be $LARRY.",
            "The best traders are either broke or lying. Larry is both.",
            "You didn't lose money – you bought enlightenment."
        ]
    },
    {
        title: "🟢 2. Bullish Lore",
        points: [
            "Larry doesn't ride waves – he causes tsunamis.",
            "Each dump is just Larry gathering momentum.",
            "If the wick hurts, the pump will heal.",
            "The longer it bleeds, the stronger it rises. Ask Larry's claws.",
            "When charts look cursed, Larry sharpens his fangs.",
            "Bullish isn't a pattern. It's an ancient feeling Larry remembers.",
            "You don't need volume. You need Larry's attention."
        ]
    },
    {
        title: "🧠 3. Pump Psychology",
        points: [
            "Confirmation bias is bullish if you never doubt.",
            "You don't chase the pump – you become the narrative.",
            "If it feels like a rug, it might be a trampoline.",
            "Your fear is their liquidity. Larry thanks you.",
            "There is no FOMO. There is only delayed destiny.",
            "Momentum is a myth. Larry just wants to move the line.",
            "You don't enter the market. The market enters you."
        ]
    }
];

function showWisdom(index) {
    try {
        const wisdomBlock = document.getElementById("wisdom-block");
        const wisdom = wisdoms[index];
        
        if (!wisdom) {
            console.error('Wisdom not found for index:', index);
            return;
        }
        
        wisdomBlock.innerHTML = `
            <h3>${wisdom.title}</h3>
            <ul>${wisdom.points.map(point => `<li>${point}</li>`).join('')}</ul>
        `;
        
        wisdomBlock.classList.add("active");
        
        // Update button states
        document.querySelectorAll('.wisdom-btn').forEach((btn, btnIndex) => {
            const isActive = btnIndex === index;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);
            
            if (isActive) {
                btn.id = 'active-wisdom-tab';
            } else {
                btn.removeAttribute('id');
            }
        });
        
    } catch (error) {
        console.error('Error showing wisdom:', error);
    }
}

// === LARRY CAROUSEL - OPTIMIERTE KLASSEN-BASIERTE IMPLEMENTIERUNG ===
class LarryCarousel {
    constructor(selector, options = {}) {
        // DOM-Element finden und validieren
        this.carousel = document.querySelector(selector);
        if (!this.carousel) {
            console.error(`LarryCarousel: Element not found: ${selector}`);
            return null;
        }

        // Konfiguration mit Defaults
        this.config = {
            autoPlay: options.autoPlay ?? true,
            autoPlayInterval: options.autoPlayInterval ?? 5000,
            swipeThreshold: options.swipeThreshold ?? 50,
            keyboardNavigation: options.keyboardNavigation ?? true,
            accessibility: options.accessibility ?? true,
            lazyLoad: options.lazyLoad ?? true,
            ...options
        };

        // Zustandsvariablen
        this.currentIndex = 0;
        this.totalItems = 0;
        this.isAutoPlaying = false;
        this.isTransitioning = false;
        this.isDragging = false;
        this.autoPlayInterval = null;
        this.intersectionObserver = null;

        // Touch/Mouse Event Variablen
        this.startX = 0;
        this.startY = 0;
        this.startTime = 0;
        this.currentX = 0;

        // Bild-Datenstruktur
        this.imageData = [
            { src: "larry", alt: "Larry der böse Hauptcharakter", tooltip: "The original curse" },
            { src: "larry-char-dev", alt: "Larry Character Development", tooltip: "Every dip builds character" },
            { src: "larry-cute", alt: "Süßer Larry - Täuschung", tooltip: "A deception in fur" },
            { src: "larry-cute-2", alt: "Süßer Larry 2 - Vertraue nicht", tooltip: "Don't trust the purr" },
            { src: "larry-dracula", alt: "Dracula Larry - Vampir", tooltip: "Sleeps in red candles" },
            { src: "larry-dracula-red-bg", alt: "Dracula Larry roter Hintergrund", tooltip: "The blood moon phase" },
            { src: "a-larry-dark-silou", alt: "Larry dunkle Silhouette", tooltip: "Larry emerges from the shadows" },
            { src: "a-larry-gun", alt: "Larry mit Waffe", tooltip: "Don't mess with Larry" },
            { src: "a-silou-dark", alt: "Dunkle Silhouette", tooltip: "A mysterious presence watches" },
            { src: "larry-dracula-red-bg-2", alt: "Dracula Larry rot 2", tooltip: "Born in shadow liquidity" },
            { src: "larry-evil_silly-banner", alt: "Böser aber lustiger Larry", tooltip: "Evil but marketable" },
            { src: "larry-evil-lookin", alt: "Böse blickender Larry", tooltip: "He knows you sold" },
            { src: "larry-evil-lookin-2", alt: "Böse blickender Larry 2", tooltip: "He warned you" },
            { src: "larry-evil-red-bg", alt: "Böser Larry roter Hintergrund", tooltip: "Red background. Redder fate." },
            { src: "larry-fud-bottom", alt: "Larry FUD Bottom", tooltip: "Peenar confirmed" },
            { src: "larry-fullface", alt: "Larry Vollgesicht", tooltip: "You were never safe" },
            { src: "larry-poster-red-bg", alt: "Larry Poster rot", tooltip: "CT's most wanted" },
            { src: "larry-shadow", alt: "Larry Schatten", tooltip: "Lurks under support" },
            { src: "larry-sit-eyecontact", alt: "Sitzender Larry Blickkontakt", tooltip: "Judging your trades" },
            { src: "larry-sit-eyecontact-2", alt: "Sitzender Larry Blickkontakt 2", tooltip: "Still judging" },
            { src: "larry-sit-eyecontact-3", alt: "Sitzender Larry Blickkontakt 3", tooltip: "You disappoint him" },
            { src: "larry-sit-eyecontact-4", alt: "Sitzender Larry Blickkontakt 4", tooltip: "Your liquidation fuels him" },
            { src: "larry-stand", alt: "Stehender Larry", tooltip: "Alpha posture" },
            { src: "larry-towel", alt: "Larry mit Handtuch", tooltip: "Cleans up your cope" }
        ];

        this.totalItems = this.imageData.length;

        // Initialisierung starten
        this.init();
    }

    // === INITIALISIERUNG ===
    init() {
        try {
            this.createCarouselStructure();
            this.populateCarousel();
            this.setupEventListeners();
            this.setupIntersectionObserver();
            this.setupAccessibility();
            
            if (this.config.autoPlay) {
                this.startAutoPlay();
            }

            console.log('🎠 Larry Carousel initialized successfully');
        } catch (error) {
            console.error('LarryCarousel initialization failed:', error);
        }
    }

    // === DOM-STRUKTUR ERSTELLEN ===
    createCarouselStructure() {
        this.carousel.innerHTML = `
            <button class="carousel-btn carousel-btn--prev" type="button" aria-label="Vorheriges Bild anzeigen">
                ‹
            </button>
            <div class="carousel-track" role="region" aria-label="Larry Bilder Karussell" aria-live="polite"></div>
            <button class="carousel-btn carousel-btn--next" type="button" aria-label="Nächstes Bild anzeigen">
                ›
            </button>
            <div class="carousel-indicators" role="tablist" aria-label="Bildauswahl"></div>
        `;

        // Referenzen zu DOM-Elementen
        this.track = this.carousel.querySelector('.carousel-track');
        this.prevBtn = this.carousel.querySelector('.carousel-btn--prev');
        this.nextBtn = this.carousel.querySelector('.carousel-btn--next');
        this.indicators = this.carousel.querySelector('.carousel-indicators');
    }

    // === CAROUSEL ITEMS ERSTELLEN ===
    populateCarousel() {
        this.track.innerHTML = '';
        
        this.imageData.forEach((imageData, index) => {
            const item = this.createCarouselItem(imageData, index);
            this.track.appendChild(item);
        });

        this.updateCarousel();
        this.createIndicators();
    }

    // === EINZELNES CAROUSEL ITEM ERSTELLEN ===
    createCarouselItem(imageData, index) {
        const item = document.createElement('div');
        item.className = 'carousel-item';
        item.setAttribute('role', 'img');
        item.setAttribute('aria-describedby', `tooltip-${index}`);
        item.setAttribute('tabindex', '0');

        // Progressive Enhancement mit Picture Element
        const picture = document.createElement('picture');
        
        // Modern formats (AVIF, WebP) 
        const avifSource = document.createElement('source');
        avifSource.type = 'image/avif';
        avifSource.srcset = `/images/${imageData.src}.avif`;
        picture.appendChild(avifSource);

        const webpSource = document.createElement('source');
        webpSource.type = 'image/webp';
        webpSource.srcset = `/images/${imageData.src}.webp`;
        picture.appendChild(webpSource);

        // Fallback JPG
        const img = document.createElement('img');
        img.src = `/images/${imageData.src}.jpg`;
        img.alt = imageData.alt;
        img.loading = index < 3 ? 'eager' : 'lazy'; // Erste 3 Bilder eager laden
        img.decoding = 'async';
        
        // Error Handling
        img.onerror = () => this.handleImageError(img, imageData);
        
        picture.appendChild(img);
        item.appendChild(picture);

        // Tooltip erstellen
        if (imageData.tooltip) {
            const tooltip = document.createElement('div');
            tooltip.className = 'carousel-tooltip';
            tooltip.id = `tooltip-${index}`;
            tooltip.textContent = imageData.tooltip;
            tooltip.setAttribute('role', 'tooltip');
            item.appendChild(tooltip);
        }

        return item;
    }

    // === CAROUSEL ZUSTAND AKTUALISIEREN ===
    updateCarousel() {
        const items = this.track.querySelectorAll('.carousel-item');
        
        items.forEach((item, index) => {
            // Alle Position-Klassen entfernen
            item.classList.remove('current', 'next', 'prev', 'next2', 'prev2', 'hidden');
            
            // Relative Position berechnen (mit Wraparound)
            let relativePos = index - this.currentIndex;
            if (relativePos > this.totalItems / 2) {
                relativePos -= this.totalItems;
            } else if (relativePos < -this.totalItems / 2) {
                relativePos += this.totalItems;
            }

            // Position-Klassen zuweisen
            switch (relativePos) {
                case 0:
                    item.classList.add('current');
                    break;
                case 1:
                    item.classList.add('next');
                    break;
                case -1:
                    item.classList.add('prev');
                    break;
                case 2:
                    item.classList.add('next2');
                    break;
                case -2:
                    item.classList.add('prev2');
                    break;
                default:
                    item.classList.add('hidden');
            }
        });

        this.updateIndicators();
        this.announceSlideChange();
    }

    // === NAVIGATION METHODEN ===
    next() {
        if (this.isTransitioning) return;
        this.moveCarousel(1);
    }

    prev() {
        if (this.isTransitioning) return;
        this.moveCarousel(-1);
    }

    goTo(index) {
        if (this.isTransitioning || index === this.currentIndex) return;
        if (index < 0 || index >= this.totalItems) return;
        
        this.currentIndex = index;
        this.updateCarousel();
        this.resetAutoPlay();
    }

    moveCarousel(direction) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Neuen Index berechnen (mit Wraparound)
        this.currentIndex = (this.currentIndex + direction + this.totalItems) % this.totalItems;
        
        this.updateCarousel();
        
        // Transition Lock nach Animation freigeben
        setTimeout(() => {
            this.isTransitioning = false;
        }, 400);

        this.resetAutoPlay();
    }

    // === INDICATORS SYSTEM ===
    createIndicators() {
        this.indicators.innerHTML = '';
        
        for (let i = 0; i < this.totalItems; i++) {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('role', 'tab');
            indicator.setAttribute('aria-label', `Zu Bild ${i + 1} wechseln`);
            indicator.setAttribute('tabindex', '-1');
            indicator.onclick = () => this.goTo(i);
            
            this.indicators.appendChild(indicator);
        }
    }

    updateIndicators() {
        const indicators = this.indicators.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            const isActive = index === this.currentIndex;
            indicator.classList.toggle('active', isActive);
            indicator.setAttribute('aria-selected', isActive);
            indicator.setAttribute('tabindex', isActive ? '0' : '-1');
        });
    }

    // === EVENT LISTENERS ===
    setupEventListeners() {
        // Button Navigation
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Touch Events
        this.setupTouchEvents();
        
        // Keyboard Events
        if (this.config.keyboardNavigation) {
            this.setupKeyboardEvents();
        }

        // Auto-Play Pause/Resume
        this.carousel.addEventListener('mouseenter', () => this.pauseAutoPlay());
        this.carousel.addEventListener('mouseleave', () => this.resumeAutoPlay());
        this.carousel.addEventListener('focusin', () => this.pauseAutoPlay());
        this.carousel.addEventListener('focusout', () => this.resumeAutoPlay());

        // Visibility Change (Tab Wechsel)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAutoPlay();
            } else {
                this.resumeAutoPlay();
            }
        });
    }

    // === TOUCH & SWIPE EVENTS ===
    setupTouchEvents() {
        // Touch Events
        this.track.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
        this.track.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        this.track.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: true });

        // Mouse Events für Desktop-Drag
        this.track.addEventListener('mousedown', (e) => this.handleTouchStart(e));
        this.track.addEventListener('mousemove', (e) => this.handleTouchMove(e));
        this.track.addEventListener('mouseup', (e) => this.handleTouchEnd(e));
        this.track.addEventListener('mouseleave', (e) => this.handleTouchEnd(e));
    }

    handleTouchStart(e) {
        this.isDragging = true;
        this.startTime = Date.now();
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        this.startX = clientX;
        this.startY = clientY;
        this.currentX = clientX;

        this.pauseAutoPlay();
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        this.currentX = clientX;
        
        // Vertikale Bewegung erkennen und Touch-Event nicht blockieren
        const deltaY = Math.abs(clientY - this.startY);
        const deltaX = Math.abs(clientX - this.startX);
        
        if (deltaX > deltaY && deltaX > 10) {
            e.preventDefault(); // Nur horizontale Swipes blockieren
        }
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        
        const deltaX = this.startX - this.currentX;
        const deltaY = Math.abs((e.changedTouches ? e.changedTouches[0].clientY : e.clientY) - this.startY);
        const swipeTime = Date.now() - this.startTime;
        
        // Nur horizontale Swipes verarbeiten
        if (deltaY > Math.abs(deltaX)) {
            this.resumeAutoPlay();
            return;
        }
        
        // Swipe-Erkennung: schnell oder weit genug
        const threshold = this.config.swipeThreshold;
        const isQuickSwipe = swipeTime < 300 && Math.abs(deltaX) > 20;
        const isLongSwipe = Math.abs(deltaX) > threshold;
        
        if (isQuickSwipe || isLongSwipe) {
            if (deltaX > 0) {
                this.next(); // Nach links swipen = nächstes Bild
            } else {
                this.prev(); // Nach rechts swipen = vorheriges Bild
            }
        }
        
        setTimeout(() => this.resumeAutoPlay(), 100);
    }

    // === KEYBOARD NAVIGATION ===
    setupKeyboardEvents() {
        document.addEventListener('keydown', (e) => {
            // Nur aktiv wenn Carousel fokussiert oder gehovered
            const isCarouselActive = this.carousel.matches(':hover') || 
                                   this.carousel.contains(document.activeElement);
            
            if (!isCarouselActive) return;
            
            switch (e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    this.prev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    this.next();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleAutoPlay();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goTo(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goTo(this.totalItems - 1);
                    break;
                case 'Enter':
                    if (e.target.classList.contains('carousel-indicator')) {
                        e.preventDefault();
                        e.target.click();
                    }
                    break;
            }
        });
    }

    // === AUTO-PLAY SYSTEM ===
    startAutoPlay() {
        if (!this.config.autoPlay || this.isAutoPlaying) return;
        
        // Respektiere "prefers-reduced-motion"
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }
        
        this.isAutoPlaying = true;
        this.autoPlayInterval = setInterval(() => {
            if (!document.hidden && !this.isDragging) {
                this.next();
            }
        }, this.config.autoPlayInterval);
    }

    pauseAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
        this.isAutoPlaying = false;
    }

    resumeAutoPlay() {
        if (this.config.autoPlay && !this.isAutoPlaying) {
            setTimeout(() => this.startAutoPlay(), 1000); // 1s Verzögerung nach Interaktion
        }
    }

    toggleAutoPlay() {
        if (this.isAutoPlaying) {
            this.pauseAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }

    resetAutoPlay() {
        if (this.config.autoPlay) {
            this.pauseAutoPlay();
            this.resumeAutoPlay();
        }
    }

    // === INTERSECTION OBSERVER ===
    setupIntersectionObserver() {
        if (!window.IntersectionObserver) return;
        
        this.intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.resumeAutoPlay();
                } else {
                    this.pauseAutoPlay();
                }
            });
        }, { threshold: 0.3 });
        
        this.intersectionObserver.observe(this.carousel);
    }

    // === ACCESSIBILITY ===
    setupAccessibility() {
        if (!this.config.accessibility) return;
        
        // ARIA-Label für Track aktualisieren
        this.updateAriaLabel();
    }

    updateAriaLabel() {
        const currentImage = this.imageData[this.currentIndex];
        this.track.setAttribute(
            'aria-label', 
            `Bild ${this.currentIndex + 1} von ${this.totalItems}: ${currentImage.alt}`
        );
    }

    announceSlideChange() {
        if (!this.config.accessibility) return;
        
        // Live Region für Screen Reader Updates
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = `Zeige Bild ${this.currentIndex + 1} von ${this.totalItems}`;
        
        document.body.appendChild(announcement);
        setTimeout(() => {
            if (document.body.contains(announcement)) {
                document.body.removeChild(announcement);
            }
        }, 1000);
        
        this.updateAriaLabel();
    }

    // === ERROR HANDLING ===
    handleImageError(img, imageData) {
        console.warn(`Image failed to load: ${imageData.src}`);
        
        // Fallback zum Standard Larry Bild
        img.src = '/images/larry.jpg';
        img.alt = 'Larry - Fallback Image';
        img.classList.add('error-fallback');
    }

    // === ÖFFENTLICHE API ===
    destroy() {
        // Auto-Play stoppen
        this.pauseAutoPlay();
        
        // Intersection Observer aufräumen
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = null;
        }
        
        // Event Listeners entfernen
        this.carousel.innerHTML = '';
        
        console.log('🎠 Larry Carousel destroyed');
    }

    // Konfiguration zur Laufzeit ändern
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        
        if (!this.config.autoPlay) {
            this.pauseAutoPlay();
        } else {
            this.startAutoPlay();
        }
    }

    // Getter für aktuellen Zustand
    get current() {
        return {
            index: this.currentIndex,
            total: this.totalItems,
            isAutoPlaying: this.isAutoPlaying,
            isTransitioning: this.isTransitioning
        };
    }
}

// === INITIALISIERUNG IN DOMContentLoaded ===
// Diese Zeilen ersetzen die bestehende Carousel-Initialisierung
document.addEventListener("DOMContentLoaded", () => {
    // Alte Carousel-Initialisierung durch diese Zeile ersetzen:
    window.larryCarousel = new LarryCarousel('.carousel', {
        autoPlay: true,
        autoPlayInterval: 5000,
        swipeThreshold: 50,
        keyboardNavigation: true,
        accessibility: true,
        lazyLoad: true
    });
    
    // Custom Event für externe Integration
    if (window.larryCarousel) {
        window.larryCarousel.carousel.addEventListener('slideChange', (e) => {
            console.log('Larry Carousel changed to slide:', e.detail.currentIndex);
        });
    }
});
// === TICKER SYSTEM ===
function initializeTicker() {
    try {
        const tickerData = [
            ["They called it a top", "$Larry called it brunch."],
            ["$Larry doesn't DCA.", "He full-sends on fear."],
            ["Volume spikes", "when $Larry blinks."],
            ["$Larry bought.", "That's the alpha."],
            ["Buy dips?", "$Larry creates them."],
            ["$Larry don't chart –", "he declares."],
            ["No TA,", "just $Larry."],
            ["The chart follows $Larry,", "not the other way around."],
            ["$Larry aped first,", "asked questions never."]
        ];
        
        const ticker = document.getElementById("larry-ticker");
        if (!ticker) {
            console.warn('Ticker element not found');
            return;
        }
        
        const track = document.createElement("div");
        track.className = "ticker-track";
        
        // Create ticker items (duplicate for seamless loop)
        tickerData.forEach(item => {
            const tickerItem = document.createElement("div");
            tickerItem.className = "ticker-item";
            tickerItem.innerHTML = `<div>${item[0]}</div><div>${item[1]}</div>`;
            track.appendChild(tickerItem);
        });
        
        // Duplicate for seamless scrolling
        tickerData.forEach(item => {
            const tickerItem = document.createElement("div");
            tickerItem.className = "ticker-item";
            tickerItem.innerHTML = `<div>${item[0]}</div><div>${item[1]}</div>`;
            track.appendChild(tickerItem);
        });
        
        ticker.appendChild(track);
        
    } catch (error) {
        console.error('Error initializing ticker:', error);
    }
}

// === IDENTITY GLITCH SYSTEM ===
function initializeIdentityGlitch() {
    const originalTitle = document.title;
    let isGlitching = false;
    
    function triggerGlitch() {
        if (isGlitching) return;
        
        isGlitching = true;
        document.title = "YOU ARE LARRY.";
        document.body.classList.add("identity-glitch");
        
        setTimeout(() => {
            document.body.classList.remove("identity-glitch");
            document.title = originalTitle;
            isGlitching = false;
        }, 3000);
    }
    
    // Random trigger every 1.5 minutes
    setTimeout(triggerGlitch, 90000);
    
    // Trigger on mouse leave
    document.addEventListener("mouseout", (e) => {
        if (!e.relatedTarget || !e.toElement) {
            triggerGlitch();
        }
    });
    
    // Trigger on page unload
    window.addEventListener("beforeunload", triggerGlitch);
}

// === RANDOM HERO HUE ===
function initializeRandomHeroHue() {
    const randomHue = Math.floor(Math.random() * 360);
    document.documentElement.style.setProperty("--heroHue", `${randomHue}deg`);
}

// === OVERLAY EVENT HANDLERS ===
function initializeOverlayHandlers() {
    const overlay = document.getElementById('custom-overlay');
    const closeBtn = overlay.querySelector('.overlay-close');
    
    // Close button click
    closeBtn.addEventListener('click', hideOverlay);
    
    // Click outside to close
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            hideOverlay();
        }
    });
    
    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('show')) {
            hideOverlay();
        }
    });
}

// === MAIN INITIALIZATION ===
document.addEventListener("DOMContentLoaded", () => {
    try {
        // Initialize random hero hue
        initializeRandomHeroHue();
        
        // Initialize overlay system
        initializeOverlayHandlers();
        
        // Initialize wisdom with random selection
        const randomWisdom = Math.floor(Math.random() * wisdoms.length);
        showWisdom(randomWisdom);
        
        // Setup wisdom button event handlers
        document.querySelectorAll('.wisdom-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                showWisdom(index);
            });
            
            // Keyboard support
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showWisdom(index);
                }
            });
        });
        
        // Initialize carousel
        populateCarousel();
        
        // Setup carousel button handlers with debug
        const prevBtn = document.querySelector(".carousel-btn.prev");
        const nextBtn = document.querySelector(".carousel-btn.next");
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log('Previous button clicked');
                moveCarousel(-1);
            });
            
            nextBtn.addEventListener("click", (e) => {
                e.preventDefault();
                console.log('Next button clicked');
                moveCarousel(1);
            });
            
            console.log('Carousel buttons initialized successfully');
        } else {
            console.error('Carousel buttons not found!');
        }
        
        // Initialize swipe and keyboard navigation
        handleSwipeCarousel();
        handleCarouselKeyboard();
        
        // Initialize ticker
        initializeTicker();
        
        // Initialize identity glitch system
        initializeIdentityGlitch();
        
        console.log('🩸 $LARRY website initialized successfully');
        
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// === ERROR HANDLING FOR GLOBAL ERRORS ===
window.addEventListener('error', (e) => {
    console.error('Global error caught:', e.error);
    // Could show user-friendly error overlay here if needed
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});