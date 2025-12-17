// Navegación móvil mejorada
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Sistema de navegación activa según scroll
const sections = document.querySelectorAll('section');
const navLinksArray = Array.from(navLinks);

// Configuración del Intersection Observer para detección de sección activa
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px', // Ajuste fino para detección temprana
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remover clase activa de todos los enlaces
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.style.color = '';
            });
            
            // Agregar clase activa al enlace correspondiente
            const id = entry.target.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);
            
            if (correspondingLink) {
                correspondingLink.classList.add('active');
                // Añadir estilo inline para el subrayado activo
                correspondingLink.style.color = 'var(--accent)';
            }
        }
    });
}, observerOptions);

// Observar todas las secciones
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Cambiar navbar al hacer scroll - MEJORADO
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.scrollY;
    
    // Efecto de fondo al hacer scroll
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
    
    // Detectar dirección del scroll para efectos sutiles
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Animaciones al hacer scroll mejoradas
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

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
    
    // Activar sección "inicio" por defecto al cargar
    const homeLink = document.querySelector('.nav-link[href="#inicio"]');
    if (homeLink && window.scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        homeLink.classList.add('active');
        homeLink.style.color = 'var(--accent)';
    }
});

// Contadores animados para estadísticas - MEJORADO
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Iniciar contadores cuando sean visibles
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                let target;
                if (statNumber.textContent.includes('+')) {
                    target = parseInt(statNumber.textContent.replace('+', ''));
                } else {
                    target = parseInt(statNumber.textContent);
                }
                if (!isNaN(target)) {
                    animateCounter(statNumber, target);
                    statNumber.classList.add('animated');
                }
            }
        }
    });
}, { threshold: 0.5 });

// Observar estadísticas
document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Efectos de hover mejorados para tarjetas
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

// Carga progresiva de imágenes
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    
    // Añadir clase cargada al body para transiciones suaves
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Forzar actualización del menú activo después de carga
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 500);
});

// Mejora de accesibilidad: navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // Navegación con teclado entre secciones
    if (e.altKey && e.key >= '1' && e.key <= '4') {
        const index = parseInt(e.key) - 1;
        if (navLinksArray[index]) {
            navLinksArray[index].click();
        }
    }
});

// Mensaje de consola
console.log('🚀 AVALON CREATORS - Menú activo y animaciones mejoradas');
console.log('✅ Navegación: Secciones activas detectadas automáticamente');
console.log('✅ Animaciones: Suaves y optimizadas');
console.log('✅ Proceso: Animación de flujo de energía activada');
console.log('✅ Footer: Estructura dual responsive funcionando');
