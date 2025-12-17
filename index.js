// ===== CONFIGURACIÓN INICIAL =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Detectar preferencias del usuario
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouchDevice = 'ontouchstart' in window;
const isLowPerformanceDevice = detectLowPerformance();

// ===== DETECCIÓN DE DISPOSITIVO =====
function detectLowPerformance() {
    // Detectar dispositivos de baja performance
    const memory = navigator.deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;
    const connection = navigator.connection ? navigator.connection.effectiveType : '4g';
    
    return memory < 4 || cores < 4 || connection === '2g' || connection === 'slow-2g';
}

// Aplicar clase si es dispositivo de baja performance
if (isLowPerformanceDevice) {
    document.body.classList.add('low-performance');
    console.log('📱 Dispositivo de baja performance detectado - Optimizando...');
}

// ===== MENÚ HAMBURGUESA OPTIMIZADO =====
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (window.innerWidth <= 768) {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            
            // Scroll suave al cerrar menú
            requestAnimationFrame(() => {
                window.scrollTo({
                    top: window.scrollY,
                    behavior: 'instant'
                });
            });
        }
    }
}

// Event listeners optimizados
if (isTouchDevice) {
    // Para dispositivos táctiles
    hamburger.addEventListener('touchstart', function(e) {
        e.preventDefault();
        toggleMenu();
    }, { passive: false });
    
    hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        toggleMenu();
    });
} else {
    // Para desktop
    hamburger.addEventListener('click', toggleMenu);
    hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
}

// ===== CERRAR MENÚ AL HACER CLIC EN ENLACES =====
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Restaurar scroll del body
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            
            // Scroll suave después de cerrar menú
            setTimeout(() => {
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 70;
                        
                        if (prefersReducedMotion || isLowPerformanceDevice) {
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'instant'
                            });
                        } else {
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                }
            }, 50);
        } else {
            // En desktop, solo actualizar clases
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ===== CERRAR MENÚ AL TOCAR FUERA (MOBILE) =====
function closeMenuOnClickOutside(e) {
    if (window.innerWidth <= 768 && 
        navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.height = '';
    }
}

// Usar event listeners apropiados según el dispositivo
if (isTouchDevice) {
    document.addEventListener('touchstart', closeMenuOnClickOutside, { passive: true });
} else {
    document.addEventListener('click', closeMenuOnClickOutside);
}

// ===== NAVEGACIÓN POR SECCIONES CON INTERSECTION OBSERVER =====
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

// Configuración optimizada del observer
const observerOptions = {
    root: null,
    rootMargin: window.innerWidth <= 768 ? '-10% 0px -30% 0px' : '-20% 0px -70% 0px',
    threshold: window.innerWidth <= 768 ? 0.1 : 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.style.color = '';
            });
            
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (correspondingLink) {
                correspondingLink.classList.add('active');
                correspondingLink.style.color = 'var(--accent)';
                
                // Smooth highlight effect
                requestAnimationFrame(() => {
                    correspondingLink.style.transition = 'color 0.3s ease';
                });
            }
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ===== SCROLL SUAVE Y NAVBAR DINÁMICA =====
let scrollTimeout;
let lastScrollY = window.scrollY;
let ticking = false;

function updateNavbarOnScroll() {
    const currentScrollY = window.scrollY;
    
    // Agregar/remover clase scrolled
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Efecto de desvanecimiento suave
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.opacity = '0.95';
        navbar.style.transform = 'translateY(-2px)';
    } else {
        navbar.style.opacity = '1';
        navbar.style.transform = 'translateY(0)';
    }
    
    // Sombra dinámica
    const shadowIntensity = Math.min(currentScrollY / 100, 0.3);
    navbar.style.boxShadow = `0 5px 20px rgba(0, 0, 0, ${0.1 + shadowIntensity})`;
    
    lastScrollY = currentScrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateNavbarOnScroll);
        ticking = true;
    }
    
    // Debouncing para limpiar timeout
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Restablecer estilos después de scroll
        if (window.scrollY <= 0) {
            navbar.style.transform = 'translateY(0)';
            navbar.style.opacity = '1';
        }
    }, 100);
}, { passive: true });

