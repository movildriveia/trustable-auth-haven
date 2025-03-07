
// Funciones del dashboard

// Elementos del DOM para el perfil
const userGreeting = document.getElementById('user-greeting');
const userEmail = document.getElementById('user-email');
const displayName = document.getElementById('display-name');
const displayCompany = document.getElementById('display-company');
const displayPosition = document.getElementById('display-position');

// Elementos del DOM para la edición del perfil
const editProfileBtn = document.getElementById('edit-profile-btn');
const editProfileContainer = document.getElementById('edit-profile-container');
const editProfileForm = document.getElementById('edit-profile-form');
const cancelEditBtn = document.getElementById('cancel-edit');
const editName = document.getElementById('edit-name');
const editCompany = document.getElementById('edit-company');
const editPosition = document.getElementById('edit-position');

// Variable para almacenar los datos del usuario actual
let currentUser = null;

// Función para cargar los datos del usuario
async function loadUserData(user) {
  if (!user) return;
  
  currentUser = user;
  
  // Mostrar email del usuario
  if (userEmail) {
    userEmail.textContent = user.email;
  }
  
  try {
    // Intenta obtener los datos del perfil desde la tabla 'profiles'
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      // PGRST116 es el código para "no se encontraron resultados", no es un error crítico
      throw error;
    }
    
    // Si tenemos datos del perfil en la tabla, usamos esos
    if (data) {
      updateProfileDisplay(data.full_name, data.company, data.position);
    } else {
      // Si no hay datos en la tabla, usamos los metadatos del usuario
      const metadata = user.user_metadata || {};
      updateProfileDisplay(
        metadata.full_name || 'Usuario',
        metadata.company || 'No especificada',
        metadata.position || 'No especificado'
      );
    }
  } catch (error) {
    console.error('Error al cargar datos del perfil:', error.message);
    showToast('Error al cargar datos del perfil', 'error');
    
    // Usar los metadatos como respaldo
    const metadata = user.user_metadata || {};
    updateProfileDisplay(
      metadata.full_name || 'Usuario',
      metadata.company || 'No especificada',
      metadata.position || 'No especificado'
    );
  }
  
  // Configurar event listeners para la edición del perfil
  setupProfileEditing();
}

// Función para actualizar la visualización del perfil
function updateProfileDisplay(name, company, position) {
  if (userGreeting) {
    userGreeting.textContent = `¡Hola, ${name}!`;
  }
  
  if (displayName) {
    displayName.textContent = name;
  }
  
  if (displayCompany) {
    displayCompany.textContent = company;
  }
  
  if (displayPosition) {
    displayPosition.textContent = position;
  }
  
  // También actualizar los campos del formulario de edición
  if (editName) {
    editName.value = name;
  }
  
  if (editCompany) {
    editCompany.value = company;
  }
  
  if (editPosition) {
    editPosition.value = position;
  }
}

// Función para configurar la edición del perfil
function setupProfileEditing() {
  if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
      // Mostrar formulario de edición
      if (editProfileContainer) {
        editProfileContainer.style.display = 'flex';
      }
    });
  }
  
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
      // Ocultar formulario de edición
      if (editProfileContainer) {
        editProfileContainer.style.display = 'none';
      }
    });
  }
  
  if (editProfileForm) {
    editProfileForm.addEventListener('submit', handleProfileUpdate);
  }
}

// Función para manejar la actualización del perfil
async function handleProfileUpdate(e) {
  e.preventDefault();
  
  if (!currentUser) {
    showToast('No hay usuario autenticado', 'error');
    return;
  }
  
  const name = editName.value;
  const company = editCompany.value;
  const position = editPosition.value;
  
  try {
    // Actualizar metadatos del usuario
    const { error: userUpdateError } = await supabase.auth.updateUser({
      data: {
        full_name: name,
        company: company,
        position: position
      }
    });
    
    if (userUpdateError) {
      throw userUpdateError;
    }
    
    // Actualizar o insertar en la tabla 'profiles'
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert({
        id: currentUser.id,
        full_name: name,
        company: company,
        position: position,
        email: currentUser.email,
        updated_at: new Date()
      });
    
    if (profileError) {
      throw profileError;
    }
    
    // Actualizar la visualización
    updateProfileDisplay(name, company, position);
    
    // Ocultar formulario de edición
    if (editProfileContainer) {
      editProfileContainer.style.display = 'none';
    }
    
    showToast('Perfil actualizado correctamente', 'success');
  } catch (error) {
    console.error('Error al actualizar el perfil:', error.message);
    showToast(error.message, 'error');
  }
}

// Agregar una entrada a la feed de actividad
function addActivityItem(message, icon = 'ti-info-alt') {
  const activityFeed = document.getElementById('activity-feed');
  if (!activityFeed) return;
  
  const activityItem = document.createElement('div');
  activityItem.className = 'activity-item';
  activityItem.innerHTML = `<i class="${icon}"></i><span>${message}</span>`;
  
  // Añadir al principio de la lista
  activityFeed.insertBefore(activityItem, activityFeed.firstChild);
}

// Exponer funciones globalmente
window.loadUserData = loadUserData;
window.addActivityItem = addActivityItem;
