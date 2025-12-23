// cuenta.js - Sistema de autenticación y panel de control - VERSIÓN CORREGIDA

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
            const emailInput = document.getElementById('login-email');
            const passwordInput = document.getElementById('login-password');
            const rememberCheckbox = document.getElementById('remember-me');
            
            if (emailInput && passwordInput) {
                emailInput.value = 'gestor@avalon.com';
                passwordInput.value = '1234';
                if (rememberCheckbox) rememberCheckbox.checked = true;
                
                // Feedback visual mejorado
                fillDemoBtn.innerHTML = '<i class="fas fa-check"></i> Credenciales cargadas';
                fillDemoBtn.style.background = 'rgba(16, 185, 129, 0.1)';
                fillDemoBtn.style.borderColor = 'var(--success)';
                fillDemoBtn.style.color = 'var(--success)';
                
                // Efecto de vibración suave
                fillDemoBtn.style.animation = 'vibrate 0.3s linear';
                setTimeout(() => {
                    fillDemoBtn.style.animation = '';
                }, 300);
                
                // Restaurar después de 2 segundos
                setTimeout(() => {
                    fillDemoBtn.innerHTML = '<i class="fas fa-magic"></i> Rellenar automáticamente';
                    fillDemoBtn.style.background = '';
                    fillDemoBtn.style.borderColor = '';
                    fillDemoBtn.style.color = '';
                }, 2000);
            }
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
            
            // Scroll suave en móvil hacia la sección
            if (window.innerWidth <= 768) {
                const sectionElement = document.getElementById(targetId);
                if (sectionElement) {
                    setTimeout(() => {
                        sectionElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 100);
                }
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
        try {
            const user = JSON.parse(userData);
            if (user && user.loggedIn) {
                showDashboard(user);
                return;
            }
        } catch (e) {
            console.error('Error al parsear datos de usuario:', e);
        }
    }
    
    showAuthForms();
}

function simulateLogin(email, name, remember, isGestor = false) {
    // Simular delay de red con animación
    const submitBtn = document.querySelector('#loginForm .btn-submit');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Iniciando sesión...';
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        const user = {
            email,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            isGestor,
            loggedIn: true,
            remember,
            lastLogin: new Date().toISOString()
        };
        
        // Guardar en localStorage
        localStorage.setItem('avalon_user', JSON.stringify(user));
        
        // Restaurar botón
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Iniciar Sesión';
            submitBtn.disabled = false;
        }
        
        // Mostrar dashboard
        showDashboard(user);
        
        showNotification(`¡Bienvenido ${user.name}!`, 'success');
    }, 1500);
}

function simulateRegistration(name, email, password) {
    const submitBtn = document.querySelector('#registerForm .btn-submit');
    if (submitBtn) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creando cuenta...';
        submitBtn.disabled = true;
    }
    
    setTimeout(() => {
        const user = {
            email,
            name: name.charAt(0).toUpperCase() + name.slice(1),
            isGestor: false,
            loggedIn: true,
            remember: false,
            createdAt: new Date().toISOString()
        };
        
        // Guardar en localStorage
        localStorage.setItem('avalon_user', JSON.stringify(user));
        
        // Restaurar botón
        if (submitBtn) {
            submitBtn.innerHTML = '<i class="fas fa-user-plus"></i> Crear Cuenta';
            submitBtn.disabled = false;
        }
        
        // Mostrar dashboard
        showDashboard(user);
        
        showNotification(`¡Cuenta creada exitosamente, ${user.name}!`, 'success');
    }, 1500);
}

function logout() {
    // Animación de salida
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cerrando...';
        logoutBtn.disabled = true;
    }
    
    setTimeout(() => {
        // Eliminar datos de sesión
        localStorage.removeItem('avalon_user');
        
        // Restaurar botón
        if (logoutBtn) {
            logoutBtn.innerHTML = '<i class="fas fa-sign-out-alt"></i> Cerrar Sesión';
            logoutBtn.disabled = false;
        }
        
        // Mostrar formularios de autenticación
        showAuthForms();
        
        showNotification('Sesión cerrada exitosamente', 'info');
    }, 1000);
}

function showAuthForms() {
    const authForms = document.getElementById('auth-forms');
    const dashboard = document.getElementById('dashboard');
    
    if (authForms) authForms.style.display = 'block';
    if (dashboard) dashboard.style.display = 'none';
    
    // Resetear formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.reset());
    
    // Mostrar pestaña de login
    const loginTab = document.querySelector('.auth-tab[data-tab="login"]');
    if (loginTab) loginTab.click();
    
    // Resetear iconos de contraseña
    document.querySelectorAll('.toggle-password i').forEach(icon => {
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    });
}

