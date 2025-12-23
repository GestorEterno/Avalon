// cuenta.js - Sistema de autenticación y panel de control

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ AVALON CREATORS - Sistema de Cuenta cargado');
    
    // Inicializar componentes
    initNavigation();
    initAuthForms();
    initDashboard();
    initSocialNotifications();
    
    // Verificar si hay sesión activa
    checkAuthStatus();
    
    // Aplicar mejoras para móvil
    if (window.innerWidth <= 768) {
        initMobileEnhancements();
    }
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
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
    }
}

// ===== SISTEMA DE AUTENTICACIÓN =====
function initAuthForms() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const switchToRegister = document.querySelector('.switch-to-register');
    const switchToLogin = document.querySelector('.switch-to-login');
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    const fillDemoBtn = document.getElementById('fill-demo');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Cambio entre pestañas
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Actualizar pestañas activas
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Mostrar formulario correspondiente
            authForms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${tabName}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });

    // Switch entre formularios
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            authTabs[1].click();
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            authTabs[0].click();
        });
    }

    // Mostrar/ocultar contraseña
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Rellenar credenciales de prueba
    if (fillDemoBtn) {
        fillDemoBtn.addEventListener('click', () => {
            document.getElementById('login-email').value = 'gestor@avalon.com';
            document.getElementById('login-password').value = '1234';
            document.getElementById('remember-me').checked = true;
            
            // Feedback visual
            fillDemoBtn.innerHTML = '<i class="fas fa-check"></i> Credenciales cargadas';
            fillDemoBtn.style.background = 'rgba(16, 185, 129, 0.1)';
            fillDemoBtn.style.borderColor = 'var(--success)';
            fillDemoBtn.style.color = 'var(--success)';
            
            setTimeout(() => {
                fillDemoBtn.innerHTML = '<i class="fas fa-magic"></i> Rellenar automáticamente';
                fillDemoBtn.style.background = '';
                fillDemoBtn.style.borderColor = '';
                fillDemoBtn.style.color = '';
            }, 2000);
        });
    }

    // Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value.trim();
            const password = document.getElementById('login-password').value;
            const remember = document.getElementById('remember-me').checked;
            
            // Validación básica
            if (!email || !password) {
                showNotification('Por favor, completa todos los campos', 'warning');
                return;
            }
            
            // Credenciales de prueba
            const demoUsers = {
                'gestor@avalon.com': '1234',
                'usuario@test.com': 'test123',
                'cliente@ejemplo.com': 'cliente123'
            };
            
            if (demoUsers[email] && demoUsers[email] === password) {
                // Simular autenticación exitosa
                simulateLogin(email, email.split('@')[0], remember, email === 'gestor@avalon.com');
            } else {
                showNotification('Credenciales incorrectas. Usa gestor@avalon.com / 1234', 'danger');
            }
        });
    }

    // Registro
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            const terms = document.getElementById('terms').checked;
            
            // Validaciones
            if (!name || !email || !password || !confirmPassword) {
                showNotification('Por favor, completa todos los campos obligatorios', 'warning');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Las contraseñas no coinciden', 'danger');
                return;
            }
            
            if (!terms) {
                showNotification('Debes aceptar los términos y condiciones', 'warning');
                return;
            }
            
            // Validación de email simple
            if (!isValidEmail(email)) {
                showNotification('Por favor, introduce un email válido', 'warning');
                return;
            }
            
            // Simular registro exitoso
            simulateRegistration(name, email, password);
        });
    }
}

// ===== DASHBOARD =====
function initDashboard() {
    const logoutBtn = document.getElementById('logout-btn');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardSections = document.querySelectorAll('.dashboard-section');
    
    // Cerrar sesión
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
    
    // Navegación en el dashboard
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Actualizar enlaces activos
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            dashboardSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
            
            // Scroll suave en móvil
            if (window.innerWidth <= 768) {
                document.querySelector('.dashboard-main').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Botones de zona de peligro
    const exportBtn = document.getElementById('export-data');
    const deleteBtn = document.getElementById('delete-account');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            showNotification('Función de exportación en desarrollo', 'info');
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.')) {
                showNotification('Función de eliminación en desarrollo', 'info');
            }
        });
    }
}

// ===== FUNCIONES DE AUTENTICACIÓN =====
function checkAuthStatus() {
    const userData = localStorage.getItem('avalon_user');
    
    if (userData) {
        const user = JSON.parse(userData);
        showDashboard(user);
    } else {
        showAuthForms();
    }
}

function simulateLogin(email, name, remember, isGestor = false) {
    // Simular delay de red
    showNotification('Iniciando sesión...', 'info');
    
    setTimeout(() => {
        const user = {
            email,
            name,
            isGestor,
            loggedIn: true,
            remember
        };
        
        // Guardar en localStorage
        localStorage.setItem('avalon_user', JSON.stringify(user));
        
        // Mostrar dashboard
        showDashboard(user);
        
        showNotification(`¡Bienvenido ${name}!`, 'success');
    }, 1000);
}

function simulateRegistration(name, email, password) {
    showNotification('Creando cuenta...', 'info');
    
    setTimeout(() => {
        const user = {
            email,
            name,
            isGestor: false,
            loggedIn: true,
            remember: false
        };
        
        // Guardar en localStorage
        localStorage.setItem('avalon_user', JSON.stringify(user));
        
        // Mostrar dashboard
        showDashboard(user);
        
        showNotification(`¡Cuenta creada exitosamente, ${name}!`, 'success');
    }, 1500);
}

