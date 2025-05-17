import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Calendar, CreditCard, User, FileText, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mocked data for the dashboard
  const consultations = [
    { id: 1, type: 'Predial', status: 'Respondida', date: '2023-10-15', summary: 'Consulta sobre impuesto predial' },
    { id: 2, type: 'Contractual', status: 'Pendiente', date: '2023-10-20', summary: 'Revisión de contrato de arrendamiento' }
  ];

  const appointments = [
    { id: 1, date: '2023-10-25', time: '10:00', specialist: 'Dr. García', status: 'Confirmada' }
  ];

  const subscription = {
    plan: 'Gratuito',
    status: 'Activo',
    nextBilling: 'N/A',
    features: ['1 consulta gratuita', 'Chatbot legal']
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-blue-800 text-white pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-serif">Dashboard</h1>
          <p className="mt-2 text-blue-100">Bienvenido, {user?.name}</p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 - Consultations */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="p-5 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Consultas</h3>
                <MessageSquare className="h-8 w-8 opacity-75" />
              </div>
              <p className="text-3xl font-bold mt-2">{consultations.length}</p>
            </div>
            <div className="p-4">
              <Link to="/consultation" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                Nueva consulta
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 2 - Appointments */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="p-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Citas</h3>
                <Calendar className="h-8 w-8 opacity-75" />
              </div>
              <p className="text-3xl font-bold mt-2">{appointments.length}</p>
            </div>
            <div className="p-4">
              <Link to="/appointments" className="text-amber-600 hover:text-amber-800 text-sm font-medium flex items-center">
                Agendar cita
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 3 - Subscription */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="p-5 bg-gradient-to-r from-green-500 to-green-700 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Plan</h3>
                <CreditCard className="h-8 w-8 opacity-75" />
              </div>
              <p className="text-3xl font-bold mt-2">{subscription.plan}</p>
            </div>
            <div className="p-4">
              <Link to="/payment" className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                Actualizar plan
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Card 4 - Profile */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-lg">
            <div className="p-5 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Perfil</h3>
                <User className="h-8 w-8 opacity-75" />
              </div>
              <p className="text-lg mt-2 truncate">{user?.email}</p>
            </div>
            <div className="p-4">
              <button className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                Editar perfil
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Consultations */}
        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Consultas Recientes</h3>
            </div>
          </div>
          {consultations.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resumen
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {consultations.map((consultation) => (
                    <tr key={consultation.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {consultation.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {consultation.summary}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(consultation.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          consultation.status === 'Respondida' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {consultation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900">Ver detalle</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-sm text-gray-500">No tienes consultas recientes.</p>
              <div className="mt-3">
                <Link
                  to="/consultation"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Crear consulta
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Próximas Citas</h3>
            </div>
          </div>
          {appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hora
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Especialista
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(appointment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.specialist}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Ver detalle</button>
                        <button className="text-red-600 hover:text-red-900">Cancelar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-sm text-gray-500">No tienes citas programadas.</p>
              <div className="mt-3">
                <Link
                  to="/appointments"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Agendar cita
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Subscription Details */}
        <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Detalles de Suscripción</h3>
            </div>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Plan Actual</dt>
                <dd className="mt-1 text-sm text-gray-900">{subscription.plan}</dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Estado</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {subscription.status}
                  </span>
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Próximo Cobro</dt>
                <dd className="mt-1 text-sm text-gray-900">{subscription.nextBilling}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-sm font-medium text-gray-500">Características</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <ul className="list-disc pl-5 space-y-1">
                    {subscription.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-6">
              <Link
                to="/payment"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Actualizar Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;