// ===== ANIMACIONES DE APARICIÓN OPTIMIZADAS =====
const revealObserverOptions = {
    threshold: window.innerWidth <= 768 ? 0.1 : 0.15,
    rootMargin: window.innerWidth <= 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Usar requestAnimationFrame para animación suave
            requestAnimationFrame(() => {
                entry.target.classList.add('active');
            });
        }
    });
}, revealObserverOptions);

// ===== INICIALIZAR ANIMACIONES =====
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
    if (prefersReducedMotion || isLowPerformanceDevice) {
        // Saltar animaciones si el usuario prefiere reducidas
        elementsToAnimate.forEach(el => {
            el.classList.add('active');
        });
        return;
    }
    
    if (window.innerWidth <= 768) {
        // Retraso para móviles
        setTimeout(() => {
            elementsToAnimate.forEach(el => {
                el.classList.add('reveal');
                revealObserver.observe(el);
            });
        }, 300);
    } else {
        elementsToAnimate.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }
    
    // Activar enlace de inicio si estamos cerca del top
    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
        homeLink.style.color = 'var(--accent)';
    }
}

// ===== CONTADOR ANIMADO OPTIMIZADO =====
function animateCounter(element, target, duration = 2000, suffix = '') {
    if (prefersReducedMotion || isLowPerformanceDevice) {
        element.textContent = target + suffix;
        return;
    }
    
    let start = 0;
    const increment = target / (duration / 16);
    let lastTime = 0;
    
    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        
        if (deltaTime > 16) { // Aproximadamente 60fps
            start += increment;
            if (start >= target) {
                element.textContent = target + suffix;
                return;
            } else {
                element.textContent = Math.floor(start) + suffix;
            }
            lastTime = timestamp;
        }
        
        if (start < target) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

const counterObserverOptions = {
    threshold: window.innerWidth <= 768 ? 0.3 : 0.5,
    rootMargin: '50px 0px'
};

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
                    const duration = window.innerWidth <= 768 ? 1500 : 2000;
                    animateCounter(statNumber, target, duration, suffix);
                    statNumber.classList.add('animated');
                }
            }
        }
    });
}, counterObserverOptions);

document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// ===== ANIMACIONES DE PASOS OPTIMIZADAS =====
function enhanceStepAnimations() {
    const steps = document.querySelectorAll('.step');
    
    if (prefersReducedMotion || isLowPerformanceDevice) {
        // Desactivar animaciones complejas
        return;
    }
    
    if (!isTouchDevice || window.innerWidth > 768) {
        // Solo en desktop o tablets en landscape
        steps.forEach(step => {
            step.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            step.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    if (isTouchDevice && window.innerWidth <= 768) {
        // Para móviles táctiles
        steps.forEach(step => {
            step.addEventListener('touchstart', function(e) {
                e.preventDefault();
                this.classList.add('active');
                
                // Remover clase después de un tiempo
                setTimeout(() => {
                    this.classList.remove('active');
                }, 1000);
            }, { passive: false });
        });
    }
}

// ===== HOVER EFFECTS OPTIMIZADOS =====
function setupHoverEffects() {
    if (isTouchDevice || prefersReducedMotion) {
        return; // Desactivar hover en dispositivos táctiles
    }
    
    document.querySelectorAll('.service-card, .plan-card, .floating-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px)';
            } else {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = 'scale(1.02)';
            }
        });
    });
}

// ===== LAZY LOADING OPTIMIZADO =====
function lazyLoadImages() {
    if ('loading' in HTMLImageElement.prototype) {
        // Usar lazy loading nativo
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback con IntersectionObserver
        const imageObserver = new IntersectionObserver((entries) => {
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
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
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
            
            // Feedback táctil
            if (isTouchDevice) {
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
            
            showNotification();
            
            // Log para desarrollo
            const icon = this.querySelector('i');
            const platform = icon ? icon.className.split(' ')[1] : 'red social';
            console.log(`🔄 ${platform} - En construcción. Notificación mostrada.`);
        });
        
        // Touch feedback específico
        if (isTouchDevice) {
            link.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            }, { passive: true });
            
            link.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }, { passive: true });
        }
    });
}

