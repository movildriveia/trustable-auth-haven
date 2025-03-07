
// Funciones de autenticación

// Seleccionar elementos del DOM
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const welcomeLoginBtn = document.getElementById('welcome-login-btn');
const authContainer = document.querySelector('.auth-container');
const dashboardContainer = document.getElementById('dashboard-container');
const welcomeSection = document.getElementById('welcome-section');

// Función para inicializar la autenticación
function initAuth() {
  // Comprobar si el usuario ya está autenticado
  checkSession();
  
  // Event listeners para mostrar/ocultar formularios
  if (showRegisterLink) {
    showRegisterLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginForm.style.display = 'none';
      registerForm.style.display = 'block';
    });
  }
  
  if (showLoginLink) {
    showLoginLink.addEventListener('click', (e) => {
      e.preventDefault();
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  }
  
  // Event listener para iniciar sesión
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      authContainer.style.display = 'block';
      welcomeSection.style.display = 'none';
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  }
  
  if (welcomeLoginBtn) {
    welcomeLoginBtn.addEventListener('click', () => {
      authContainer.style.display = 'block';
      welcomeSection.style.display = 'none';
      registerForm.style.display = 'none';
      loginForm.style.display = 'block';
    });
  }
  
  // Event listener para cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
  }
  
  // Event listeners para formularios
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
}

// Función para comprobar la sesión actual
async function checkSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }
    
    if (data && data.session) {
      // Usuario autenticado, mostrar dashboard
      showDashboard(data.session.user);
    } else {
      // Usuario no autenticado, mostrar sección de bienvenida
      showWelcome();
    }
  } catch (error) {
    console.error('Error al comprobar la sesión:', error.message);
    showWelcome();
  }
}

// Función para iniciar sesión
async function handleLogin(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw error;
    }
    
    showToast('Inicio de sesión exitoso', 'success');
    showDashboard(data.user);
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);
    showToast(error.message, 'error');
  }
}

// Función para registrar un nuevo usuario
async function handleRegister(e) {
  e.preventDefault();
  
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;
  const fullName = document.getElementById('full-name').value;
  const company = document.getElementById('company').value;
  const position = document.getElementById('position').value;
  
  try {
    // Registrar usuario
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company: company,
          position: position
        }
      }
    });
    
    if (error) {
      throw error;
    }
    
    // También guardar la información en la tabla 'profiles'
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            full_name: fullName,
            company: company,
            position: position,
            email: email
          }
        ]);
      
      if (profileError) {
        console.error('Error al guardar el perfil:', profileError.message);
      }
    }
    
    showToast('Registro exitoso. ¡Bienvenido!', 'success');
    showDashboard(data.user);
  } catch (error) {
    console.error('Error al registrar:', error.message);
    showToast(error.message, 'error');
  }
}

// Función para cerrar sesión
async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw error;
    }
    
    showToast('Sesión cerrada correctamente', 'info');
    showWelcome();
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
    showToast(error.message, 'error');
  }
}

// Función para mostrar la sección de bienvenida
function showWelcome() {
  // Ocultar dashboard y formulario de autenticación
  dashboardContainer.style.display = 'none';
  authContainer.style.display = 'none';
  
  // Mostrar sección de bienvenida
  welcomeSection.style.display = 'block';
  
  // Actualizar botones de navegación
  loginBtn.style.display = 'block';
  logoutBtn.style.display = 'none';
}

// Función para mostrar el dashboard
function showDashboard(user) {
  // Ocultar formulario de autenticación y sección de bienvenida
  authContainer.style.display = 'none';
  welcomeSection.style.display = 'none';
  
  // Mostrar dashboard
  dashboardContainer.style.display = 'block';
  
  // Actualizar botones de navegación
  loginBtn.style.display = 'none';
  logoutBtn.style.display = 'block';
  
  // Cargar datos del usuario
  loadUserData(user);
}

// Inicializar cuando se carga el DOM
document.addEventListener('DOMContentLoaded', initAuth);
