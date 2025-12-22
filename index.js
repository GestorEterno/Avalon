// index.js - Versión Ultra Simplificada - CARGA INSTANTÁNEA
// SIN LOADER - INICIALIZACIÓN INMEDIATA

// ===== INICIALIZACIÓN INMEDIATA AL CARGAR EL DOM =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ AVALON CREATORS - Carga instantánea activada');
    
    // Inicializar todo inmediatamente
    initAllFunctionalities();
});

// ===== INICIALIZAR TODAS LAS FUNCIONALIDADES =====
function initAllFunctionalities() {
    console.log('🚀 Inicializando todas las funcionalidades');
    
    // 1. Navegación móvil
    initMobileNavigation();
    
    // 2. Navegación activa suave
    initActiveNavigation();
    
    // 3. Efecto scroll navbar
    initScrollEffect();
    
    // 4. Animar elementos al cargar
    initRevealAnimations();
    
    // 5. Inicializar carruseles solo en móvil
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando carruseles móviles...');
        initMobileCarousels();
    }
    
    // 6. Setup social notifications
    setupSocialNotifications();
    
    // 7. Contadores animados
    initCounters();
    
    // 8. Responsive JS
    initResponsive();
    
    // 9. Detección de táctil
    detectTouchDevice();
    
    console.log('✅ Todas las funcionalidades inicializadas');
}

// ===== NAVEGACIÓN MÓVIL =====
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
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
}

// ===== NAVEGACIÓN ACTIVA SUAVE =====
function initActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
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
}

// ===== EFECTO SCROLL NAVBAR =====
function initScrollEffect() {
    let lastScroll = 0;
    let ticking = false;
    
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(15, 52, 96, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(15, 52, 96, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// ===== ANIMACIONES DE REVELADO =====
function initRevealAnimations() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
    if (elementsToAnimate.length === 0) return;
    
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
}

// ===== CARRUSELES MÓVIL OPTIMIZADOS Y FLUIDOS =====
function initMobileCarousels() {
    initPlansCarousel();
    initProcessCarousel();
}

// Carrusel de Planes
function initPlansCarousel() {
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.plan-card-mobile');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevArrow = document.querySelector('.carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.carousel-arrow.next-arrow');
    
    if (!carousel || planCards.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = planCards.length;
    let isAnimating = false;
    
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
            }, 300);
        } else {
            carousel.scrollLeft = scrollPosition;
            setTimeout(() => {
                isAnimating = false;
            }, 50);
        }
    }
    
    // Flechas
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
    
    // Scroll automático
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        if (isAnimating) return;
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const cardWidth = planCards[0].offsetWidth;
            const scrollLeft = carousel.scrollLeft;
            
            // Calcular índice basado en scroll
            let newIndex = Math.round(scrollLeft / cardWidth);
            
            // Validar y ajustar índice
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= totalSlides) newIndex = totalSlides - 1;
            
            // Solo actualizar si hay cambio
            if (newIndex !== currentIndex && !isAnimating) {
                currentIndex = newIndex;
                updateCarousel(false);
            }
        }, 150);
    });
    
    // Inicializar
    updateCarousel(false);
}

// Carrusel de Proceso
function initProcessCarousel() {
    const carousel = document.querySelector('.process-carousel');
    const steps = document.querySelectorAll('.step-mobile');
    const indicators = document.querySelectorAll('.process-indicator');
    const prevArrow = document.querySelector('.process-carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.process-carousel-arrow.next-arrow');
    
    if (!carousel || steps.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = steps.length;
    let isAnimating = false;
    
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
        
        // Scroll suave
        const stepWidth = steps[0].offsetWidth;
        const scrollPosition = currentIndex * stepWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                isAnimating = false;
            }, 300);
        } else {
            carousel.scrollLeft = scrollPosition;
            setTimeout(() => {
                isAnimating = false;
            }, 50);
        }
    }
    
    // Flechas
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
    
    // Scroll automático
    let scrollTimeout;
    carousel.addEventListener('scroll', () => {
        if (isAnimating) return;
        
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            const stepWidth = steps[0].offsetWidth;
            const scrollLeft = carousel.scrollLeft;
            
            let newIndex = Math.round(scrollLeft / stepWidth);
            
            if (newIndex < 0) newIndex = 0;
            if (newIndex >= totalSlides) newIndex = totalSlides - 1;
            
            if (newIndex !== currentIndex && !isAnimating) {
                currentIndex = newIndex;
                updateCarousel(false);
            }
        }, 150);
    });
    
    updateCarousel(false);
}

// ===== CONTADORES ANIMADOS =====
function initCounters() {
    const stats = document.querySelectorAll('.stat');
    
    if (stats.length === 0) return;
    
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
    const duration = 1800;
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
    const socialNotification = document.getElementById('social-notification');
    const underConstructionLinks = document.querySelectorAll('.social-under-construction');
    
    if (!socialNotification || underConstructionLinks.length === 0) return;
    
    function showNotification() {
        socialNotification.classList.add('active');
        
        setTimeout(() => {
            socialNotification.classList.remove('active');
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
function initResponsive() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        
        resizeTimeout = setTimeout(() => {
            // Re-inicializar carruseles si cambiamos a móvil
            if (window.innerWidth <= 768) {
                const carouselsExist = document.querySelector('.plans-carousel');
                if (carouselsExist && !carouselsExist.dataset.initialized) {
                    initMobileCarousels();
                    carouselsExist.dataset.initialized = true;
                }
            }
        }, 250);
    });
}

// ===== DETECCIÓN DE TÁCTIL =====
function detectTouchDevice() {
    const isTouchDevice = 'ontouchstart' in window || 
        navigator.maxTouchPoints > 0 || 
        navigator.msMaxTouchPoints > 0;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    } else {
        document.body.classList.add('no-touch-device');
    }
}

// ===== ERROR HANDLING =====
window.addEventListener('error', function(e) {
    console.error('❌ Error en la aplicación:', e.error);
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Evitar layout thrashing
let scheduledAnimationFrame = false;
function readAndWriteDom() {
    if (!scheduledAnimationFrame) {
        scheduledAnimationFrame = true;
        requestAnimationFrame(() => {
            scheduledAnimationFrame = false;
        });
    }
}

// ===== LOADING STATES =====
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        console.log('🎉 Página completamente cargada y lista');
    }
});

// Exportar funciones globales
window.AvalonCreators = {
    initAllFunctionalities,
    initMobileCarousels,
    initCounters
};
