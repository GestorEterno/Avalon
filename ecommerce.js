// ecommerce.js - Versión Optimizada IDÉNTICA a index.js
// Lógica idéntica con correcciones específicas para ecommerce

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
    const logos = document.querySelectorAll('a.logo, a.footer-logo');
    
    logos.forEach(logo => {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (window.innerWidth <= 768) {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            
            const inicioSection = document.getElementById('ecommerce-hero');
            if (inicioSection) {
                inicioSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                history.replaceState(null, null, '#ecommerce-hero');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === 'ecommerce.html') {
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
                if (link.getAttribute('href') === `#${id}` || 
                    link.getAttribute('href') === 'ecommerce.html') {
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

// ===== INICIALIZACIÓN - IDÉNTICA A INDEX =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ AVALON CREATORS ECOMMERCE - Sitio optimizado para móvil y PC');
    
    // Animar elementos al cargar - AÑADIR VENTAJAS
    const elementsToAnimate = document.querySelectorAll('.ventaja-card, .plan-card, .floating-card, .plan-card-mobile');
    
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
    
    // Inicializar carruseles solo en móvil - IGUAL QUE INDEX
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando carrusel de planes ecommerce...');
        initEcommerceCarousel();
    }
    
    // Setup maintenance notifications
    setupMaintenanceNotifications();
    
    // Contadores animados para estadísticas - INICIALIZAR INMEDIATAMENTE
    initStatsCounters();
    
    // ===== AÑADIR: INICIALIZAR ANIMACIONES DE VENTAJAS COMO EN INDEX =====
    initVentajasAnimation();
});

// ===== AÑADIR NUEVA FUNCIÓN: ANIMACIONES DE VENTAJAS =====
function initVentajasAnimation() {
    const ventajas = document.querySelectorAll('.ventaja-card');
    
    const ventajaObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 200);
            }
        });
    }, { threshold: 0.1 });
    
    ventajas.forEach(ventaja => {
        ventaja.classList.add('reveal');
        ventajaObserver.observe(ventaja);
    });
}

// ===== CARRUSEL ECOMMERCE - CONFIGURACIÓN IDÉNTICA A INDEX =====
const CAROUSEL_CONFIG = {
    scrollDuration: 300,
    scrollBehavior: 'smooth',
    scrollSnapType: 'x mandatory',
    arrowTransition: 0.15,
    indicatorTransition: 0.2
};

function initEcommerceCarousel() {
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
    
    console.log(`📊 Carrusel ecommerce: ${totalSlides} slides encontrados`);
    
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
        }, 100);
    });
    
    // Inicializar
    updateCarousel(false);
    
    // Asegurar que las flechas sean visibles
    if (prevArrow && nextArrow) {
        prevArrow.style.display = 'flex';
        nextArrow.style.display = 'flex';
    }
}

// ===== CONTADORES ANIMADOS PARA ESTADÍSTICAS =====
function initStatsCounters() {
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
    const target = parseInt(text.replace('+', '').replace('%', '').replace('s', ''));
    const suffix = text.includes('+') ? '+' : 
                   text.includes('%') ? '%' : 
                   text.includes('s') ? 's' : '';
    const duration = 1500;
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        const current = suffix === 's' ? 
            (easeOutQuart * target).toFixed(1) : 
            Math.floor(easeOutQuart * target);
        
        element.textContent = current + suffix;
        
        if (percentage < 1) {
            requestAnimationFrame(step);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(step);
}

// ===== NOTIFICACIONES DE MANTENIMIENTO =====
function setupMaintenanceNotifications() {
    const maintenanceNotification = document.getElementById('maintenance-notification');
    const planButtons = document.querySelectorAll('.ecommerce-btn, .ecommerce-btn-mobile, .btn-plan, .btn-plan-mobile');
    const socialLinks = document.querySelectorAll('.social-under-construction');
    
    if (!maintenanceNotification) return;
    
    function showMaintenanceNotification(planName) {
        // Actualizar mensaje según plan
        const notificationText = maintenanceNotification.querySelector('.notification-text p');
        if (notificationText) {
            notificationText.innerHTML = `
                Estamos optimizando nuestros sistemas para el plan <strong>${planName}</strong>. 
                Por favor, inténtalo más tarde o contáctanos por WhatsApp para reservar tu plan.
            `;
        }
        
        // Mostrar notificación
        maintenanceNotification.classList.add('active');
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            maintenanceNotification.classList.remove('active');
        }, 5000);
    }
    
    // Para botones de planes
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const plan = this.getAttribute('data-plan') || 'ecommerce';
            let planName = '';
            
            switch(plan) {
                case 'base':
                    planName = 'Ecommerce Base ($10/mes)';
                    break;
                case 'pro':
                    planName = 'Ecommerce Pro ($50/mes)';
                    break;
                case 'elite':
                    planName = 'Ecommerce Elite ($100/mes)';
                    break;
                default:
                    planName = 'Ecommerce';
            }
            
            showMaintenanceNotification(planName);
        });
    });
    
    // Para enlaces sociales en construcción
    if (socialLinks.length > 0) {
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const notificationText = maintenanceNotification.querySelector('.notification-text p');
                if (notificationText) {
                    notificationText.textContent = 'Estamos trabajando en las redes sociales, pronto estarán disponibles. Mientras tanto, contáctanos por WhatsApp.';
                }
                maintenanceNotification.classList.add('active');
                
                setTimeout(() => {
                    maintenanceNotification.classList.remove('active');
                }, 3000);
            });
        });
    }
}

// ===== RESPONSIVE JS =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        console.log(`🔄 Redimensionando a: ${window.innerWidth}px`);
        
        // Re-inicializar carrusel si cambiamos a móvil
        if (window.innerWidth <= 768) {
            const carouselExists = document.querySelector('.plans-carousel');
            if (carouselExists && !carouselExists.dataset.initialized) {
                console.log('📱 Re-inicializando carrusel ecommerce para móvil...');
                initEcommerceCarousel();
                carouselExists.dataset.initialized = true;
            }
        }
    }, 250);
});

// ===== DETECCIÓN DE TÁCTIL =====
const isTouchDevice = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;

if (isTouchDevice) {
    document.body.classList.add('touch-device');
    console.log('📱 Dispositivo táctil detectado');
    
    // Aplicar mejoras táctiles a botones de ecommerce también
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-plan, .btn-plan-mobile, .nav-link, .context-link, .conclusion-link, .ecommerce-btn, .ecommerce-btn-mobile');
    
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

// ===== LOADING STATES =====
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        console.log('🎉 Página ecommerce completamente cargada y lista');
        document.body.classList.add('loaded');
    }
});

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('❌ Error en la aplicación ecommerce:', e.error);
});

// ===== POLYFILL PARA SMOOTH SCROLL =====
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('🔧 Aplicando polyfill para scroll suave');
}
