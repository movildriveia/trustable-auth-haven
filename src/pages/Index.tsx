
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto py-4 px-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-brand-700">AuthSystem</div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate("/login")}
              className="border-brand-600 text-brand-600 hover:bg-brand-50"
            >
              Iniciar Sesión
            </Button>
            <Button 
              onClick={() => navigate("/register")}
              className="bg-brand-600 hover:bg-brand-700"
            >
              Registrarse
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Sistema de Autenticación <span className="text-brand-600">Seguro y Robusto</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Implementa un sistema de registro y login eficaz con almacenamiento seguro en Supabase. Protege tus datos con las mejores prácticas de seguridad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate("/register")}
                  className="bg-brand-600 hover:bg-brand-700 text-lg py-6 px-8"
                >
                  Comenzar Ahora
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/login")}
                  className="border-brand-600 text-brand-600 hover:bg-brand-50 text-lg py-6 px-8"
                >
                  Iniciar Sesión
                </Button>
              </div>
            </div>
            <div className="hidden lg:block bg-gradient-to-br from-brand-600 to-brand-800 p-8 rounded-xl shadow-xl">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/20">
                <div className="mb-6 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4 text-center">Características de Seguridad</h3>
                <ul className="text-white/80 space-y-3">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Autenticación segura con JWT
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Almacenamiento encriptado
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Protección contra ataques CSRF
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-white mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          Sistema de Autenticación con Supabase &copy; {new Date().getFullYear()} - Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
};

export default Index;
