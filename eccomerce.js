// ===== NAVEGACIÓN MÓVIL =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Función para alternar menú móvil
function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

// Función para cerrar menú móvil
function closeMobileMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners para hamburguesa
if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
}

// Event listeners para enlaces de navegación
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ===== NAVEGACIÓN ACTIVA PARA ECOMMERCE =====
const sections = document.querySelectorAll('section[id]');
const navLinksArray = Array.from(navLinks);

const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remover clase active de todos los enlaces
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // Obtener el ID de la sección visible
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            // Agregar clase active al enlace correspondiente
            if (correspondingLink) {
                correspondingLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observar todas las secciones
sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== EFECTO SCROLL EN NAVBAR =====
let lastScroll = 0;
let ticking = false;

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 52, 96, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
        navbar.style.borderBottom = '1px solid rgba(42, 157, 143, 0.3)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(15, 52, 96, 0.1)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        navbar.style.backdropFilter = 'blur(15px)';
    }
    
    lastScroll = currentScroll;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
    }
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
    // Configurar elementos para animación de revelado
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card, .benefit-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Configurar enlace activo inicial
    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
    }
    
    // Inicializar funciones
    lazyLoadImages();
    setupSocialMediaNotifications();
    
    // Añadir clase loaded al body después de un breve retraso
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Disparar evento scroll después de la carga
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 500);
    
    // Inicializar carrusel
    initEcommercePlansCarousel();
    
    // Re-inicializar carrusel después de la carga completa
    window.addEventListener('load', () => {
        setTimeout(initEcommercePlansCarousel, 300);
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

// ===== CARGAR IMÁGENES DIFERIDAS =====
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
            
            // Efecto visual en el ícono clickeado
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            // Mostrar notificación
            showNotification();
            
            // Log para debugging
            const icon = this.querySelector('i');
            const platform = icon ? icon.className.split(' ')[1] : 'red social';
            console.log(`🔄 ${platform} - En construcción. Notificación mostrada.`);
        });
    });
}

// ===== CARRUSEL ESPECÍFICO PARA PLANES DE ECOMMERCE =====
function initEcommercePlansCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.carousel-container .plan-card');
    const indicators = document.querySelectorAll('.indicator');
    
    // Si no hay carrusel o estamos en escritorio, salir
    if (!carouselContainer || planCards.length === 0) return;
    
    // Solo activar en móvil
    if (window.innerWidth > 768) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    carouselContainer.style.display = 'block';
    
    let currentIndex = 0;
    const totalSlides = planCards.length;
    let isScrolling = false;
    let startX = 0;
    let startY = 0;
    let scrollLeft = 0;
    let startTime = 0;
    let scrollTimeout;
    
    // Función para actualizar el carrusel
    function updateCarousel(smooth = true) {
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar clases de tarjetas
        planCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll suave al slide actual
        const cardWidth = planCards[0].offsetWidth;
        const margin = parseInt(getComputedStyle(planCards[0]).marginRight || 0);
        const scrollPosition = currentIndex * (cardWidth + margin);
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            carousel.scrollLeft = scrollPosition;
        }
    }
    
    // Calcular el índice basado en scroll
    function getCurrentIndex() {
        const cardWidth = planCards[0].offsetWidth;
        const margin = parseInt(getComputedStyle(planCards[0]).marginRight || 0);
        const scrollLeft = carousel.scrollLeft;
        return Math.round(scrollLeft / (cardWidth + margin));
    }
    
    // Scroll event con debounce
    carousel.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const newIndex = getCurrentIndex();
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
                currentIndex = newIndex;
                updateCarousel(false);
            }
        }, 100);
    }, { passive: true });
    
    // DETECCIÓN DE GESTOS TÁCTILES
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        scrollLeft = carousel.scrollLeft;
        startTime = Date.now();
        isScrolling = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isScrolling) return;
        
        const x = e.touches[0].pageX;
        const y = e.touches[0].pageY;
        const dx = x - startX;
        const dy = y - startY;
        
        // Determinar si el gesto es principalmente horizontal
        if (Math.abs(dx) > Math.abs(dy) * 1.5) {
            // Es un swipe horizontal - mover el carrusel
            const walk = (startX - x) * 1.5;
            carousel.scrollLeft = scrollLeft + walk;
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', (e) => {
        if (!isScrolling) return;
        isScrolling = false;
        
        const x = e.changedTouches[0].pageX;
        const y = e.changedTouches[0].pageY;
        const dx = x - startX;
        const dy = y - startY;
        const timeElapsed = Date.now() - startTime;
        
        // Solo procesar como swipe horizontal si fue principalmente horizontal
        if (Math.abs(dx) > Math.abs(dy) * 1.5) {
            const cardWidth = planCards[0].offsetWidth;
            const margin = parseInt(getComputedStyle(planCards[0]).marginRight || 0);
            
            // Determinar dirección y velocidad
            const velocity = dx / timeElapsed;
            const threshold = 0.3;
            
            if (Math.abs(velocity) > threshold) {
                // Swipe rápido - cambiar slide basado en dirección
                if (velocity < 0 && currentIndex < totalSlides - 1) {
                    currentIndex++;
                } else if (velocity > 0 && currentIndex > 0) {
                    currentIndex--;
                }
            } else {
                // Swipe lento - snap al slide más cercano
                const scrollLeft = carousel.scrollLeft;
                const newIndex = Math.round(scrollLeft / (cardWidth + margin));
                currentIndex = Math.max(0, Math.min(newIndex, totalSlides - 1));
            }
            
            updateCarousel();
        }
    });
    
    // Eventos de ratón para testing en desktop
    carousel.addEventListener('mousedown', (e) => {
        startX = e.pageX;
        scrollLeft = carousel.scrollLeft;
        isScrolling = true;
        carousel.style.cursor = 'grabbing';
        e.preventDefault();
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isScrolling) return;
        const x = e.pageX;
        const walk = (startX - x) * 2;
        carousel.scrollLeft = scrollLeft + walk;
    });
    
    carousel.addEventListener('mouseup', () => {
        isScrolling = false;
        carousel.style.cursor = 'grab';
        const newIndex = getCurrentIndex();
        if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
            currentIndex = newIndex;
            updateCarousel();
        }
    });
    
    carousel.addEventListener('mouseleave', () => {
        if (isScrolling) {
            isScrolling = false;
            carousel.style.cursor = 'grab';
            const newIndex = getCurrentIndex();
            if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
                currentIndex = newIndex;
                updateCarousel();
            }
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
    updateCarousel(false);
    
    // Ajustar altura automáticamente
    function adjustCardHeights() {
        if (window.innerWidth > 768) return;
        
        let maxHeight = 0;
        planCards.forEach(card => {
            card.style.height = 'auto';
            const height = card.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        
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
                updateCarousel(false);
            } else {
                carouselContainer.style.display = 'none';
            }
        }, 250);
    });
    
    // Inicializar posición
    setTimeout(() => {
        carousel.scrollLeft = 0;
        currentIndex = 0;
        updateCarousel(false);
    }, 500);
}

