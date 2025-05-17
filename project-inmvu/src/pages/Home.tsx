import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, CheckCircle, Award, Clock, Calendar, MessageSquare } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Background" 
            className="w-full h-full object-cover object-center opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center">
          <h1 className="text-4xl font-serif font-bold text-white text-center sm:text-5xl md:text-6xl">
            Asesoría Legal Inmobiliaria
          </h1>
          <p className="mt-6 text-xl text-blue-100 text-center max-w-3xl">
            Expertos en derecho inmobiliario a tu servicio. Resolvemos tus dudas legales y te guiamos en cada paso.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/consultation"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-md shadow-md transition-all duration-300 text-center"
            >
              Consulta Gratuita
            </Link>
            <Link
              to="/appointments"
              className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-800 font-medium rounded-md shadow-md transition-all duration-300 text-center"
            >
              Agendar Cita
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Nuestros Servicios</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Ofrecemos asesoría legal especializada en diferentes áreas del sector inmobiliario.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Asesoría Predial</h3>
              <p className="mt-2 text-gray-600">
                Resolvemos dudas sobre impuestos prediales, avalúos catastrales y trámites ante entidades municipales.
              </p>
            </div>

            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Trámites Notariales</h3>
              <p className="mt-2 text-gray-600">
                Asesoramos en escrituras, compraventas, hipotecas y todos los trámites ante notarías.
              </p>
            </div>

            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Procesos Sucesorales</h3>
              <p className="mt-2 text-gray-600">
                Te guiamos en sucesiones, herencias y distribución de bienes inmuebles entre herederos.
              </p>
            </div>

            {/* Service 4 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Consultoría Tributaria</h3>
              <p className="mt-2 text-gray-600">
                Resolvemos dudas sobre impuestos relacionados con la tenencia, compra o venta de inmuebles.
              </p>
            </div>

            {/* Service 5 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Asesoría Contractual</h3>
              <p className="mt-2 text-gray-600">
                Elaboramos y revisamos contratos de arrendamiento, compraventa y otros documentos legales.
              </p>
            </div>

            {/* Service 6 */}
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
              <div className="p-2 bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900">Asesoría Legal General</h3>
              <p className="mt-2 text-gray-600">
                Consultas generales sobre problemáticas legales en el sector inmobiliario.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Cómo Funciona</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              En tres simples pasos podrás resolver tus consultas legales inmobiliarias.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-700 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Realiza tu Consulta</h3>
              <p className="mt-2 text-gray-600">
                Selecciona el área de tu interés y detalla tu consulta legal. Primera consulta es gratuita.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-700 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Recibe Asesoría</h3>
              <p className="mt-2 text-gray-600">
                Nuestros expertos analizan tu caso y te brindan una respuesta en menos de 15 minutos.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-700 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="mt-6 text-xl font-bold text-gray-900">Agenda si necesitas más</h3>
              <p className="mt-2 text-gray-600">
                Si requieres un análisis más profundo, agenda una cita virtual con nuestros abogados.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Plans Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Nuestros Planes</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Escoge el plan que mejor se adapte a tus necesidades.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105 duration-300">
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-bold text-gray-900">Gratuito</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Siempre disponible</span>
                </div>
                <p className="mt-4 text-center text-gray-600">Prueba nuestro servicio sin costo.</p>
                <div className="mt-6 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                </div>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">1 consulta gratuita</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">1 especialidad a elección</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Respuesta en 15 minutos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Acceso al chatbot legal</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <Link
                  to="/consultation"
                  className="block w-full px-4 py-2 text-center font-medium rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300"
                >
                  Comenzar ahora
                </Link>
              </div>
            </div>

            {/* Eventual Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-blue-200 relative transition-transform hover:scale-105 duration-300">
              <div className="absolute top-0 right-0 bg-amber-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-lg">
                POPULAR
              </div>
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-bold text-gray-900">Eventual</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Por consulta</span>
                </div>
                <p className="mt-4 text-center text-gray-600">Para consultas ocasionales.</p>
                <div className="mt-6 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">$49.900</span>
                </div>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Cita virtual de 30 minutos</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Hasta 2 especialidades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Recomendación por escrito</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Prioridad en agenda</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <Link
                  to="/payment"
                  className="block w-full px-4 py-2 text-center font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors duration-300"
                >
                  Seleccionar
                </Link>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-transform hover:scale-105 duration-300">
              <div className="px-6 py-8">
                <h3 className="text-center text-2xl font-bold text-gray-900">Premium</h3>
                <div className="mt-4 flex justify-center">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Mensual</span>
                </div>
                <p className="mt-4 text-center text-gray-600">Para necesidades continuas.</p>
                <div className="mt-6 text-center">
                  <span className="text-4xl font-extrabold text-gray-900">$199.900</span>
                  <span className="text-gray-600">/mes</span>
                </div>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">1 hora semanal de consultas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Todas las especialidades</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Consultas ilimitadas</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">Revisión de documentos</span>
                  </li>
                </ul>
              </div>
              <div className="px-6 py-4 bg-gray-50">
                <Link
                  to="/payment"
                  className="block w-full px-4 py-2 text-center font-medium rounded-md bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-300"
                >
                  Seleccionar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-20 sm:px-6 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para resolver tus dudas legales?</span>
            <span className="block text-amber-400">Comienza hoy mismo con tu consulta gratuita.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/register"
                className="px-5 py-3 text-base font-medium rounded-md text-blue-800 bg-white hover:bg-gray-100 transition-colors duration-300"
              >
                Registrarse
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                to="/consultation"
                className="px-5 py-3 text-base font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 transition-colors duration-300"
              >
                Consulta Gratis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;