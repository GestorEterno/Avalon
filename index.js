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
});

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

function enhanceStepAnimations() {
    const steps = document.querySelectorAll('.step');
    
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
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
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    setupSocialMediaNotifications();
    enhanceStepAnimations();
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    setTimeout(() => {
        const event = new Event('scroll');
        window.dispatchEvent(event);
    }, 500);
});

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

function checkWhatsAppLinks() {
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            console.log(`📱 WhatsApp link clicked: ${this.href}`);
        });
    });
}

checkWhatsAppLinks();

console.log('🚀 AVALON CREATORS - Sistema mejorado cargado al 100%');
