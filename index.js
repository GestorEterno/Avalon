const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Optimizar menú hamburguesa para click y touch
hamburger.addEventListener('click', toggleMenu);
hamburger.addEventListener('touchstart', function(e) {
    e.preventDefault();
    toggleMenu();
}, { passive: false });

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (window.innerWidth <= 768) {
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    } else {
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }
}

// Cerrar menú al hacer clic en enlaces
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        if (window.innerWidth <= 768) {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            
            // Pequeño delay para scroll suave en móviles
            setTimeout(() => {
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            behavior: 'smooth',
                            top: targetElement.offsetTop - 70
                        });
                    }
                }
            }, 100);
        } else {
            document.body.style.overflow = '';
        }
    });
});

// Cerrar menú al tocar fuera (solo mobile)
document.addEventListener('touchstart', function(e) {
    if (navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});

document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        navMenu.classList.contains('active') && 
        !hamburger.contains(e.target) && 
        !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
    }
});

// Navegación por secciones con IntersectionObserver optimizado para móviles
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

const observerOptions = window.innerWidth <= 768 ? {
    root: null,
    rootMargin: '-10% 0px -30% 0px',
    threshold: 0.1
} : {
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

// Scroll optimizado para móviles con debouncing - MODIFICADO
let isScrolling;
let lastScroll = 0;

window.addEventListener('scroll', () => {
    // Cancelar timeout anterior
    window.clearTimeout(isScrolling);
    
    // Configurar timeout para ejecutar después de que termine el scroll
    isScrolling = setTimeout(() => {
        const navbar = document.querySelector('.navbar');
        const currentScroll = window.scrollY;
        
        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.05)';
        }
        
        if (currentScroll <= 0) {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    }, 66);
}, { passive: true });

// Animaciones de aparición optimizadas para móviles
const revealObserverOptions = window.innerWidth <= 768 ? {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
} : {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, revealObserverOptions);

// Carga progresiva optimizada para móviles
function initializeAnimations() {
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
    if (window.innerWidth <= 768) {
        // Retrasar animaciones no críticas en móviles
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

// Contador animado optimizado
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

const counterObserverOptions = window.innerWidth <= 768 ? {
    threshold: 0.3
} : { threshold: 0.5 };

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
                    // Duración más corta en móviles
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

// Hover effects optimizados para touch
document.querySelectorAll('.service-card, .plan-card').forEach(card => {
    if (!('ontouchstart' in window)) {
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
    }
});

// Lazy loading optimizado
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
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Notificaciones de redes sociales
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
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
            
            showNotification();
            
            const icon = this.querySelector('i');
            const platform = icon ? icon.className.split(' ')[1] : 'red social';
            console.log(`🔄 ${platform} - En construcción. Notificación mostrada.`);
        });
        
        // Para touch devices
        link.addEventListener('touchstart', function(e) {
            this.style.transform = 'scale(0.95)';
        }, { passive: true });
        
        link.addEventListener('touchend', function(e) {
            this.style.transform = '';
        }, { passive: true });
    });
}

// Animaciones de pasos optimizadas para móviles
function enhanceStepAnimations() {
    const steps = document.querySelectorAll('.step');
    
    if ('ontouchstart' in window) {
        // En dispositivos táctiles, usar animaciones más simples
        steps.forEach(step => {
            step.addEventListener('touchstart', function() {
                if (window.innerWidth > 768) { // Solo en desktop
                    const stepNumber = this.querySelector('.step-number');
                    stepNumber.style.transform = 'scale(1.05)';
                    stepNumber.style.transition = 'transform 0.3s ease';
                }
            });
            
            step.addEventListener('touchend', function() {
                if (window.innerWidth > 768) {
                    const stepNumber = this.querySelector('.step-number');
                    stepNumber.style.transform = '';
                }
            });
        });
        return;
    }
    
    // Solo en desktop con mouse
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                const stepNumber = this.querySelector('.step-number');
                const stepContent = this.querySelector('.step-content');
                
                try {
                    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                    if (audioContext) {
                        const oscillator = audioContext.createOscillator();
                        const gainNode = audioContext.createGain();
                        
                        oscillator.connect(gainNode);
                        gainNode.connect(audioContext.destination);
                        
                        oscillator.frequency.value = 440 + (Math.random() * 100);
                        oscillator.type = 'sine';
                        
                        gainNode.gain.setValueAtTime(0.001, audioContext.currentTime);
                        gainNode.gain.exponentialRampToValueAtTime(0.005, audioContext.currentTime + 0.1);
                        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
                        
                        oscillator.start(audioContext.currentTime);
                        oscillator.stop(audioContext.currentTime + 0.3);
                    }
                } catch (e) {
                    // Silenciar errores de audio
                }
            }
        });
    });
}

// Optimizaciones específicas para móviles
function optimizeForMobile() {
    if (window.innerWidth <= 768) {
        // Añadir clase para detectar dispositivos táctiles
        if ('ontouchstart' in window) {
            document.body.classList.add('touch-device');
        }
        
        // Ajustar umbrales de observadores
        counterObserverOptions.threshold = 0.3;
        
        // Desactivar animaciones complejas en pasos para móviles
        if ('ontouchstart' in window) {
            const steps = document.querySelectorAll('.step');
            steps.forEach(step => {
                // Remover event listeners de mouse si existen
                const newStep = step.cloneNode(true);
                step.parentNode.replaceChild(newStep, step);
            });
        }
    }
}

// Inicialización completa
document.addEventListener('DOMContentLoaded', () => {
    // Detectar dispositivo táctil
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Inicializar funciones
    lazyLoadImages();
    setupSocialMediaNotifications();
    enhanceStepAnimations();
    initializeAnimations();
    optimizeForMobile();
    
    // Añadir clase de carga completa
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Disparar evento scroll inicial después de carga
    setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
    }, 500);
    
    // Forzar redibujado para evitar flashes en móviles
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 50);
});

// Navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }
    
    if (e.altKey && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (navLinksArray[index]) {
            navLinksArray[index].click();
        }
    }
});

// Verificar enlaces de WhatsApp
function checkWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`📱 WhatsApp link clicked: ${this.href}`);
            
            // Feedback visual para touch
            if ('ontouchstart' in window) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
}

checkWhatsAppLinks();

// Manejar cambio de orientación
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
        
        // Re-optimizar para el nuevo tamaño
        optimizeForMobile();
    }, 250);
});

// Prevenir comportamiento de pull-to-refresh en iOS
document.addEventListener('touchmove', function(e) {
    if (navMenu.classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// Log de carga optimizada
setTimeout(() => {
    console.log('🚀 AVALON CREATORS - Sistema mejorado cargado al 100%');
    console.log('🎯 Efecto glassmorphism permanente en navbar con inmersión total');
}, 1000);
