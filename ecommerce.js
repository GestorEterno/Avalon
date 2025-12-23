// ecommerce.js - Versión Específica para Ecommerce - BASADO EN index.js
// MANTIENE TODAS LAS MEJORAS Y CONFIGURACIONES IDÉNTICAS DE CARRUSELES

// ===== NAVEGACIÓN MÓBIL =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== SCROLL SUAVE AL INICIO =====
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los logos que ahora son enlaces
    const logos = document.querySelectorAll('a.logo, a.footer-logo');
    
    logos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            
            // Scroll suave al inicio (sección con id="inicio")
            const inicioSection = document.getElementById('inicio');
            if (inicioSection) {
                inicioSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // También actualizar URL sin recargar
                history.replaceState(null, null, '#inicio');
                
                // Actualizar navegación activa
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#inicio' || 
                        link.getAttribute('href') === 'ecommerce.html') {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
});

// ===== NAVEGACIÓN ACTIVA SUAVE =====
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.3 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== EFECTO SCROLL NAVBAR =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 52, 96, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ AVALON CREATORS ECOMMERCE - Sitio optimizado para móvil y PC');
    
    // Animar elementos al cargar
    const elementsToAnimate = document.querySelectorAll('.plan-card, .step, .floating-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Inicializar carruseles solo en móvil
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando carruseles móviles para ecommerce...');
        initMobileCarousels();
    }
    
    // Setup purchase notifications
    setupPurchaseNotifications();
    
    // Contadores animados
    initCounters();
});

// ===== CARRUSELES MÓVIL OPTIMIZADOS Y FLUIDOS - CONFIGURACIÓN IDÉNTICA A INDEX =====
function initMobileCarousels() {
    initPlansCarousel();
    initProcessCarousel();
}

// MODIFICACIÓN CRÍTICA: Configuración idéntica para ambos carruseles (COPIADO EXACTO)
const CAROUSEL_CONFIG = {
    scrollDuration: 300, // MISMA DURACIÓN PARA AMBOS
    scrollBehavior: 'smooth', // MISMO COMPORTAMIENTO
    scrollSnapType: 'x mandatory', // MISMO SNAP
    arrowTransition: 0.15, // MISMA TRANSICIÓN DE FLECHAS
    indicatorTransition: 0.2 // MISMA TRANSICIÓN DE INDICADORES
};

// Carrusel de Planes Ecommerce - VERSIÓN MEJORADA Y FLUIDA (IDÉNTICA A INDEX)
function initPlansCarousel() {
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.plan-card-mobile');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevArrow = document.querySelector('.carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.carousel-arrow.next-arrow');
    
    if (!carousel || planCards.length === 0) {
        console.log('❌ No se encontró carrusel de planes ecommerce');
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = planCards.length;
    let isScrolling = false;
    let isAnimating = false;
    
    console.log(`📊 Carrusel de planes ecommerce: ${totalSlides} slides encontrados`);
    
    function updateCarousel(smooth = true) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar cards
        planCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll suave con MISMA DURACIÓN
        const cardWidth = planCards[0].offsetWidth;
        const scrollPosition = currentIndex * cardWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: CAROUSEL_CONFIG.scrollBehavior,
                duration: CAROUSEL_CONFIG.scrollDuration
            });
            
            setTimeout(() => {
                isAnimating = false;
                isScrolling = false;
            }, CAROUSEL_CONFIG.scrollDuration);
        } else {
            carousel.scrollLeft = scrollPosition;
            isAnimating = false;
            isScrolling = false;
        }
    }
    
    // Flechas - SIN FEEDBACK TÁCTIL DE BAJAR/SUBIR
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0 && !isAnimating) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1 && !isAnimating) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isAnimating) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    // Scroll automático con debounce mejorado
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        if (isAnimating) return;
        
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const cardWidth = planCards[0].offsetWidth;
            const scrollLeft = carousel.scrollLeft;
            
            // MISMO CÁLCULO DE ÍNDICE
            let newIndex = Math.round(scrollLeft / cardWidth);
            
            // Validar y ajustar índice
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= totalSlides) newIndex = totalSlides - 1;
            
            // Solo actualizar si hay cambio significativo
            if (newIndex !== currentIndex && !isAnimating) {
                currentIndex = newIndex;
                updateCarousel(false);
            }
            
            isScrolling = false;
        }, 100); // MISMO DEBOUNCE TIME
    });
    
    // Inicializar
    updateCarousel(false);
    
    // Asegurar que las flechas sean visibles
    if (prevArrow && nextArrow) {
        prevArrow.style.display = 'flex';
        nextArrow.style.display = 'flex';
    }
}

