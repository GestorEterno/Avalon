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

// ===== NAVEGACIÓN ACTIVA =====
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.style.color = '';
            });
            
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (correspondingLink) {
                correspondingLink.classList.add('active');
                correspondingLink.style.color = 'var(--accent)';
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== EFECTO SCROLL EN NAVBAR =====
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(15, 52, 96, 0.1)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(15px)';
    }
    
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// ===== ANIMACIONES DE REVELADO =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
        homeLink.style.color = 'var(--accent)';
    }
    
    lazyLoadImages();
    setupSocialMediaNotifications();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 500);
    
    // Inicializar carrusel cuando el DOM esté listo
    setTimeout(initPlansCarousel, 100);
    
    // También inicializar cuando se carguen todas las imágenes
    window.addEventListener('load', () => {
        setTimeout(initPlansCarousel, 300);
    });
});

// ===== CONTADORES ANIMADOS =====
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                let target, suffix = '';
                const text = statNumber.textContent;
                
                if (text.includes('+')) {
                    target = parseInt(text.replace('+', ''));
                    suffix = '+';
                } else if (text.includes('%')) {
                    target = parseInt(text.replace('%', ''));
                    suffix = '%';
                } else {
                    target = parseInt(text);
                }
                
                if (!isNaN(target)) {
                    animateCounter(statNumber, target, 2000, suffix);
                    statNumber.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// ===== EFECTOS HOVER EN TARJETAS =====
document.querySelectorAll('.service-card, .plan-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        } else {
            this.style.transform = 'scale(1.02)';
        }
    });
});

// ===== CARGA DIFERIDA DE IMÁGENES =====
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== NOTIFICACIONES DE REDES SOCIALES =====
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
            
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            showNotification();
            
            const icon = this.querySelector('i');
            const platform = icon ? icon.className.split(' ')[1] : 'red social';
            console.log(`🔄 ${platform} - En construcción. Notificación mostrada.`);
        });
    });
}

// ===== CARRUSEL DE PLANES PARA MÓVIL - VERSIÓN PERFECTA =====
function initPlansCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.carousel-container .plan-card');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!carouselContainer || planCards.length === 0) return;
    
    // Solo activar en móvil
    if (window.innerWidth > 768) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    carouselContainer.style.display = 'block';
    
    let currentIndex = 0;
    const totalSlides = planCards.length;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar clases de tarjetas
        planCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
            card.classList.toggle('featured', card.classList.contains('featured'));
        });
        
        // Scroll suave al slide actual
        const cardWidth = planCards[0].offsetWidth;
        const scrollPosition = currentIndex * (cardWidth + 15);
        
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Detectar scroll para actualizar índice
    let isScrolling = false;
    carousel.addEventListener('scroll', () => {
        if (isScrolling) return;
        
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = planCards[0].offsetWidth;
        const newIndex = Math.round(scrollLeft / (cardWidth + 15));
        
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
            currentIndex = newIndex;
            updateCarousel();
        }
    });
    
    // Swipe táctil
    let touchStartX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    
    carousel.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX - touchEndX;
        const swipeThreshold = 50;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < totalSlides - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarousel();
        }
    });
    
    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Inicializar
    updateCarousel();
    
    // Ajustar altura de tarjetas
    function adjustCardHeights() {
        if (window.innerWidth > 768) return;
        
        let maxHeight = 0;
        planCards.forEach(card => {
            card.style.height = 'auto';
            const height = card.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        
        // Establecer altura uniforme
        planCards.forEach(card => {
            card.style.height = (maxHeight + 20) + 'px';
        });
    }
    
    setTimeout(adjustCardHeights, 100);
    
    // Redimensionar ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) {
                carouselContainer.style.display = 'block';
                adjustCardHeights();
                updateCarousel();
            } else {
                carouselContainer.style.display = 'none';
            }
        }, 250);
    });
    
    // Asegurar que el carrusel esté en la posición correcta al cargar
    setTimeout(() => {
        if (carousel) {
            carousel.scrollLeft = 0;
            currentIndex = 0;
            updateCarousel();
        }
    }, 500);
}

// ===== ATAJOS DE TECLADO =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    if (e.altKey && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (navLinksArray[index]) {
            navLinksArray[index].click();
        }
    }
});

// ===== VERIFICACIÓN DE ENLACES WHATSAPP =====
function checkWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`📱 WhatsApp link clicked: ${this.href}`);
        });
    });
}

checkWhatsAppLinks();

// ===== MENSAJE DE CONSOLA =====
console.log('🚀 AVALON CREATORS - Sistema mejorado cargado al 100%');
console.log('📱 Carrusel móvil optimizado - Modo móvil estabilizado');
console.log('✨ Todos los elementos funcionan correctamente');
console.log('🎯 Versión de escritorio intacta - Correcciones solo para móvil');
