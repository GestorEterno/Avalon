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

// ===== ANIMACIONES DE REVELADO ESPECÍFICAS PARA ECCOMMERCE =====
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
    // Elementos específicos de ecommerce para animar
    const elementsToAnimate = document.querySelectorAll(
        '.stat-ecommerce, .problema-card, .beneficio-item, .plan-ecommerce-card, .proceso-step, .metric-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Navegación activa inicial
    const ecommerceLink = document.querySelector('.nav-link[href="eccomerce.html"]');
    if (ecommerceLink && window.location.pathname.includes('eccomerce')) {
        navLinks.forEach(link => link.classList.remove('active'));
        ecommerceLink.classList.add('active');
        ecommerceLink.style.color = 'var(--accent)';
    }
    
    // Inicializar carrusel para móvil
    initEcommerceCarousel();
    
    // Inicializar funcionalidades específicas
    setupPlanComparisons();
    setupMetricAnimation();
    
    // Smooth scroll para enlaces internos
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
            }
        });
    });
});

// ===== CARRUSEL PARA MÓVIL (PLANES ECCOMMERCE) =====
function initEcommerceCarousel() {
    const carouselContainer = document.querySelector('.carousel-container-ecommerce');
    const carousel = document.querySelector('.ecommerce-carousel');
    const planCards = document.querySelectorAll('.plan-ecommerce-card');
    const indicators = document.querySelectorAll('.indicator-ecommerce');
    
    if (!carouselContainer || planCards.length === 0) return;
    
    // Solo activar en móvil/tablet
    if (window.innerWidth > 1024) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    carouselContainer.style.display = 'block';
    
    // Clonar y agregar las tarjetas al carrusel
    carousel.innerHTML = '';
    planCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove('featured');
        carousel.appendChild(clone);
    });
    
    const carouselCards = carousel.querySelectorAll('.plan-ecommerce-card');
    let currentIndex = 0;
    const totalSlides = carouselCards.length;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar clases de tarjetas
        carouselCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll suave al slide actual
        const cardWidth = carouselCards[0].offsetWidth;
        const scrollPosition = currentIndex * (cardWidth + 30);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Touch events para móvil
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < totalSlides - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarousel();
            isDragging = false;
        }
    }, { passive: true });
    
    // Inicializar
    updateCarousel();
    
    // Redimensionar ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            carouselContainer.style.display = 'block';
        } else {
            carouselContainer.style.display = 'none';
        }
    });
}

// ===== COMPARACIÓN DE PLANES INTERACTIVA =====
function setupPlanComparisons() {
    const planCards = document.querySelectorAll('.plan-ecommerce-card');
    const comparativaCols = document.querySelectorAll('.comparativa-col');
    
    planCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            comparativaCols.forEach(col => col.classList.remove('highlight'));
            if (comparativaCols[index]) {
                comparativaCols[index].classList.add('highlight');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            comparativaCols.forEach(col => col.classList.remove('highlight'));
        });
        
        card.addEventListener('click', () => {
            const link = card.querySelector('.btn-plan-ecommerce');
            if (link) {
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            }
        });
    });
}

// ===== ANIMACIÓN DE MÉTRICAS =====
function setupMetricAnimation() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueElement = entry.target;
                const originalValue = valueElement.textContent;
                const numericValue = parseInt(originalValue.replace(/[^0-9]/g, ''));
                
                if (!isNaN(numericValue) && !valueElement.classList.contains('animated')) {
                    animateMetric(valueElement, numericValue, originalValue);
                    valueElement.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    metricValues.forEach(value => metricObserver.observe(value));
}

function animateMetric(element, target, originalText) {
    let start = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = originalText;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 50);
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

// ===== ANIMACIÓN DE ESTADÍSTICAS DEL HERO =====
function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        let target, suffix = '';
        
        if (text.includes('%')) {
            target = parseInt(text.replace('%', ''));
            suffix = '%';
        } else if (text.includes('+')) {
            target = parseInt(text.replace('+', ''));
            suffix = '+';
        } else {
            target = parseInt(text);
        }
        
        if (!isNaN(target)) {
            let start = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(start) + suffix;
                }
            }, 50);
        }
    });
}

