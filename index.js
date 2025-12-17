// NAVBAR TOGGLE
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

// ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}, {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// SIMPLE NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
    } else {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
    }
});

// ===== CARRUSEL DE PLANES SIMPLE PARA MÓVIL =====
function initPlansCarousel() {
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.carousel-container .plan-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    
    if (!carousel || planCards.length === 0) return;
    
    let currentIndex = 0;
    const totalSlides = planCards.length;
    
    // Solo activar en móvil
    if (window.innerWidth > 768) {
        carousel.style.transform = 'translateY(0)';
        planCards.forEach(card => card.classList.add('active'));
        return;
    }
    
    function updateCarousel() {
        // Calcular desplazamiento vertical
        const slideHeight = 100 / totalSlides;
        const translateY = -currentIndex * slideHeight;
        
        // Aplicar transformación VERTICAL
        carousel.style.transform = `translateY(${translateY}%)`;
        carousel.style.transition = 'transform 0.3s ease';
        
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar clases de tarjetas
        planCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Eventos para botones VERTICALES
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < totalSlides - 1) {
                currentIndex++;
                updateCarousel();
            }
        });
    }
    
    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Swipe táctil VERTICAL simple para móvil
    let touchStartY = 0;
    let touchEndY = 0;
    
    if (window.innerWidth <= 768) {
        carousel.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].clientY;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 30;
        const diff = touchStartY - touchEndY;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalSlides - 1) {
                // Swipe hacia arriba - siguiente
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                // Swipe hacia abajo - anterior
                currentIndex--;
            }
            updateCarousel();
        }
    }
    
    // Inicializar
    updateCarousel();
    
    // Redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            carousel.style.transform = 'translateY(0)';
            planCards.forEach(card => {
                card.classList.add('active');
            });
        } else {
            updateCarousel();
        }
    });
}

// SOCIAL MEDIA NOTIFICATIONS
function setupSocialMediaNotifications() {
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

// OPTIMIZACIÓN EXTREMA PARA MÓVIL
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Desactivar todas las animaciones CSS
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                * {
                    animation: none !important;
                    transition: none !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Desactivar IntersectionObserver para móvil
        const observers = ['revealObserver', 'counterObserver', 'lazyObserver'];
        observers.forEach(obs => {
            if (window[obs]) {
                window[obs].disconnect();
            }
        });
        
        console.log('📱 Modo móvil optimizado activado');
    }
}

// DOM LOADED
document.addEventListener('DOMContentLoaded', () => {
    // Optimización extrema para móvil
    optimizeForMobile();
    
    // Inicializar carrusel
    initPlansCarousel();
    
    // Notificaciones de redes sociales
    setupSocialMediaNotifications();
    
    // Mostrar active en el primer nav link
    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
    }
    
    // Contadores simples (sin animación en móvil)
    const stats = document.querySelectorAll('.stat');
    if (window.innerWidth > 768) {
        stats.forEach(stat => {
            const statNumber = stat.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
            }
        });
    }
});

// CERRAR MENÚ CON ESCAPE
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

console.log('🚀 AVALON CREATORS - Optimizado para móvil');
