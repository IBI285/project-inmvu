import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

// Predefined responses based on keywords
const predefinedResponses: Record<string, string> = {
  predial: "El impuesto predial es un tributo que deben pagar los propietarios de bienes inmuebles. Si necesitas asesoría especializada sobre este tema, te recomendamos agendar una cita con nuestros expertos.",
  alquiler: "Los contratos de alquiler o arrendamiento deben cumplir ciertos requisitos legales. Para una revisión detallada de tu contrato o situación, considera adquirir nuestro plan de asesoría.",
  sucesión: "Los procesos sucesorales pueden ser complejos y requieren un análisis detallado de cada caso. Nuestros especialistas pueden guiarte en este proceso si agendas una cita.",
  demanda: "Antes de iniciar un proceso legal, es importante analizar todas las opciones disponibles. Te recomendamos agendar una consulta para evaluar tu caso específico.",
  contrato: "Los contratos inmobiliarios deben cumplir requisitos específicos para ser válidos. Si necesitas revisar o elaborar un contrato, nuestro equipo legal puede ayudarte con un análisis profesional.",
  hipoteca: "Las hipotecas son garantías reales que implican obligaciones específicas. Para entender las implicaciones de tu caso particular, te recomendamos una consulta especializada.",
  default: "Gracias por tu consulta. Para recibir asesoría legal personalizada sobre este tema, te recomendamos utilizar nuestro servicio de consulta gratuita o agendar una cita con nuestros especialistas."
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "¡Hola! Soy el asistente legal de LegalInmo. ¿En qué puedo ayudarte hoy?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const findResponseForKeywords = (text: string): string => {
    const lowercaseText = text.toLowerCase();
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowercaseText.includes(keyword)) {
        return response;
      }
    }
    
    return predefinedResponses.default;
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    
    // Simulate bot thinking
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: findResponseForKeywords(userMessage.text),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
    }, 1000);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-blue-700 text-white rounded-full p-4 shadow-lg hover:bg-blue-800 transition-colors duration-300 z-50"
      >
        <MessageSquare className="h-6 w-6" />
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
        isMinimized ? 'h-14' : 'h-96'
      }`}
    >
      {/* Header */}
      <div className="bg-blue-700 text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          <h3 className="font-medium">Asistente Legal</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={toggleMinimize} className="text-white hover:text-blue-200">
            {isMinimized ? <ChevronUp className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
          </button>
          <button onClick={toggleChat} className="text-white hover:text-blue-200">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Container */}
          <div className="p-3 h-64 overflow-y-auto bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className={`text-xs mt-1 block ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="bg-white border-t border-gray-200 p-3">
            <form onSubmit={handleSendMessage} className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Escribe tu consulta legal..."
                className="flex-1 py-2 px-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-700 text-white py-2 px-4 rounded-r-md hover:bg-blue-800 transition-colors duration-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default ChatBot;