function logout() {
    // Eliminar datos de sesión
    localStorage.removeItem('avalon_user');
    
    // Mostrar formularios de autenticación
    showAuthForms();
    
    showNotification('Sesión cerrada exitosamente', 'info');
}

function showAuthForms() {
    document.getElementById('auth-forms').style.display = 'block';
    document.getElementById('dashboard').style.display = 'none';
    
    // Resetear formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Mostrar pestaña de login
    document.querySelector('.auth-tab[data-tab="login"]').click();
}

function showDashboard(user) {
    document.getElementById('auth-forms').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    
    // Actualizar información del usuario
    document.getElementById('user-name').textContent = user.name;
    document.getElementById('user-email').textContent = user.email;
    
    // Mostrar notificación de gestor si corresponde
    if (user.isGestor) {
        document.getElementById('gestor-notification').style.display = 'block';
        document.getElementById('user-status').innerHTML = `
            <span class="status-badge premium">Usuario Gestor</span>
            <span class="user-email">${user.email}</span>
        `;
    }
    
    // Cargar datos del usuario
    loadUserData(user);
}

function loadUserData(user) {
    // Aquí se cargarían los datos reales del usuario desde el backend
    // Por ahora simulamos datos
    
    // Actualizar estadísticas
    updateStats(user);
    
    // Cargar proyectos (vacío por ahora)
    updateProjects([]);
    
    // Cargar planes (vacío por ahora)
    updatePlans([]);
}

function updateStats(user) {
    // Actualizar proyectos activos
    document.getElementById('active-projects').textContent = '0';
    
    // Días restantes según tipo de usuario
    const days = user.isGestor ? '∞' : '30';
    document.getElementById('days-remaining').textContent = days;
}

function updateProjects(projects) {
    const emptyState = document.getElementById('projects-empty');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projects.length === 0) {
        emptyState.style.display = 'block';
        projectsGrid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        projectsGrid.style.display = 'grid';
        
        // Generar HTML de proyectos
        // projectsGrid.innerHTML = ...
    }
}

function updatePlans(plans) {
    const emptyState = document.getElementById('plans-empty');
    const activePlans = document.getElementById('active-plans');
    
    if (plans.length === 0) {
        emptyState.style.display = 'block';
        activePlans.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        activePlans.style.display = 'block';
        
        // Generar HTML de planes
        // activePlans.innerHTML = ...
    }
}

// ===== NOTIFICACIONES =====
function initSocialNotifications() {
    const socialNotification = document.getElementById('social-notification');
    const underConstructionLinks = document.querySelectorAll('.social-under-construction');
    
    if (!socialNotification || underConstructionLinks.length === 0) return;
    
    function showSocialNotification() {
        socialNotification.classList.add('active');
        
        setTimeout(() => {
            socialNotification.classList.remove('active');
        }, 3000);
    }
    
    underConstructionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showSocialNotification();
        });
    });
}

function showNotification(message, type = 'info') {
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${getNotificationBorderColor(type)};
    `;
    
    // Animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getNotificationIcon(type) {
    const icons = {
        'success': 'check-circle',
        'warning': 'exclamation-triangle',
        'danger': 'times-circle',
        'info': 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        'success': 'var(--success)',
        'warning': 'var(--warning)',
        'danger': 'var(--danger)',
        'info': 'var(--info)'
    };
    return colors[type] || 'var(--info)';
}

function getNotificationBorderColor(type) {
    const colors = {
        'success': '#0fa968',
        'warning': '#e68a00',
        'danger': '#d63031',
        'info': '#2d6df5'
    };
    return colors[type] || '#2d6df5';
}

// ===== VALIDACIONES =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== MEJORAS PARA MÓVIL =====
function initMobileEnhancements() {
    // Prevenir efectos de tap azul
    document.addEventListener('touchstart', function() {}, {passive: true});
    
    // Mejorar feedback táctil
    const interactiveElements = document.querySelectorAll(
        'button, .auth-tab, .sidebar-link, .action-card, .btn-submit, .demo-btn, .logout-btn'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
            }, 150);
        });
    });
}

// ===== RESPONSIVE =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        // Ajustes específicos para móvil/escritorio
        if (window.innerWidth <= 768) {
            // Código para móvil
        } else {
            // Código para escritorio
        }
    }, 250);
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('❌ Error en el sistema de cuenta:', e.error);
});

// ===== FUNCIONES ADICIONALES PARA FUTURO BACKEND =====
function saveUserData(user) {
    // Cuando tengas backend, aquí iría la llamada a la API
    console.log('Guardando datos del usuario:', user);
    
    // Por ahora solo guardamos en localStorage
    localStorage.setItem('avalon_user', JSON.stringify(user));
}

function getUserData() {
    const userData = localStorage.getItem('avalon_user');
    return userData ? JSON.parse(userData) : null;
}

// Exportar para uso global
window.AvalonAccount = {
    login: simulateLogin,
    logout: logout,
    register: simulateRegistration,
    getUser: getUserData,
    showNotification: showNotification
};

console.log('🚀 Sistema de cuenta AVALON CREATORS inicializado');
