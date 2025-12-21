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

// ===== NAVEGACIÓN ACTIVA OPTIMIZADA =====
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

const observerOptions = {
    root: null,
    rootMargin: '-25% 0px -70% 0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
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
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== EFECTO SCROLL EN NAVBAR OPTIMIZADO =====
let lastScroll = 0;
let ticking = false;

function updateNavbarOnScroll() {
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
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateNavbarOnScroll);
        ticking = true;
    }
});

// ===== ANIMACIONES DE REVELADO OPTIMIZADAS =====
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            requestAnimationFrame(() => {
                entry.target.classList.add('active');
            });
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

// ===== INICIALIZACIÓN OPTIMIZADA =====
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
    
    // Inicializar carruseles
    initPlansCarousel();
    initProcessCarousel();
    
    window.addEventListener('load', () => {
        setTimeout(initPlansCarousel, 300);
        setTimeout(initProcessCarousel, 300);
    });
});

// ===== CONTADORES ANIMADOS OPTIMIZADOS =====
function animateCounter(element, target, duration = 2000, suffix = '') {
    let start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Usar easing para suavizar
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeProgress * target);
        
        element.textContent = currentValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    }
    
    requestAnimationFrame(updateCounter);
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

// ===== CARGA DIFERIDA DE IMÁGENES OPTIMIZADA =====
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    requestAnimationFrame(() => {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    });
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

// ===== CARRUSEL DE PLANES ULTRA FLUIDO OPTIMIZADO =====
function initPlansCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    const carousel = document.querySelector('.plans-carousel');
    const planCards = document.querySelectorAll('.plan-card-mobile');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const prevArrow = document.querySelector('.carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.carousel-arrow.next-arrow');
    
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
    let isAnimating = false;
    
    // Función para actualizar el carrusel
    function updateCarousel(smooth = true) {
        if (isAnimating) return;
        isAnimating = true;
        
        requestAnimationFrame(() => {
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
            
            isAnimating = false;
        });
    }
    
    // Calcular el índice basado en scroll
    function getCurrentIndex() {
        const cardWidth = planCards[0].offsetWidth;
        const margin = parseInt(getComputedStyle(planCards[0]).marginRight || 0);
        const scrollLeft = carousel.scrollLeft;
        return Math.round(scrollLeft / (cardWidth + margin));
    }
    
    // Scroll event con debounce
    let scrollTimeout;
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
    
    // Eventos para flechas
    if (prevArrow) {
        prevArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', (e) => {
            e.stopPropagation();
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
    
    // DETECCIÓN INTELIGENTE DE GESTOS - OPTIMIZADO
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
        if (Math.abs(dx) > Math.abs(dy) * 2.5) {
            // Es un swipe horizontal - mover el carrusel
            const walk = (startX - x) * 1.2;
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
        if (Math.abs(dx) > Math.abs(dy) * 2.5) {
            const cardWidth = planCards[0].offsetWidth;
            const margin = parseInt(getComputedStyle(planCards[0]).marginRight || 0);
            
            // Determinar dirección y velocidad
            const velocity = dx / timeElapsed;
            const threshold = 0.25;
            
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
    
    // Redimensionar ventana optimizado
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            requestAnimationFrame(() => {
                if (window.innerWidth <= 768) {
                    carouselContainer.style.display = 'block';
                    adjustCardHeights();
                    updateCarousel(false);
                } else {
                    carouselContainer.style.display = 'none';
                }
            });
        }, 150);
    });
    
    // Inicializar posición
    setTimeout(() => {
        carousel.scrollLeft = 0;
        currentIndex = 0;
        updateCarousel(false);
    }, 500);
}