// ===== ATAJOS DE TECLADO =====
document.addEventListener('keydown', (e) => {
    // Escape cierra el menú móvil
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    }
    
    // Atajos Alt+1 a Alt+4 para navegación
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
            console.log(`🛒 Ecommerce - WhatsApp link clicked: ${this.href}`);
        });
    });
}

checkWhatsAppLinks();

// ===== SCROLL SUAVE MEJORADO =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Solo procesar enlaces internos que no sean solo "#"
        if (href === '#' || href === '#!') return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            // Calcular posición de scroll
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            // Scroll suave
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Cerrar menú móvil si está abierto
            closeMobileMenu();
        }
    });
});

// ===== DETECCIÓN DE DISPOSITIVO =====
function detectDevice() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;
    
    // Agregar clase al body según el dispositivo
    if (isMobile) {
        document.body.classList.add('mobile-device');
        console.log('📱 Dispositivo móvil detectado - Optimizando experiencia');
    } else if (isTablet) {
        document.body.classList.add('tablet-device');
        console.log('📟 Tablet detectada - Ajustando layout');
    } else {
        document.body.classList.add('desktop-device');
        console.log('🖥️ Desktop detectado - Mostrando todas las funciones');
    }
}

detectDevice();

// ===== EFECTO DE HOVER MEJORADO PARA PLANES =====
document.querySelectorAll('.plan-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) { // Solo en desktop
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.25)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) { // Solo en desktop
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow)';
        }
    });
});

// ===== PREVENIR COMPORTAMIENTO POR DEFECTO EN ENLACES VACÍOS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===== MEJORA DE ACCESIBILIDAD =====
document.addEventListener('keydown', (e) => {
    // Navegación con teclado en el carrusel
    const carousel = document.querySelector('.plans-carousel');
    if (carousel && document.activeElement.closest('.carousel-container')) {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const currentIndex = Array.from(document.querySelectorAll('.indicator')).findIndex(ind => ind.classList.contains('active'));
            if (currentIndex > 0) {
                document.querySelectorAll('.indicator')[currentIndex - 1].click();
            }
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            const currentIndex = Array.from(document.querySelectorAll('.indicator')).findIndex(ind => ind.classList.contains('active'));
            if (currentIndex < document.querySelectorAll('.indicator').length - 1) {
                document.querySelectorAll('.indicator')[currentIndex + 1].click();
            }
        }
    }
});

// ===== OPTIMIZACIÓN DE PERFORMANCE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalcular alturas de cards en el carrusel
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer && carouselContainer.style.display !== 'none') {
            initEcommercePlansCarousel();
        }
    }, 250);
});

// ===== LOG DE INICIALIZACIÓN =====
console.log('🎯 Página de Ecommerce especializada - Planes optimizados para ventas online');
console.log('📱 Características: Carrusel fluido, Diseño responsive, Enfoque en conversión');
console.log('💡 Tip: Los planes están diseñados para escalar con tu negocio');
console.log('🚀 Página cargada y optimizada para: ' + (window.innerWidth <= 768 ? 'Móvil' : window.innerWidth <= 1024 ? 'Tablet' : 'Desktop'));

// ===== ANIMACIÓN DE CARGA MEJORADA =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.body.classList.add('fully-loaded');
        console.log('✅ Página completamente cargada y lista');
    }, 500);
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', (e) => {
    console.error('❌ Error detectado:', e.message);
});

// ===== POLYFILL PARA SMOOTH SCROLL =====
if (!('scrollBehavior' in document.documentElement.style)) {
    import('https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js')
        .then(() => {
            console.log('📦 Polyfill de smooth scroll cargado');
        })
        .catch(err => {
            console.warn('⚠️ No se pudo cargar el polyfill de smooth scroll:', err);
        });
}

// ===== MANTENER SCROLL POSITION EN RECARGA =====
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition));
        sessionStorage.removeItem('scrollPosition');
    }
});
