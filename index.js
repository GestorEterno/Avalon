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

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0.3rem 0';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.padding = '0.5rem 0';
    }
});

// Formulario de contacto mejorado
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Recopilar datos del formulario
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Mostrar estado de envío
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitButton.disabled = true;
    
    // Simular envío (en producción, enviar a servidor)
    setTimeout(() => {
        // Mostrar notificación de éxito
        showNotification('¡Solicitud enviada con éxito! Te contactaremos en menos de 24 horas.', 'success');
        
        // Reiniciar formulario
        contactForm.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
        
        // Scroll suave al inicio
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 2000);
});

// Función de notificación mejorada
function showNotification(message, type = 'info') {
    // Eliminar notificación existente si hay una
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Añadir estilos si no existen
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(15px);
                border-left: 4px solid #4CAF50;
                border-radius: 8px;
                padding: 1rem 1.5rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                max-width: 400px;
                transform: translateX(120%);
                transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification.success {
                border-left-color: #4CAF50;
            }
            .notification.error {
                border-left-color: #f44336;
            }
            .notification.info {
                border-left-color: #2196F3;
            }
            .notification.show {
                transform: translateX(0);
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.7rem;
                color: #333;
                font-weight: 500;
            }
            .notification-content i {
                font-size: 1.2rem;
            }
            .notification.success .notification-content i {
                color: #4CAF50;
            }
            .notification.error .notification-content i {
                color: #f44336;
            }
            .notification.info .notification-content i {
                color: #2196F3;
            }
            .notification-close {
                background: none;
                border: none;
                color: #666;
                cursor: pointer;
                font-size: 1rem;
                transition: color 0.3s ease;
            }
            .notification-close:hover {
                color: #333;
            }
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                    transform: translateY(-150%);
                }
                .notification.show {
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Configurar cierre automático
    const autoClose = setTimeout(() => {
        closeNotification(notification);
    }, 5000);
    
    // Configurar botón de cierre
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoClose);
        closeNotification(notification);
    });
    
    function closeNotification(notificationElement) {
        notificationElement.classList.remove('show');
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.parentNode.removeChild(notificationElement);
            }
        }, 400);
    }
}

// Animaciones al hacer scroll mejoradas
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.service-card, .plan-card, .step, .floating-card');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Añadir clase para animación
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});

// Contadores animados para estadísticas
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
                const target = parseInt(statNumber.textContent);
                animateCounter(statNumber, target);
                statNumber.classList.add('animated');
            }
        }
    });
}, { threshold: 0.5 });

// Observar estadísticas
document.querySelectorAll('.stat').forEach(stat => {
    counterObserver.observe(stat);
});

// Validación mejorada del formulario
function validateForm() {
    const email = document.getElementById('email').value;
    const channel = document.getElementById('channel').value;
    const name = document.getElementById('name').value;
    
    // Validación de nombre
    if (name.trim().length < 2) {
        showNotification('Por favor, introduce un nombre válido (mínimo 2 caracteres).', 'error');
        return false;
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, introduce un correo electrónico válido.', 'error');
        return false;
    }
    
    // Validación de URL
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(channel)) {
        showNotification('Por favor, introduce un enlace válido a tu canal.', 'error');
        return false;
    }
    
    return true;
}

// Efectos de hover mejorados para tarjetas
document.querySelectorAll('.service-card, .plan-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Carga progresiva de imágenes (para futuras implementaciones)
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
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
});

// Efecto de escritura eliminado para mejorar rendimiento y experiencia

// Mejora de accesibilidad: navegación por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Cerrar menú móvil si está abierto
        if (navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Mejora de rendimiento: throttling para eventos de scroll
let scrollTimer;
window.addEventListener('scroll', () => {
    if (!scrollTimer) {
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            // Aquí iría el código que se ejecuta en scroll
        }, 10);
    }
});

// Mejora de UX: preloader eliminado para carga más rápida

console.log('AVALON CREATORS - Sitio web cargado correctamente');