// ===== CARRUSEL DE PROCESO PARA MÓVIL =====
function initProcessCarousel() {
    const processContainer = document.querySelector('.process-carousel-container');
    const processCarousel = document.querySelector('.process-carousel');
    const processSteps = document.querySelectorAll('.step-mobile');
    const indicators = document.querySelectorAll('.process-indicator');
    const prevArrow = document.querySelector('.process-carousel-arrow.prev-arrow');
    const nextArrow = document.querySelector('.process-carousel-arrow.next-arrow');
    
    if (!processContainer || processSteps.length === 0) return;
    
    // Solo activar en móvil
    if (window.innerWidth > 768) {
        processContainer.style.display = 'none';
        return;
    }
    
    processContainer.style.display = 'block';
    
    let currentProcessIndex = 0;
    const totalProcessSlides = processSteps.length;
    let isProcessScrolling = false;
    let processStartX = 0;
    let processStartY = 0;
    let processScrollLeft = 0;
    let processStartTime = 0;
    
    // Función para actualizar el carrusel
    function updateProcessCarousel(smooth = true) {
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentProcessIndex);
        });
        
        // Actualizar clases de pasos
        processSteps.forEach((step, index) => {
            step.classList.toggle('active', index === currentProcessIndex);
        });
        
        // Scroll suave al slide actual
        const stepWidth = processSteps[0].offsetWidth;
        const margin = parseInt(getComputedStyle(processSteps[0]).marginRight || 0);
        const scrollPosition = currentProcessIndex * (stepWidth + margin);
        
        if (smooth) {
            processCarousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        } else {
            processCarousel.scrollLeft = scrollPosition;
        }
    }
    
    // Calcular el índice basado en scroll
    function getCurrentProcessIndex() {
        const stepWidth = processSteps[0].offsetWidth;
        const margin = parseInt(getComputedStyle(processSteps[0]).marginRight || 0);
        const scrollLeft = processCarousel.scrollLeft;
        return Math.round(scrollLeft / (stepWidth + margin));
    }
    
    // Scroll event
    let processScrollTimeout;
    processCarousel.addEventListener('scroll', () => {
        clearTimeout(processScrollTimeout);
        processScrollTimeout = setTimeout(() => {
            const newIndex = getCurrentProcessIndex();
            if (newIndex !== currentProcessIndex && newIndex >= 0 && newIndex < totalProcessSlides) {
                currentProcessIndex = newIndex;
                updateProcessCarousel(false);
            }
        }, 100);
    }, { passive: true });
    
    // Eventos para flechas
    if (prevArrow) {
        prevArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentProcessIndex > 0) {
                currentProcessIndex--;
                updateProcessCarousel();
            }
        });
    }
    
    if (nextArrow) {
        nextArrow.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentProcessIndex < totalProcessSlides - 1) {
                currentProcessIndex++;
                updateProcessCarousel();
            }
        });
    }
    
    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentProcessIndex = index;
            updateProcessCarousel();
        });
    });
    
    // Gestos táctiles
    processCarousel.addEventListener('touchstart', (e) => {
        processStartX = e.touches[0].pageX;
        processStartY = e.touches[0].pageY;
        processScrollLeft = processCarousel.scrollLeft;
        processStartTime = Date.now();
        isProcessScrolling = true;
    }, { passive: true });
    
    processCarousel.addEventListener('touchmove', (e) => {
        if (!isProcessScrolling) return;
        
        const x = e.touches[0].pageX;
        const y = e.touches[0].pageY;
        const dx = x - processStartX;
        const dy = y - processStartY;
        
        if (Math.abs(dx) > Math.abs(dy) * 2.5) {
            const walk = (processStartX - x) * 1.2;
            processCarousel.scrollLeft = processScrollLeft + walk;
            e.preventDefault();
        }
    }, { passive: false });
    
    processCarousel.addEventListener('touchend', (e) => {
        if (!isProcessScrolling) return;
        isProcessScrolling = false;
        
        const x = e.changedTouches[0].pageX;
        const y = e.changedTouches[0].pageY;
        const dx = x - processStartX;
        const dy = y - processStartY;
        const timeElapsed = Date.now() - processStartTime;
        
        if (Math.abs(dx) > Math.abs(dy) * 2.5) {
            const stepWidth = processSteps[0].offsetWidth;
            const margin = parseInt(getComputedStyle(processSteps[0]).marginRight || 0);
            
            const velocity = dx / timeElapsed;
            const threshold = 0.25;
            
            if (Math.abs(velocity) > threshold) {
                if (velocity < 0 && currentProcessIndex < totalProcessSlides - 1) {
                    currentProcessIndex++;
                } else if (velocity > 0 && currentProcessIndex > 0) {
                    currentProcessIndex--;
                }
            } else {
                const scrollLeft = processCarousel.scrollLeft;
                const newIndex = Math.round(scrollLeft / (stepWidth + margin));
                currentProcessIndex = Math.max(0, Math.min(newIndex, totalProcessSlides - 1));
            }
            
            updateProcessCarousel();
        }
    });
    
    // Inicializar
    updateProcessCarousel(false);
    
    // Redimensionar ventana
    let processResizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(processResizeTimeout);
        processResizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768) {
                processContainer.style.display = 'block';
                updateProcessCarousel(false);
            } else {
                processContainer.style.display = 'none';
            }
        }, 150);
    });
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
console.log('✅ Versión ultra optimizada - Todas las animaciones activas y fluidas en móvil');