// Carrusel de Proceso Ecommerce - VERSIÓN MEJORADA Y FLUIDA (IDÉNTICA A PLANS)
function initProcessCarousel() {
    const carousel = document.querySelector('.process-carousel');
    const steps = document.querySelectorAll('.step-mobile');
    const indicators = document.querySelectorAll('.process-indicator');
    const prevArrow = document.querySelector('.process-carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.process-carousel-arrow.next-arrow');
    
    if (!carousel || steps.length === 0) {
        console.log('❌ No se encontró carrusel de proceso ecommerce');
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = steps.length;
    let isScrolling = false;
    let isAnimating = false;
    
    console.log(`📊 Carrusel de proceso ecommerce: ${totalSlides} steps encontrados`);
    
    function updateCarousel(smooth = true) {
        if (isAnimating) return;
        isAnimating = true;
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar steps
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll suave con MISMA DURACIÓN
        const stepWidth = steps[0].offsetWidth;
        const scrollPosition = currentIndex * stepWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: CAROUSEL_CONFIG.scrollBehavior,
                duration: CAROUSEL_CONFIG.scrollDuration
            });
            
            setTimeout(() => {
                isAnimating = false;
                isScrolling = false;
            }, CAROUSEL_CONFIG.scrollDuration);
        } else {
            carousel.scrollLeft = scrollPosition;
            isAnimating = false;
            isScrolling = false;
        }
    }
    
    // Flechas IDÉNTICAS al carrusel de planes
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0 && !isAnimating) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1 && !isAnimating) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            if (!isAnimating) {
                currentIndex = index;
                updateCarousel();
            }
        });
    });
    
    // Scroll automático IDÉNTICO al carrusel de planes
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        if (isAnimating) return;
        
        isScrolling = true;
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const stepWidth = steps[0].offsetWidth;
            const scrollLeft = carousel.scrollLeft;
            
            // MISMO CÁLCULO DE ÍNDICE
            let newIndex = Math.round(scrollLeft / stepWidth);
            
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= totalSlides) newIndex = totalSlides - 1;
            
            if (newIndex !== currentIndex && !isAnimating) {
                currentIndex = newIndex;
                updateCarousel(false);
            }
            
            isScrolling = false;
        }, 100); // MISMO DEBOUNCE TIME
    });
    
    updateCarousel(false);
    
    // Asegurar visibilidad de flechas
    if (prevArrow && nextArrow) {
        prevArrow.style.display = 'flex';
        nextArrow.style.display = 'flex';
    }
}

