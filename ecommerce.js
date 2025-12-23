// ecommerce.js - Versión Ultra Optimizada para Móvil y PC - CON MEJORAS PARA ECOMMERCE
// LOGICA IDÉNTICA AL INDEX PARA CARRUSELES Y NAVEGACIÓN

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
            
            // Scroll suave al inicio de la página ecommerce
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Actualizar navegación activa
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'ecommerce.html') {
                    link.classList.add('active');
                }
            });
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
                    (link.getAttribute('href') === 'ecommerce.html' && id === 'ecommerce-hero')) {
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
    console.log('🛒 AVALON CREATORS ECOMMERCE - Sitio optimizado para móvil y PC');
    
    // Animar elementos al cargar
    const elementsToAnimate = document.querySelectorAll('.benefit-card, .plan-card, .faq-item, .floating-card, .table-row');
    
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
        initEcommerceCarousel();
    }
    
    // Setup purchase notifications
    setupPurchaseNotifications();
    
    // Contadores animados (opcional para ecommerce)
    initEcommerceCounters();
});

// ===== CARRUSEL ECOMMERCE OPTIMIZADO Y FLUIDO - LOGICA IDÉNTICA AL INDEX =====
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
    
    console.log(`📊 Carrusel ecommerce: ${totalSlides} planes encontrados`);
    
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
        
        // Scroll suave con MISMA DURACIÓN QUE EL INDEX
        const cardWidth = planCards[0].offsetWidth;
        const scrollPosition = currentIndex * cardWidth;
        
        if (smooth) {
            carousel.scrollTo({
                left: scrollPosition,
                behavior: 'smooth',
                duration: 300
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
    
    // Flechas - SIN FEEDBACK TÁCTIL DE BAJAR/SUBIR (IDÉNTICO AL INDEX)
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
    
    // Scroll automático con debounce mejorado (IDÉNTICO AL INDEX)
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

// ===== CONTADORES ANIMADOS PARA ECOMMERCE =====
function initEcommerceCounters() {
    const stats = document.querySelectorAll('.stat');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    animateEcommerceCounter(statNumber);
                    statNumber.classList.add('animated');
                }
            }
        });
    }, { threshold: 0.5 });
    
    stats.forEach(stat => {
        counterObserver.observe(stat);
    });
}

function animateEcommerceCounter(element) {
    const text = element.textContent;
    let target = 0;
    let suffix = '';
    
    // Analizar el contenido para extraer número y sufijo
    if (text.includes('+')) {
        target = parseInt(text.replace('+', '').replace('M', '').replace('K', ''));
        suffix = text.includes('M') ? 'M' : text.includes('K') ? 'K' : '+';
        if (text.includes('M')) target *= 1000000;
        if (text.includes('K')) target *= 1000;
    } else if (text.includes('%')) {
        target = parseInt(text.replace('%', ''));
        suffix = '%';
    } else {
        target = parseInt(text);
    }
    
    const duration = 2000;
    let start = null;
    
    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function para animación más suave
        const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
        let current = Math.floor(easeOutQuart * target);
        
        // Formatear según el sufijo
        if (suffix === 'M' && current >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (suffix === 'K' && current >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'K';
        } else if (suffix === '+') {
            element.textContent = current + '+';
        } else if (suffix === '%') {
            element.textContent = current + '%';
        } else {
            element.textContent = current;
        }
        
        if (percentage < 1) {
            requestAnimationFrame(step);
        } else {
            // Valor final
            if (suffix === 'M') {
                element.textContent = (target / 1000000).toFixed(1) + 'M';
            } else if (suffix === 'K') {
                element.textContent = (target / 1000).toFixed(0) + 'K';
            } else if (suffix === '+') {
                element.textContent = target + '+';
            } else if (suffix === '%') {
                element.textContent = target + '%';
            } else {
                element.textContent = target;
            }
        }
    }
    
    requestAnimationFrame(step);
}

// ===== NOTIFICACIONES DE COMPRA - NUEVA FUNCIONALIDAD ESPECÍFICA =====
function setupPurchaseNotifications() {
    const maintenanceNotification = document.getElementById('maintenance-notification');
    const purchaseButtons = document.querySelectorAll('.purchase-btn');
    const notificationClose = document.querySelector('.notification-close');
    const socialUnderConstruction = document.querySelectorAll('.social-under-construction');
    
    if (!maintenanceNotification || purchaseButtons.length === 0) return;
    
    // Función para mostrar notificación de mantenimiento
    function showMaintenanceNotification(planName) {
        // Actualizar mensaje con el plan seleccionado
        const notificationText = maintenanceNotification.querySelector('.notification-text p');
        if (notificationText) {
            notificationText.textContent = `Estamos optimizando nuestra plataforma para el plan "${planName}". Por favor, inténtalo más tarde o contáctanos por WhatsApp para reservar tu plan.`;
        }
        
        // Mostrar notificación
        maintenanceNotification.classList.add('active');
        
        // Auto-ocultar después de 8 segundos
        setTimeout(() => {
            maintenanceNotification.classList.remove('active');
        }, 8000);
    }
    
    // Event listeners para botones de compra
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const planName = this.getAttribute('data-plan') || 'Plan Seleccionado';
            
            // Animar el botón clickeado (feedback táctil)
            this.style.transform = 'scale(0.95)';
            this.style.opacity = '0.9';
            setTimeout(() => {
                this.style.transform = '';
                this.style.opacity = '';
            }, 200);
            
            // Mostrar notificación
            showMaintenanceNotification(planName);
            
            // Analytics simulado
            console.log(`🛒 Intento de compra: ${planName}`);
            
            // Enviar evento a Google Analytics (simulado)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'purchase_attempt', {
                    'event_category': 'Ecommerce',
                    'event_label': planName,
                    'value': 1
                });
            }
        });
        
        // Mejorar feedback táctil en móvil
        if ('ontouchstart' in window) {
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
        }
    });
    
    // Cerrar notificación manualmente
    if (notificationClose) {
        notificationClose.addEventListener('click', () => {
            maintenanceNotification.classList.remove('active');
        });
    }
    
    // Cerrar notificación al hacer clic fuera (opcional)
    document.addEventListener('click', (e) => {
        if (maintenanceNotification.classList.contains('active') &&
            !maintenanceNotification.contains(e.target) &&
            !Array.from(purchaseButtons).some(btn => btn.contains(e.target))) {
            maintenanceNotification.classList.remove('active');
        }
    });
    
    // Notificación para redes sociales en construcción (heredada del index)
    function showSocialNotification() {
        // Podríamos reutilizar la misma notificación o crear una específica
        console.log('🔧 Redes sociales en construcción - Función heredada del index');
    }
    
    socialUnderConstruction.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSocialNotification();
        });
    });
}