// ===== INICIALIZAR TODO AL CARGAR =====
window.addEventListener('load', () => {
    setTimeout(() => {
        animateHeroStats();
        setupSocialMediaNotifications();
        
        // Disparar evento scroll para activar efectos
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 500);
});

// ===== ATAJOS DE TECLADO =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Navegación rápida por números (1-3 para planes)
    if (e.altKey && e.key >= '1' && e.key <= '3') {
        const index = parseInt(e.key) - 1;
        const planLinks = document.querySelectorAll('.btn-plan-ecommerce');
        if (planLinks[index]) {
            planLinks[index].click();
        }
    }
});

// ===== VERIFICACIÓN DE ENLACES WHATSAPP =====
function checkWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`📱 WhatsApp Ecommerce link clicked: ${this.href}`);
            
            // Track which plan was clicked
            const planText = this.closest('.plan-ecommerce-card')?.querySelector('h3')?.textContent || 'Ecommerce';
            console.log(`🛒 Plan seleccionado: ${planText}`);
        });
    });
}

checkWhatsAppLinks();

// ===== MENSAJE DE CONSOLA ESPECÍFICO PARA ECCOMMERCE =====
console.log('%c🛒 AVALON CREATORS - ECOMMERCE SPECIALIST', 'color: #00d084; font-size: 16px; font-weight: bold;');
console.log('%cPágina especializada en desarrollo de tiendas online profesionales', 'color: #2e86de;');
console.log('%cPlanes: Base ($10/mes) | Pro ($50/mes) | IA ($100/mes)', 'color: #ff9f43;');// ===== NAVEGACIÓN MÓVIL =====
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

// ===== ANIMACIONES DE REVELADO ESPECÍFICAS PARA ECCOMMERCE =====
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
    // Elementos específicos de ecommerce para animar
    const elementsToAnimate = document.querySelectorAll(
        '.stat-ecommerce, .problema-card, .beneficio-item, .plan-ecommerce-card, .proceso-step, .metric-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Navegación activa inicial
    const ecommerceLink = document.querySelector('.nav-link[href="eccomerce.html"]');
    if (ecommerceLink && window.location.pathname.includes('eccomerce')) {
        navLinks.forEach(link => link.classList.remove('active'));
        ecommerceLink.classList.add('active');
        ecommerceLink.style.color = 'var(--accent)';
    }
    
    // Inicializar carrusel para móvil
    initEcommerceCarousel();
    
    // Inicializar funcionalidades específicas
    setupPlanComparisons();
    setupMetricAnimation();
    
    // Smooth scroll para enlaces internos
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
            }
        });
    });
});

// ===== CARRUSEL PARA MÓVIL (PLANES ECCOMMERCE) =====
function initEcommerceCarousel() {
    const carouselContainer = document.querySelector('.carousel-container-ecommerce');
    const carousel = document.querySelector('.ecommerce-carousel');
    const planCards = document.querySelectorAll('.plan-ecommerce-card');
    const indicators = document.querySelectorAll('.indicator-ecommerce');
    
    if (!carouselContainer || planCards.length === 0) return;
    
    // Solo activar en móvil/tablet
    if (window.innerWidth > 1024) {
        carouselContainer.style.display = 'none';
        return;
    }
    
    carouselContainer.style.display = 'block';
    
    // Clonar y agregar las tarjetas al carrusel
    carousel.innerHTML = '';
    planCards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.remove('featured');
        carousel.appendChild(clone);
    });
    
    const carouselCards = carousel.querySelectorAll('.plan-ecommerce-card');
    let currentIndex = 0;
    const totalSlides = carouselCards.length;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        // Actualizar indicadores
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
        
        // Actualizar clases de tarjetas
        carouselCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
        
        // Scroll suave al slide actual
        const cardWidth = carouselCards[0].offsetWidth;
        const scrollPosition = currentIndex * (cardWidth + 30);
        carousel.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    }
    
    // Eventos para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
    
    // Touch events para móvil
    let startX = 0;
    let isDragging = false;
    
    carousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < totalSlides - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateCarousel();
            isDragging = false;
        }
    }, { passive: true });
    
    // Inicializar
    updateCarousel();
    
    // Redimensionar ventana
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 1024) {
            carouselContainer.style.display = 'block';
        } else {
            carouselContainer.style.display = 'none';
        }
    });
}

