
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-custom-dark">AuthSystem</div>
          <div className="flex gap-4">
            <button 
              className="btn-custom btn-secondary-custom"
              onClick={() => navigate("/login")}
            >
              Iniciar Sesión
            </button>
            <button 
              className="btn-custom btn-primary-custom"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center section">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-custom-dark">
                Sistema de Autenticación <span className="text-primary-custom">Seguro y Robusto</span>
              </h1>
              <p className="text-xl text-color mb-8">
                Implementa un sistema de registro y login eficaz con almacenamiento seguro en Supabase. Protege tus datos con las mejores prácticas de seguridad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate("/register")}
                  className="btn-custom btn-primary-custom"
                >
                  Comenzar Ahora
                </button>
                <button 
                  onClick={() => navigate("/login")}
                  className="btn-custom btn-secondary-custom"
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
            <div className="hidden lg:block bg-gradient-to-br from-[#17ffd3] to-[#d3fc71] p-8 rounded-xl shadow-xl relative">
              <div className="hero-bg-1 animate-left-right">
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="10.5" cy="10.5" r="10.5" fill="#17FFD3" fillOpacity="0.3"/>
                </svg>
              </div>
              <div className="hero-bg-2 animate-up-down">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="7.5" cy="7.5" r="7.5" fill="#D3FC71" fillOpacity="0.3"/>
                </svg>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-custom-dark text-xl font-semibold mb-4 text-center">Características de Seguridad</h3>
                <ul className="text-custom-dark space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-custom-dark mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Autenticación segura con JWT
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-custom-dark mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Almacenamiento encriptado
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-custom-dark mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Protección contra ataques CSRF
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-custom-dark mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Recuperación de contraseña
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t py-8">
        <div className="container mx-auto px-6 text-center text-color text-sm">
          Sistema de Autenticación con Supabase &copy; {new Date().getFullYear()} - Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
};

export default Index;
