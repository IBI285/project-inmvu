import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scale, Send, AlertCircle, CheckCircle } from 'lucide-react';

const specialties = [
  { id: 'predial', name: 'Predial' },
  { id: 'notarial', name: 'Notarial' },
  { id: 'sucesoral', name: 'Sucesoral' },
  { id: 'tributario', name: 'Tributario' },
  { id: 'contractual', name: 'Contractual' },
  { id: 'legal', name: 'Legal General' },
  { id: 'contable', name: 'Contable' }
];

const Consultation: React.FC = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState<'free' | 'paid'>('free');
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSpecialtyToggle = (specialtyId: string) => {
    if (selectedSpecialties.includes(specialtyId)) {
      setSelectedSpecialties(selectedSpecialties.filter(id => id !== specialtyId));
    } else {
      // For free consultation, only allow one specialty
      if (consultationType === 'free' && selectedSpecialties.length >= 1) {
        setSelectedSpecialties([specialtyId]);
      } 
      // For paid consultation, allow up to 2 specialties
      else if (consultationType === 'paid' && selectedSpecialties.length >= 2) {
        setSelectedSpecialties([...selectedSpecialties.slice(1), specialtyId]);
      } else {
        setSelectedSpecialties([...selectedSpecialties, specialtyId]);
      }
    }
  };

  const handleConsultationTypeChange = (type: 'free' | 'paid') => {
    setConsultationType(type);
    // If switching to free and have more than one specialty selected,
    // keep only the first one
    if (type === 'free' && selectedSpecialties.length > 1) {
      setSelectedSpecialties([selectedSpecialties[0]]);
    }
  };

  const validateForm = () => {
    if (selectedSpecialties.length === 0) {
      setError('Por favor selecciona al menos una especialidad.');
      return false;
    }
    
    if (!question.trim()) {
      setError('Por favor ingresa tu consulta.');
      return false;
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
      
      if (consultationType === 'free') {
        setSuccess('Tu consulta gratuita ha sido enviada. Responderemos en los próximos 15 minutos.');
      } else {
        // Redirect to payment page
        window.location.href = '/payment';
        return;
      }
      
      // Clear form on success
      setSelectedSpecialties([]);
      setQuestion('');
    } catch (error) {
      setError('Error al enviar la consulta. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-serif">Consultoría Legal</h1>
          <p className="mt-2 text-blue-100">Recibe asesoría legal especializada</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <Scale className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Nueva Consulta</h3>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-4 bg-red-50 border-l-4 border-red-500 p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="mx-6 mt-4 bg-green-50 border-l-4 border-green-500 p-4">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <p className="text-sm text-green-700">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            {/* Consultation Type */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Consulta
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => handleConsultationTypeChange('free')}
                  className={`border rounded-md px-4 py-3 cursor-pointer transition-colors duration-300 ${
                    consultationType === 'free'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Consulta Gratuita</h3>
                      <p className="mt-1 text-xs text-gray-500">1 pregunta, 1 especialidad</p>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => handleConsultationTypeChange('paid')}
                  className={`border rounded-md px-4 py-3 cursor-pointer transition-colors duration-300 ${
                    consultationType === 'paid'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Consulta Paga</h3>
                      <p className="mt-1 text-xs text-gray-500">Hasta 2 especialidades, análisis detallado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alert message based on selection */}
            {consultationType === 'free' ? (
              <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Has seleccionado una consulta gratuita. Responderemos en los próximos 15 minutos.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-amber-700">
                      Has seleccionado un plan pago. Por favor continúa con el pago después de enviar tu consulta.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Specialties */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Especialidad {consultationType === 'paid' && '(hasta 2)'}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {specialties.map((specialty) => (
                  <div
                    key={specialty.id}
                    onClick={() => handleSpecialtyToggle(specialty.id)}
                    className={`border px-3 py-2 rounded-md flex items-center justify-center text-sm cursor-pointer transition-colors duration-300 ${
                      selectedSpecialties.includes(specialty.id)
                        ? 'bg-blue-100 border-blue-500 text-blue-800'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {specialty.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Question */}
            <div className="mb-6">
              <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
                Tu Consulta
              </label>
              <textarea
                id="question"
                name="question"
                rows={4}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Describe tu consulta legal detalladamente..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  consultationType === 'free'
                    ? 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-500'
                    : 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    {consultationType === 'free' ? 'Enviar Consulta' : 'Continuar al Pago'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Previous Consultations Card */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Consultas Anteriores</h3>
          </div>
          <div className="p-4">
            <p className="text-center text-gray-500 py-6">No tienes consultas previas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;