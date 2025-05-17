import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, CheckCircle, AlertCircle, Clock, Users } from 'lucide-react';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

// Available time slots
const timeSlots = [
  '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
];

// Specialists
const specialists = [
  { id: 1, name: 'Dr. Ana García', specialty: 'Derecho Inmobiliario' },
  { id: 2, name: 'Dr. Carlos Rodríguez', specialty: 'Derecho Contractual' },
  { id: 3, name: 'Dr. María López', specialty: 'Derecho Tributario' },
];

const Appointments: React.FC = () => {
  const [date, setDate] = useState<Value>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle date change
  const handleDateChange = (value: Value) => {
    setDate(value);
    setSelectedTime(null); // Reset time when date changes
  };

  // Handle time slot selection
  const handleTimeSelection = (time: string) => {
    setSelectedTime(time);
  };

  // Handle specialist selection
  const handleSpecialistSelection = (id: number) => {
    setSelectedSpecialist(id);
  };

  // Validate form
  const validateForm = () => {
    if (!date) {
      setError('Por favor selecciona una fecha para tu cita.');
      return false;
    }
    
    if (!selectedTime) {
      setError('Por favor selecciona un horario para tu cita.');
      return false;
    }

    if (!selectedSpecialist) {
      setError('Por favor selecciona un especialista.');
      return false;
    }
    
    return true;
  };

  // Handle form submission
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
      
      // Format the date and time to display in the success message
      const selectedDate = date instanceof Date ? date : new Date();
      const formattedDate = format(selectedDate, 'EEEE, d MMMM yyyy', { locale: es });
      
      const specialist = specialists.find(s => s.id === selectedSpecialist);
      
      setSuccess(`Cita programada para ${formattedDate} a las ${selectedTime} con ${specialist?.name}. Se ha enviado un enlace al correo.`);
      
      // Clear form on success
      setDate(new Date());
      setSelectedTime(null);
      setSelectedSpecialist(null);
    } catch (error) {
      setError('Error al agendar la cita. Por favor intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate the minimum allowed date (tomorrow)
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);

  // TileClassName function for custom styling calendar dates
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === 'month') {
      // weekend styling
      const day = date.getDay();
      if (day === 0 || day === 6) {
        return 'bg-gray-100';
      }
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="bg-blue-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold font-serif">Agendar Cita</h1>
          <p className="mt-2 text-blue-100">Agenda una cita virtual con nuestros especialistas</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-5 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Nueva Cita</h3>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Calendar Section */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Selecciona una fecha
                </label>
                <div className="calendar-container">
                  <Calendar
                    onChange={handleDateChange}
                    value={date}
                    minDate={minDate}
                    tileClassName={tileClassName}
                    className="rounded-md shadow-sm border border-gray-300 overflow-hidden"
                  />
                </div>
                
                {/* Available Times */}
                {date && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="inline-block h-4 w-4 mr-1 -mt-1" />
                      Horarios disponibles
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelection(time)}
                          className={`py-2 px-2 text-sm text-center border rounded transition-colors ${
                            selectedTime === time
                              ? 'bg-blue-100 border-blue-500 text-blue-800'
                              : 'border-gray-300 hover:border-blue-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Specialist Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Users className="inline-block h-4 w-4 mr-1 -mt-1" />
                  Selecciona un especialista
                </label>
                <div className="space-y-3">
                  {specialists.map((specialist) => (
                    <div
                      key={specialist.id}
                      onClick={() => handleSpecialistSelection(specialist.id)}
                      className={`border px-4 py-3 rounded-md cursor-pointer transition-colors duration-300 ${
                        selectedSpecialist === specialist.id
                          ? 'bg-blue-50 border-blue-500'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <h4 className="text-sm font-medium">{specialist.name}</h4>
                      <p className="text-xs text-gray-500 mt-1">{specialist.specialty}</p>
                    </div>
                  ))}
                </div>

                {/* Selected Date and Time Summary */}
                {date && selectedTime && (
                  <div className="mt-6 bg-gray-50 p-4 rounded-md border border-gray-200">
                    <h4 className="font-medium text-sm text-gray-700">Resumen de tu cita</h4>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Fecha:</span>{' '}
                        {date instanceof Date ? format(date, 'EEEE, d MMMM yyyy', { locale: es }) : 'Fecha no seleccionada'}
                      </p>
                      <p className="mt-1">
                        <span className="font-medium">Hora:</span> {selectedTime}
                      </p>
                      {selectedSpecialist && (
                        <p className="mt-1">
                          <span className="font-medium">Especialista:</span>{' '}
                          {specialists.find(s => s.id === selectedSpecialist)?.name}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || !date || !selectedTime || !selectedSpecialist}
                    className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSubmitting || !date || !selectedTime || !selectedSpecialist 
                        ? 'opacity-60 cursor-not-allowed' 
                        : ''
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
                      'Confirmar Cita'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Important notes */}
        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Información Importante</h3>
          </div>
          <div className="p-4">
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Las citas virtuales se realizan a través de nuestra plataforma de videollamada.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Recibirás un enlace de acceso en tu correo electrónico antes de la cita.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Puedes cancelar o reprogramar tu cita hasta 3 horas antes del horario agendado.</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>La duración de la cita dependerá del plan contratado (desde 30 minutos hasta 1 hora).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;