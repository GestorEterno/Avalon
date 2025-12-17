[file name]: index.js
[file content begin]
// MENÚ HAMBURGUESA FACHERO - CRÍTICO OPTIMIZADO
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Animación de menú hamburguesa mejorada
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    
    // Animación de fondo cuando el menú está abierto
    if (navMenu.classList.contains('active')) {
        navbar.style.background = 'rgba(15, 52, 96, 0.98)';
        document.body.style.position = 'fixed';
    } else {
        navbar.style.background = 'rgba(15, 52, 96, 0.95)';
        document.body.style.position = '';
    }
});

// Cerrar menú al hacer clic en enlace
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Solo cerrar si estamos en móvil
        if (window.innerWidth <= 991) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            
            // Cerrar menú primero
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            navbar.style.background = 'rgba(15, 52, 96, 0.95)';
            
            // Desplazarse suavemente al target después de cerrar menú
            setTimeout(() => {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        }
    });
});

// Detectar scroll para cambiar estilo del navbar
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(15, 52, 96, 0.95)';
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
                navbar.style.backdropFilter = 'blur(15px)';
            } else {
                navbar.style.background = 'rgba(15, 52, 96, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
                navbar.style.backdropFilter = 'blur(15px)';
            }
            
            lastScroll = currentScroll;
            ticking = false;
        });
        ticking = true;
    }
});

// Sistema de animaciones al hacer scroll - OPTIMIZADO PARA MÓVILES
const revealElements = () => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const windowHeight = window.innerHeight;
    const revealPoint = 150;
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    });
};

// Throttle para optimizar rendimiento en móviles
let revealTimeout;
function throttleReveal() {
    if (!revealTimeout) {
        revealTimeout = setTimeout(() => {
            revealElements();
            revealTimeout = null;
        }, 100);
    }
}

// Inicializar sistema de animaciones
document.addEventListener('DOMContentLoaded', () => {
    // Agregar clase reveal-on-scroll a elementos que se animarán
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-on-scroll');
    });
    
    // Revelar elementos en la vista inicial
    revealElements();
    
    // Configurar eventos para animaciones
    window.addEventListener('scroll', throttleReveal);
    window.addEventListener('resize', throttleReveal);
    
    // Cargar elementos con retardo para mejor rendimiento en móviles
    const loadDelayedElements = () => {
        const delayedElements = document.querySelectorAll('.service-card, .floating-card');
        delayedElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('loading-element');
            }, index * 100);
        });
    };
    
    // Cargar después de un breve retardo
    setTimeout(loadDelayedElements, 300);
    
    // Configurar navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
        }
    });
    
    // Activar enlace de inicio si estamos en la parte superior
    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
    }
});

// Sistema de contadores animados - Optimizado para móviles
const animateCounter = (element, target, duration = 1500) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
};

// Observador para contadores
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                let target = 0;
                const text = statNumber.textContent;
                
                if (text.includes('+')) {
                    target = parseInt(text.replace('+', ''));
                } else if (text.includes('%')) {
                    target = parseInt(text.replace('%', ''));
                } else {
                    target = parseInt(text);
                }
                
                if (!isNaN(target)) {
                    animateCounter(statNumber, target, 1500);
                    statNumber.classList.add('animated');
                }
            }
        }
    });
}, { 
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

// Observar todos los stats
document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Efectos hover optimizados para móviles
const setupHoverEffects = () => {
    // Solo en escritorio
    if (window.innerWidth > 768) {
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
    }
};

// Sistema de notificaciones para redes sociales
const setupSocialMediaNotifications = () => {
    const socialNotification = document.getElementById('social-notification');
    const underConstructionLinks = document.querySelectorAll('.social-under-construction');
    
    if (!socialNotification || underConstructionLinks.length === 0) return;
    
    function showNotification() {
        socialNotification.classList.add('active');
        
        setTimeout(() => {
            socialNotification.classList.remove('active');
        }, 2500);
    }
    
    underConstructionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efecto táctil para móviles
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            showNotification();
        });
        
        // Añadir feedback táctil
        link.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        link.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
};

// Optimización para carga en móviles
const optimizeForMobile = () => {
    // Reducir animaciones en móviles con poca batería
    if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.saveData || connection.effectiveType.includes('2g')) {
            document.body.classList.add('reduced-motion');
        }
    }
    
    // Detectar si es móvil y ajustar
    if (window.innerWidth <= 768) {
        // Reducir duración de animaciones en móviles
        document.documentElement.style.setProperty('--transition', 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)');
        
        // Optimizar elementos flotantes
        const floatingCards = document.querySelectorAll('.floating-card');
        floatingCards.forEach(card => {
            card.style.animationDuration = '8s';
        });
    }
};

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target) &&
        window.innerWidth <= 991) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
    }
});

// Inicializar todo cuando el DOM esté listo
window.addEventListener('DOMContentLoaded', () => {
    setupHoverEffects();
    setupSocialMediaNotifications();
    optimizeForMobile();
    
    // Añadir clase loaded para transiciones suaves
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Forzar un scroll inicial para activar animaciones
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
    
    // Log de inicialización
    console.log('🚀 AVALON CREATORS - Sistema móvil optimizado cargado al 100%');
    console.log('📱 MODO MÓVIL: Menú hamburguesa fachero activado');
    console.log('🎯 ANIMACIONES: Optimizadas para rendimiento en móviles');
    console.log('⚡ CARGA: Elementos cargados inteligentemente');
    console.log('👆 INTERACCIÓN: Touch optimizado para pantallas táctiles');
});

// Mejorar experiencia táctil
document.addEventListener('touchstart', () => {}, {passive: true});

// Prevenir zoom en inputs en iOS
document.addEventListener('touchmove', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.preventDefault();
    }
}, { passive: false });
[file content end]