// ===== NOTIFICACIONES DE COMPRA =====
function setupPurchaseNotifications() {
    const purchaseNotification = document.getElementById('purchase-notification');
    const purchaseButtons = document.querySelectorAll('.ecommerce-purchase, .ecommerce-purchase-mobile');
    const closeNotification = document.querySelector('.notification-close');
    
    if (!purchaseNotification || purchaseButtons.length === 0) return;
    
    function showNotification(plan) {
        // Puedes personalizar el mensaje según el plan si lo deseas
        purchaseNotification.classList.add('active');
        
        // Auto-ocultar después de 8 segundos
        setTimeout(() => {
            if (purchaseNotification.classList.contains('active')) {
                purchaseNotification.classList.remove('active');
            }
        }, 8000);
    }
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const planType = this.getAttribute('data-plan') || 'desconocido';
            console.log(`🛒 Intento de compra del plan: ${planType}`);
            
            // Mostrar notificación
            showNotification(planType);
            
            // Feedback táctil en móvil
            if (window.innerWidth <= 768) {
                this.style.transform = 'scale(0.96)';
                this.style.opacity = '0.9';
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.opacity = '';
                }, 150);
            }
        });
    });
    
    // Cerrar notificación
    if (closeNotification) {
        closeNotification.addEventListener('click', () => {
            purchaseNotification.classList.remove('active');
        });
    }
    
    // Cerrar notificación al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (purchaseNotification.classList.contains('active') && 
            !purchaseNotification.contains(e.target) && 
            !Array.from(purchaseButtons).some(btn => btn.contains(e.target))) {
            purchaseNotification.classList.remove('active');
        }
    });
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
    const stats = document.querySelectorAll('.stat');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    animateCounter(statNumber);
                    statNumber.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const target = parseInt(text.replace('+', '').replace('%', ''));
    const suffix = text.includes('+') ? '+' : text.includes('%') ? '%' : '';
    const duration = 2000;
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function para animación más suave
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        const current = Math.floor(easeOutQuart * target);
        
        element.textContent = current + suffix;
        
        if (percentage < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(step);
}

// ===== RESPONSIVE JS =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        console.log(`🔄 Redimensionando a: ${window.innerWidth}px`);
        
        // Re-inicializar carruseles si cambiamos a móvil
        if (window.innerWidth <= 768) {
            const carouselsExist = document.querySelector('.plans-carousel');
            if (carouselsExist && !carouselsExist.dataset.initialized) {
                console.log('📱 Re-inicializando carruseles para móvil...');
                initMobileCarousels();
                carouselsExist.dataset.initialized = true;
            }
        }
    }, 250);
});

// ===== MEJORAS DE PERFORMANCE =====
// Evitar layout thrashing
let scheduledAnimationFrame = false;
function readAndWriteDom() {
    if (!scheduledAnimationFrame) {
        scheduledAnimationFrame = true;
        requestAnimationFrame(() => {
            // Operaciones de DOM aquí
            scheduledAnimationFrame = false;
        });
    }
}

// ===== DETECCIÓN DE TÁCTIL =====
const isTouchDevice = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;

if (isTouchDevice) {
    document.body.classList.add('touch-device');
    console.log('📱 Dispositivo táctil detectado');
} else {
    document.body.classList.add('no-touch-device');
    console.log('💻 Dispositivo no táctil detectado');
}

// ===== MEJORAS PARA MÓVIL - ELIMINAR EFECTOS NO DESEADOS =====
// Prevenir menú contextual en móvil
document.addEventListener('contextmenu', function(e) {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        return false;
    }
}, false);

// Prevenir zoom con doble tap en móvil
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Prevenir arrastre de imágenes en móvil
document.addEventListener('dragstart', function(e) {
    if (window.innerWidth <= 768 && e.target.tagName === 'IMG') {
        e.preventDefault();
    }
}, false);

// Mejorar feedback táctil en botones
if (isTouchDevice) {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-plan, .btn-plan-mobile, .ecommerce-purchase, .ecommerce-purchase-mobile, .nav-link, .context-link, .disclaimer-link');
    
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
            this.style.opacity = '0.9';
        });
        
        button.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 150);
        });
    });
}

// ===== POLYFILL PARA SMOOTH SCROLL =====
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('🔧 Aplicando polyfill para scroll suave');
    // Podríamos cargar un polyfill aquí si es necesario
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('❌ Error en la aplicación ecommerce:', e.error);
});

// ===== LOADING STATES =====
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        console.log('🎉 Página ecommerce completamente cargada y lista');
        document.body.classList.add('loaded');
    }
});
