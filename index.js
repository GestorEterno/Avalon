// index.js - Versión Ultra Optimizada para Móvil - CORREGIDA COMPLETAMENTE

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
    // Animar elementos al cargar
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
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
        initMobileCarousels();
    }
    
    // Setup social notifications
    setupSocialNotifications();
    
    // Contadores animados
    initCounters();
});

// ===== CARRUSELES MÓVIL OPTIMIZADOS =====
function initMobileCarousels() {
    initPlansCarousel();
    initProcessCarousel();
}

// Carrusel de Planes - MEJORADO PARA FLUIDEZ
function initPlansCarousel() {
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.plan-card-mobile');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevArrow = document.querySelector('.carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.carousel-arrow.next-arrow');
    
    if (!carousel || planCards.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = planCards.length;
    let isScrolling = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function updateCarousel(smooth = true) {
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar cards
        planCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll con mejor precisión
        const cardWidth = planCards[0].offsetWidth + 20;
        const scrollPosition = currentIndex * cardWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            carousel.scrollLeft = scrollPosition;
        }
    }
    
    // Flechas - MEJOR RESPONSIVIDAD
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(true);
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel(true);
            }
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(true);
        });
    });
    
    // Scroll automático MEJORADO
    carousel.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                const cardWidth = planCards[0].offsetWidth + 20;
                const newIndex = Math.round(carousel.scrollLeft / cardWidth);
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
                    currentIndex = newIndex;
                    updateCarousel(false);
                }
                isScrolling = false;
            }, 150);
        }
    });
    
    // Touch events para mejor experiencia móvil
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalSlides - 1) {
                // Swipe izquierda
                currentIndex++;
                updateCarousel(true);
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe derecha
                currentIndex--;
                updateCarousel(true);
            }
        }
    }
    
    // Inicializar
    updateCarousel(false);
}

// Carrusel de Proceso - MEJORADO
function initProcessCarousel() {
    const carousel = document.querySelector('.process-carousel');
    const steps = document.querySelectorAll('.step-mobile');
    const indicators = document.querySelectorAll('.process-indicator');
    const prevArrow = document.querySelector('.process-carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.process-carousel-arrow.next-arrow');
    
    if (!carousel || steps.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = steps.length;
    let isScrolling = false;
    let touchStartX = 0;
    let touchEndX = 0;
    
    function updateCarousel(smooth = true) {
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentIndex);
        });
        
        const stepWidth = steps[0].offsetWidth + 20;
        const scrollPosition = currentIndex * stepWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            carousel.scrollLeft = scrollPosition;
        }
    }
    
    // Flechas
    if (prevArrow) {
        prevArrow.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel(true);
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel(true);
            }
        });
    }
    
    // Indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(true);
        });
    });
    
    // Scroll mejorado
    carousel.addEventListener('scroll', () => {
        if (!isScrolling) {
            isScrolling = true;
            setTimeout(() => {
                const stepWidth = steps[0].offsetWidth + 20;
                const newIndex = Math.round(carousel.scrollLeft / stepWidth);
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
                    currentIndex = newIndex;
                    updateCarousel(false);
                }
                isScrolling = false;
            }, 150);
        }
    });
    
    // Touch events
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel(true);
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
                updateCarousel(true);
            }
        }
    }
    
    updateCarousel(false);
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
    const target = parseInt(element.textContent.replace('+', '').replace('%', ''));
    const suffix = element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '';
    const duration = 2000;
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        const current = Math.floor(percentage * target);
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
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Re-inicializar carruseles si cambiamos a móvil
        if (window.innerWidth <= 768) {
            const carouselsInitialized = document.querySelector('.plans-carousel')?.dataset.initialized;
            if (!carouselsInitialized) {
                initMobileCarousels();
                if (document.querySelector('.plans-carousel')) {
                    document.querySelector('.plans-carousel').dataset.initialized = true;
                }
            }
        }
    }, 250);
});

// ===== CONSOLE LOG =====
console.log('✅ AVALON CREATORS - Sitio optimizado para móvil y PC - CORREGIDO');