function showDashboard(user) {
    const authForms = document.getElementById('auth-forms');
    const dashboard = document.getElementById('dashboard');
    
    if (authForms) authForms.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';
    
    // Actualizar información del usuario
    const userNameElement = document.getElementById('user-name');
    const userEmailElement = document.getElementById('user-email');
    const userStatusElement = document.getElementById('user-status');
    
    if (userNameElement) userNameElement.textContent = user.name;
    if (userEmailElement) userEmailElement.textContent = user.email;
    
    // Mostrar notificación de gestor si corresponde
    const gestorNotification = document.getElementById('gestor-notification');
    if (gestorNotification) {
        if (user.isGestor) {
            gestorNotification.style.display = 'block';
            if (userStatusElement) {
                userStatusElement.innerHTML = `
                    <span class="status-badge premium">Usuario Gestor</span>
                    <span class="user-email">${user.email}</span>
                `;
            }
        } else {
            gestorNotification.style.display = 'none';
            if (userStatusElement) {
                userStatusElement.innerHTML = `
                    <span class="status-badge free">Cuenta Free</span>
                    <span class="user-email">${user.email}</span>
                `;
            }
        }
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
    
    // Actualizar formulario de perfil
    updateProfileForm(user);
}

function updateStats(user) {
    // Actualizar proyectos activos
    const activeProjectsElement = document.getElementById('active-projects');
    if (activeProjectsElement) {
        activeProjectsElement.textContent = '0';
    }
    
    // Días restantes según tipo de usuario
    const daysRemainingElement = document.getElementById('days-remaining');
    if (daysRemainingElement) {
        const days = user.isGestor ? '∞' : '30';
        daysRemainingElement.textContent = days;
    }
}

function updateProjects(projects) {
    const emptyState = document.getElementById('projects-empty');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!emptyState || !projectsGrid) return;
    
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
    
    if (!emptyState || !activePlans) return;
    
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

function updateProfileForm(user) {
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    
    if (profileName) profileName.value = user.name;
    if (profileEmail) profileEmail.value = user.email;
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
    // Verificar si ya hay una notificación activa
    const existingNotification = document.querySelector('.notification-temporary');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Crear notificación temporal
    const notification = document.createElement('div');
    notification.className = `notification-temporary notification-${type}`;
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
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        max-width: 280px;
        animation: slideInRight 0.3s ease;
        border-left: 3px solid ${getNotificationBorderColor(type)};
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        font-family: 'Montserrat', sans-serif;
    `;
    
    // Añadir animación CSS si no existe
    if (!document.querySelector('#notification-animation')) {
        const style = document.createElement('style');
        style.id = 'notification-animation';
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            @keyframes vibrate {
                0% { transform: translateX(0); }
                25% { transform: translateX(-2px); }
                50% { transform: translateX(2px); }
                75% { transform: translateX(-2px); }
                100% { transform: translateX(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
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
    
    // Mejorar feedback táctil en elementos interactivos
    const interactiveElements = document.querySelectorAll(
        'button, .auth-tab, .sidebar-link, .action-card, .btn-submit, .demo-btn, .logout-btn, .btn-primary, .btn-upgrade'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.opacity = '';
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Asegurar que la barra lateral en móvil sea desplazable
    const sidebarNav = document.querySelector('.sidebar-nav');
    if (sidebarNav && window.innerWidth <= 768) {
        sidebarNav.style.overflowX = 'auto';
        sidebarNav.style.WebkitOverflowScrolling = 'touch';
        sidebarNav.style.scrollbarWidth = 'none';
    }
}

// ===== RESPONSIVE =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    
    resizeTimeout = setTimeout(() => {
        // Ajustes específicos para móvil/escritorio
        if (window.innerWidth <= 768) {
            initMobileEnhancements();
            
            // Asegurar que la barra lateral sea horizontal en móvil
            const sidebarNav = document.querySelector('.sidebar-nav');
            if (sidebarNav) {
                sidebarNav.style.flexDirection = 'row';
                sidebarNav.style.overflowX = 'auto';
            }
        } else {
            // Restaurar barra lateral vertical en escritorio
            const sidebarNav = document.querySelector('.sidebar-nav');
            if (sidebarNav) {
                sidebarNav.style.flexDirection = 'column';
                sidebarNav.style.overflowX = 'visible';
            }
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

console.log('🚀 Sistema de cuenta AVALON CREATORS inicializado - VERSIÓN CORREGIDA');
