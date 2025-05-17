import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, AlertCircle, Calendar, Clock, Users, Shield } from 'lucide-react';

const plans = [
  {
    id: 'eventual',
    name: 'Eventual',
    price: 49900,
    description: 'Para consultas ocasionales',
    features: [
      'Cita virtual de 30 minutos',
      'Hasta 2 especialidades',
      'Recomendación por escrito',
      'Prioridad en agenda'
    ]
  },
  {
    id: 'mensual',
    name: 'Mensual',
    price: 199900,
    description: 'Para necesidades continuas',
    features: [
      '1 hora semanal de consultas',
      'Todas las especialidades',
      'Consultas ilimitadas',
      'Revisión de documentos'
    ]
  },
  {
    id: 'anual',
    name: 'Anual',
    price: 1999000,
    description: 'La mejor opción',
    features: [
      '1 día/semana de asesoría',
      'Hasta 2 especialidades',
      'Descuento de 20% vs. plan mensual',
      'Acceso prioritario'
    ]
  }
];

const PaymentMethodCard: React.FC<{
  id: string;
  name: string;
  icon: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}> = ({ id, name, icon, selected, onSelect }) => (
  <div
    onClick={onSelect}
    className={`border rounded-md px-4 py-3 cursor-pointer transition-colors duration-300 ${
      selected
        ? 'border-blue-500 bg-blue-50'
        : 'border-gray-200 hover:border-blue-300'
    }`}
  >
    <div className="flex items-center">
      <div className="flex-shrink-0 mr-3">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
      </div>
    </div>
  </div>
);

const Payment: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState(plans[0].id);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const navigate = useNavigate();

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Apply input masks
    let formattedValue = value;
    
    if (name === 'cardNumber') {
      // Remove non-digit characters and limit to 16 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 16);
      // Add spaces after every 4 digits
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    } else if (name === 'expiryDate') {
      // Remove non-digit characters and limit to 4 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
      // Format as MM/YY
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2);
      }
    } else if (name === 'cvv') {
      // Remove non-digit characters and limit to 3 or 4 digits
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    
    setFormData({
      ...formData,
      [name]: formattedValue
    });
  };

  const validateForm = () => {
    if (paymentMethod === 'creditCard') {
      if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
        setError('Por favor completa todos los campos de la tarjeta.');
        return false;
      }
      
      if (formData.cardNumber.replace(/\s/g, '').length < 16) {
        setError('El número de tarjeta debe tener 16 dígitos.');
        return false;
      }
      
      if (formData.expiryDate.length < 5) {
        setError('La fecha de expiración debe tener el formato MM/YY.');
        return false;
      }
      
      if (formData.cvv.length < 3) {
        setError('El código de seguridad debe tener al menos 3 dígitos.');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const plan = plans.find(p => p.id === selectedPlan);
      
      setSuccess(`Tu pago ha sido procesado. Tu plan ${plan?.name} ha sido activado. ¡Gracias por tu compra!`);
      
      // Clear form
      setFormData({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
      });
      
      // Redirect to dashboard after payment
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      setError('Error al procesar el pago. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-serif">Realizar Pago</h1>
          <p className="mt-2 text-blue-100">Selecciona tu plan y realiza el pago</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              <p className="text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Plan Selection */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Selecciona tu Plan</h3>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    onClick={() => handlePlanChange(plan.id)}
                    className={`border rounded-md px-4 py-4 mb-4 cursor-pointer transition-all duration-300 ${
                      selectedPlan === plan.id
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{plan.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xl font-bold text-gray-900">
                          ${new Intl.NumberFormat('es-CO').format(plan.price / 100)}
                        </span>
                        {plan.id === 'mensual' && <span className="block text-xs text-gray-500">por mes</span>}
                        {plan.id === 'anual' && <span className="block text-xs text-gray-500">por año</span>}
                      </div>
                    </div>

                    <div className="mt-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
                <div className="flex items-center">
                  <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                  <h3 className="text-lg font-medium text-gray-900">Método de Pago</h3>
                </div>
              </div>

              <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <PaymentMethodCard
                    id="creditCard"
                    name="Tarjeta de Crédito"
                    icon={<svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>}
                    selected={paymentMethod === 'creditCard'}
                    onSelect={() => handlePaymentMethodChange('creditCard')}
                  />
                  
                  <PaymentMethodCard
                    id="mercadoPago"
                    name="MercadoPago"
                    icon={<svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                    </svg>}
                    selected={paymentMethod === 'mercadoPago'}
                    onSelect={() => handlePaymentMethodChange('mercadoPago')}
                  />
                </div>

                {paymentMethod === 'creditCard' && (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                        Número de Tarjeta
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre en la Tarjeta
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        placeholder="Juan Pérez"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de Expiración
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                          Código de Seguridad
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-xs text-gray-500">Pago seguro. Tus datos están protegidos con encriptación SSL.</span>
                    </div>
                  </form>
                )}

                {paymentMethod === 'mercadoPago' && (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-600 mb-4">
                      Serás redirigido a MercadoPago para completar tu pago de forma segura.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Summary and Payment Button */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-8">
              <div className="bg-gray-50 px-4 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Resumen del Pedido</h3>
              </div>
              
              <div className="px-4 py-5">
                {selectedPlan && (
                  <>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-gray-600">Plan</span>
                      <span className="text-sm font-medium text-gray-900">
                        {plans.find(p => p.id === selectedPlan)?.name}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Subtotal</span>
                      <span className="text-sm text-gray-900">
                        ${new Intl.NumberFormat('es-CO').format((plans.find(p => p.id === selectedPlan)?.price || 0) / 100)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">IVA (19%)</span>
                      <span className="text-sm text-gray-900">
                        ${new Intl.NumberFormat('es-CO').format(((plans.find(p => p.id === selectedPlan)?.price || 0) * 0.19) / 100)}
                      </span>
                    </div>
                    
                    <div className="border-t border-gray-200 my-4"></div>
                    
                    <div className="flex justify-between mb-4">
                      <span className="text-base font-medium text-gray-900">Total</span>
                      <span className="text-base font-bold text-gray-900">
                        ${new Intl.NumberFormat('es-CO').format(((plans.find(p => p.id === selectedPlan)?.price || 0) * 1.19) / 100)}
                      </span>
                    </div>
                  </>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </>
                  ) : (
                    'Completar Pago'
                  )}
                </button>

                <div className="mt-4 text-center">
                  <Link to="/dashboard" className="text-sm text-blue-600 hover:text-blue-500">
                    Cancelar y volver al dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;