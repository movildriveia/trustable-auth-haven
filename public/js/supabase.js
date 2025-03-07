
// Inicialización de Supabase
const supabaseUrl = 'https://qioxddkbyetflxmdghmu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3hkZGtieWV0Zmx4bWRnaG11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA1NzU3NjIsImV4cCI6MjA1NjE1MTc2Mn0.njPacJDLKGMKqtHRmpW5V5rC_x-k23P6NRR0LKLDz5o';

// Crear el cliente de Supabase
const supabase = supabase.createClient(supabaseUrl, supabaseAnonKey);

// Función para mostrar notificaciones
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  
  // Eliminar clases anteriores
  toast.classList.remove('success', 'error', 'info');
  
  // Añadir clase según el tipo
  toast.classList.add(type);
  
  // Establecer el mensaje
  toastMessage.textContent = message;
  
  // Mostrar el toast
  toast.style.display = 'block';
  
  // Ocultar después de 3 segundos
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
}
