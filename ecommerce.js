// ecommerce.js - Versión Ultra Optimizada para Móvil y PC - CON MEJORAS PARA MÓVIL
// MODIFICACIÓN ESPECÍFICA: Experiencia fluida en carrusel y mejoras táctiles

// ===== NAVEGACIÓN MÓVIL =====
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
            // Permitir navegación normal a index.html
            if (this.getAttribute('href') === 'index.html') {
                return;
            }
            
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            if (window.innerWidth <= 768) {
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
            
            // Scroll suave al inicio de la página actual
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
});

// ===== NAVEGACIÓN ACTIVA SUAVE =====
const sections = document.querySelectorAll('section[id]');

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
    const elementsToAnimate = document.querySelectorAll('.plan-card, .comparison-section');
    
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
    
    // Inicializar carrusel solo en móvil
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando carrusel ecommerce móvil...');
        initMobileCarousel();
    }
    
    // Setup social notifications
    setupSocialNotifications();
    
    // Contadores animados
    initCounters();
});

// ===== CARRUSEL MÓVIL OPTIMIZADO Y FLUIDO =====
function initMobileCarousel() {
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
        
        // Scroll suave
        const cardWidth = planCards[0].offsetWidth;
        const scrollPosition = currentIndex * cardWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isAnimating = false;
                isScrolling = false;
            }, 300);
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
            
            // Cálculo de índice
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

// ===== NOTIFICACIONES SOCIALES =====
function setupSocialNotifications() {
    const underConstructionLinks = document.querySelectorAll('.social-under-construction');
    
    if (underConstructionLinks.length === 0) return;
    
    function showNotification() {
        // Crear notificación si no existe
        let notification = document.getElementById('social-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'social-notification';
            notification.className = 'social-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-tools"></i>
                    <p>Estamos trabajando en las redes, pronto estarán disponibles</p>
                </div>
            `;
            document.body.appendChild(notification);
        }
        
        notification.classList.add('active');
        
        setTimeout(() => {
            notification.classList.remove('active');
        }, 3000);
    }
    
    underConstructionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification();
        });
    });
}

// ===== RESPONSIVE JS =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        console.log(`🔄 Redimensionando a: ${window.innerWidth}px`);
        
        // Re-inicializar carrusel si cambiamos a móvil
        if (window.innerWidth <= 768) {
            const carouselsExist = document.querySelector('.plans-carousel');
            if (carouselsExist && !carouselsExist.dataset.initialized) {
                console.log('📱 Re-inicializando carrusel para móvil...');
                initMobileCarousel();
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
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-plan, .btn-plan-mobile, .nav-link');
    
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
    console.error('❌ Error en la aplicación:', e.error);
});

// ===== LOADING STATES =====
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        console.log('🎉 Página ecommerce completamente cargada y lista');
        document.body.classList.add('loaded');
        
        // Remover la clase loading después de la animación inicial
        setTimeout(() => {
            document.body.classList.remove('loading');
        }, 500);
    }
});

// ===== MEJORA: Scroll suave para enlaces internos =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Actualizar URL
            history.pushState(null, null, targetId);
        }
    });
});

// ===== MEJORA: Cargar imágenes de forma diferida =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');
                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
