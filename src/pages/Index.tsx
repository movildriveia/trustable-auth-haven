
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      {/* Header */}
      <header className="bg-white py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-custom-dark flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#17ffd3] to-[#23e3ee]"></div>
            AuthSystem
          </div>
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 mr-8">
              <a href="#" className="text-custom-dark hover:text-primary-custom transition-colors">Home</a>
              <a href="#services" className="text-custom-dark hover:text-primary-custom transition-colors">Services</a>
              <a href="#contact" className="text-custom-dark hover:text-primary-custom transition-colors">Contact</a>
            </nav>
            <div className="flex gap-3">
              <Button 
                variant="turquoise"
                size="sm"
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </Button>
              <Button 
                variant="gradient"
                size="sm"
                onClick={() => navigate("/register")}
              >
                Registrarse
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center section bg-gradient-to-br from-blue-50 to-green-50">
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
                <Button 
                  onClick={() => navigate("/register")}
                  variant="gradient"
                  size="default"
                >
                  Comenzar Ahora
                </Button>
                <Button 
                  onClick={() => navigate("/login")}
                  variant="turquoise"
                  size="default"
                >
                  Iniciar Sesión
                </Button>
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

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-custom-dark">Nuestros Servicios</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-green-100 to-lime-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-custom-dark">Autenticación Segura</h3>
              <p className="text-custom-text mb-6">Implementamos sistemas de login y registro con las mejores prácticas de seguridad.</p>
              <Button variant="lime" size="sm">Más Información</Button>
            </div>
            
            <div className="bg-gradient-to-b from-cyan-100 to-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-custom-dark">Almacenamiento de Datos</h3>
              <p className="text-custom-text mb-6">Guardamos tu información de forma encriptada y segura utilizando Supabase.</p>
              <Button variant="turquoise" size="sm">Más Información</Button>
            </div>
            
            <div className="bg-gradient-to-b from-purple-100 to-indigo-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4 text-custom-dark">Personalización</h3>
              <p className="text-custom-text mb-6">Adaptamos las soluciones a tus necesidades específicas y requerimientos.</p>
              <Button variant="purple" size="sm">Más Información</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-custom-dark">Contáctanos</h2>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <h3 className="text-xl font-semibold mb-4 text-custom-dark">Escríbenos</h3>
              <p className="text-custom-text mb-6">Envíanos un email con tus dudas o requerimientos.</p>
              <Button variant="turquoise" size="sm">Email</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <h3 className="text-xl font-semibold mb-4 text-custom-dark">Llámanos</h3>
              <p className="text-custom-text mb-6">Agenda una llamada para discutir tu proyecto.</p>
              <Button variant="gradient" size="sm">Agendar</Button>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center">
              <h3 className="text-xl font-semibold mb-4 text-custom-dark">Visítanos</h3>
              <p className="text-custom-text mb-6">Nuestras oficinas están abiertas de lunes a viernes.</p>
              <Button variant="blue" size="sm">Dirección</Button>
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