// ===== RESPONSIVE JS (IDÉNTICA AL INDEX) =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        console.log(`🔄 Redimensionando a: ${window.innerWidth}px`);
        
        // Re-inicializar carrusel si cambiamos a móvil
        if (window.innerWidth <= 768) {
            const carouselExist = document.querySelector('.plans-carousel');
            if (carouselExist && !carouselExist.dataset.initialized) {
                console.log('📱 Re-inicializando carrusel ecommerce para móvil...');
                initEcommerceCarousel();
                carouselExist.dataset.initialized = true;
            }
        }
    }, 250);
});

// ===== MEJORAS DE PERFORMANCE (IDÉNTICAS AL INDEX) =====
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

// ===== DETECCIÓN DE TÁCTIL (IDÉNTICA AL INDEX) =====
const isTouchDevice = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0 || 
    navigator.msMaxTouchPoints > 0;

if (isTouchDevice) {
    document.body.classList.add('touch-device');
    console.log('📱 Dispositivo táctil detectado para ecommerce');
} else {
    document.body.classList.add('no-touch-device');
    console.log('💻 Dispositivo no táctil detectado para ecommerce');
}

// ===== MEJORAS PARA MÓVIL - ELIMINAR EFECTOS NO DESEADOS (IDÉNTICAS AL INDEX) =====
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

// Mejorar feedback táctil en botones (específico para ecommerce)
if (isTouchDevice) {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-plan, .btn-plan-mobile, .nav-link, .context-link, .disclaimer-link, .purchase-btn');
    
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

// ===== POLYFILL PARA SMOOTH SCROLL (IDÉNTICA AL INDEX) =====
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('🔧 Aplicando polyfill para scroll suave en ecommerce');
    // Podríamos cargar un polyfill aquí si es necesario
}

// ===== ERROR HANDLING (IDÉNTICA AL INDEX) =====
window.addEventListener('error', function(e) {
    console.error('❌ Error en la aplicación ecommerce:', e.error);
});

// ===== LOADING STATES (IDÉNTICA AL INDEX) =====
document.addEventListener('readystatechange', () => {
    if (document.readyState === 'complete') {
        console.log('🎉 Página ecommerce completamente cargada y lista');
        document.body.classList.add('loaded');
        
        // Animar tabla comparativa después de cargar
        const tableRows = document.querySelectorAll('.table-row');
        const tableObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('active');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });
        
        tableRows.forEach(row => {
            tableObserver.observe(row);
        });
    }
});

// ===== ANIMACIÓN PARA TABLA COMPARATIVA =====
function initComparisonTableAnimations() {
    const tableRows = document.querySelectorAll('.table-row');
    
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });
    
    tableRows.forEach(row => {
        tableObserver.observe(row);
    });
}

// Inicializar animaciones de tabla cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initComparisonTableAnimations);
} else {
    initComparisonTableAnimations();
}

// ===== FUNCIÓN ESPECIAL PARA ECOMMERCE: SIMULADOR DE CONVERSIÓN =====
function initConversionSimulator() {
    const conversionElements = document.querySelectorAll('.stat-number');
    
    // Simular aumento de conversión en tiempo real (solo demostración)
    setInterval(() => {
        conversionElements.forEach(el => {
            if (el.textContent.includes('%') && Math.random() > 0.7) {
                // Efecto sutil de parpadeo para indicar actividad
                el.style.textShadow = '0 0 10px rgba(16, 185, 129, 0.5)';
                setTimeout(() => {
                    el.style.textShadow = '';
                }, 300);
            }
        });
    }, 5000);
}

// Iniciar simulador después de 3 segundos
setTimeout(() => {
    initConversionSimulator();
    console.log('📈 Simulador de conversión ecommerce iniciado');
}, 3000);

// ===== MEJORA ESPECÍFICA: DETECCIÓN DE INTERÉS EN PLANES =====
document.addEventListener('DOMContentLoaded', () => {
    const planCards = document.querySelectorAll('.plan-card, .plan-card-mobile');
    
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!isTouchDevice) {
                const planTitle = this.querySelector('h3');
                if (planTitle) {
                    planTitle.style.transform = 'translateY(-3px)';
                    planTitle.style.transition = 'transform 0.3s ease';
                }
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!isTouchDevice) {
                const planTitle = this.querySelector('h3');
                if (planTitle) {
                    planTitle.style.transform = '';
                }
            }
        });
        
        // Para móvil: efecto de tap mejorado
        if (isTouchDevice) {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.99)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    });
});