// ===== COMPARACIÓN DE PLANES INTERACTIVA =====
function setupPlanComparisons() {
    const planCards = document.querySelectorAll('.plan-ecommerce-card');
    const comparativaCols = document.querySelectorAll('.comparativa-col');
    
    planCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            comparativaCols.forEach(col => col.classList.remove('highlight'));
            if (comparativaCols[index]) {
                comparativaCols[index].classList.add('highlight');
            }
        });
        
        card.addEventListener('mouseleave', () => {
            comparativaCols.forEach(col => col.classList.remove('highlight'));
        });
        
        card.addEventListener('click', () => {
            const link = card.querySelector('.btn-plan-ecommerce');
            if (link) {
                link.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    link.style.transform = '';
                }, 200);
            }
        });
    });
}

// ===== ANIMACIÓN DE MÉTRICAS =====
function setupMetricAnimation() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueElement = entry.target;
                const originalValue = valueElement.textContent;
                const numericValue = parseInt(originalValue.replace(/[^0-9]/g, ''));
                
                if (!isNaN(numericValue) && !valueElement.classList.contains('animated')) {
                    animateMetric(valueElement, numericValue, originalValue);
                    valueElement.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    metricValues.forEach(value => metricObserver.observe(value));
}

function animateMetric(element, target, originalText) {
    let start = 0;
    const increment = target / 30;
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = originalText;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 50);
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

// ===== ANIMACIÓN DE ESTADÍSTICAS DEL HERO =====
function animateHeroStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        let target, suffix = '';
        
        if (text.includes('%')) {
            target = parseInt(text.replace('%', ''));
            suffix = '%';
        } else if (text.includes('+')) {
            target = parseInt(text.replace('+', ''));
            suffix = '+';
        } else {
            target = parseInt(text);
        }
        
        if (!isNaN(target)) {
            let start = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    stat.textContent = target + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(start) + suffix;
                }
            }, 50);
        }
    });
}

// ===== INICIALIZAR TODO AL CARGAR =====
window.addEventListener('load', () => {
    setTimeout(() => {
        animateHeroStats();
        setupSocialMediaNotifications();
        
        // Disparar evento scroll para activar efectos
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 500);
});

// ===== ATAJOS DE TECLADO =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Navegación rápida por números (1-3 para planes)
    if (e.altKey && e.key >= '1' && e.key <= '3') {
        const index = parseInt(e.key) - 1;
        const planLinks = document.querySelectorAll('.btn-plan-ecommerce');
        if (planLinks[index]) {
            planLinks[index].click();
        }
    }
});

// ===== VERIFICACIÓN DE ENLACES WHATSAPP =====
function checkWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`📱 WhatsApp Ecommerce link clicked: ${this.href}`);
            
            // Track which plan was clicked
            const planText = this.closest('.plan-ecommerce-card')?.querySelector('h3')?.textContent || 'Ecommerce';
            console.log(`🛒 Plan seleccionado: ${planText}`);
        });
    });
}

checkWhatsAppLinks();

// ===== MENSAJE DE CONSOLA ESPECÍFICO PARA ECCOMMERCE =====
console.log('%c🛒 AVALON CREATORS - ECOMMERCE SPECIALIST', 'color: #00d084; font-size: 16px; font-weight: bold;');
console.log('%cPágina especializada en desarrollo de tiendas online profesionales', 'color: #2e86de;');
console.log('%cPlanes: Base ($10/mes) | Pro ($50/mes) | IA ($100/mes)', 'color: #ff9f43;');