// ===== OPTIMIZACIONES ESPECÍFICAS PARA MÓVILES =====
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Añadir clase para detectar dispositivos táctiles
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
        }
        
        // Ajustar umbrales de observadores
        counterObserverOptions.threshold = 0.3;
        
        // Simplificar animaciones en móviles
        if (isLowPerformanceDevice) {
            document.querySelectorAll('.step-number').forEach(step => {
                step.style.animation = 'none';
            });
        }
    }
}

// ===== ENLACES DE WHATSAPP =====
function checkWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`📱 WhatsApp link clicked: ${this.href}`);
            
            // Feedback visual
            if (isTouchDevice) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
}

// ===== MANEJO DE CAMBIO DE ORIENTACIÓN Y RESIZE =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Cerrar menú si cambiamos a desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }
        
        // Re-optimizar para el nuevo tamaño
        optimizeForMobile();
        
        // Re-inicializar observadores si es necesario
        revealObserverOptions.threshold = window.innerWidth <= 768 ? 0.1 : 0.15;
        revealObserverOptions.rootMargin = window.innerWidth <= 768 ? '0px 0px -50px 0px' : '0px 0px -100px 0px';
        
    }, 250);
}, { passive: true });

// ===== NAVEGACIÓN POR TECLADO =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
        }
    }
    
    // Atajos de teclado numéricos (Alt + 1-4)
    if (e.altKey && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (navLinksArray[index]) {
            navLinksArray[index].click();
        }
    }
});

// ===== PREVENIR PULL-TO-REFRESH EN iOS =====
if (isTouchDevice) {
    let startY;
    
    document.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    }, { passive: true });
    
    document.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
        
        // Solo prevenir pull-to-refresh cuando el menú está abierto
        if (navMenu.classList.contains('active') || window.scrollY === 0) {
            const currentY = e.touches[0].clientY;
            if (currentY > startY) {
                e.preventDefault();
            }
        }
    }, { passive: false });
}

// ===== INICIALIZACIÓN COMPLETA =====
document.addEventListener('DOMContentLoaded', () => {
    // Detectar dispositivo y preferencias
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
    }
    
    if (prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
        console.log('⚡ Animaciones reducidas activadas por preferencia del usuario');
    }
    
    // Inicializar funciones
    lazyLoadImages();
    setupSocialMediaNotifications();
    setupHoverEffects();
    enhanceStepAnimations();
    initializeAnimations();
    optimizeForMobile();
    checkWhatsAppLinks();
    
    // Añadir clase de carga completa
    setTimeout(() => {
        document.body.classList.add('loaded');
        
        // Disparar evento scroll inicial después de carga
        requestAnimationFrame(() => {
            window.dispatchEvent(new Event('scroll'));
        });
    }, 100);
    
    // Forzar redibujado para evitar flashes
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
    
    // Log de carga optimizada
    setTimeout(() => {
        console.log('🚀 AVALON CREATORS - Sistema optimizado cargado al 100%');
        console.log(`📊 Detalles: ${isTouchDevice ? 'Touch' : 'Desktop'} | ${prefersReducedMotion ? 'Animaciones reducidas' : 'Animaciones completas'} | ${isLowPerformanceDevice ? 'Baja performance' : 'Alta performance'}`);
    }, 500);
});

// ===== PERFORMANCE MONITORING =====
let frameCount = 0;
let lastTime = performance.now();
let fps = 60;

function monitorPerformance() {
    const currentTime = performance.now();
    frameCount++;
    
    if (currentTime > lastTime + 1000) {
        fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;
        
        // Ajustar animaciones si FPS es bajo
        if (fps < 30 && !isLowPerformanceDevice) {
            console.warn(`⚠️ FPS bajo detectado: ${fps} - Optimizando animaciones...`);
            document.body.classList.add('low-performance');
        }
    }
    
    requestAnimationFrame(monitorPerformance);
}

// Iniciar monitoreo de performance
if (process.env.NODE_ENV === 'development') {
    requestAnimationFrame(monitorPerformance);
}

// ===== EXPORTAR FUNCIONES PARA DEBUG (solo desarrollo) =====
if (process.env.NODE_ENV === 'development') {
    window.avalondebug = {
        toggleMenu,
        optimizeForMobile,
        resetAnimations: () => {
            document.querySelectorAll('.reveal').forEach(el => {
                el.classList.remove('active');
                revealObserver.observe(el);
            });
        }
    };
}
