
import React from 'react';
import { MapPin, Phone, Instagram } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="bg-brandPurple text-white py-16">
      <div className="section-container">
        <h2 className="section-title text-brandYellow">Contato</h2>
        
        <div className="max-w-xl mx-auto">
          <div className="flex items-start mb-6">
            <MapPin className="text-brandYellow mr-3 h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-brandYellow">Endereço</h3>
              <p>Rua Antônia Selma Gomes, nº 02, Parque Recreio, Crato-CE</p>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <Phone className="text-brandYellow mr-3 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-brandYellow">WhatsApp</h3>
              <a 
                href="https://wa.me/5588996182376" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brandYellow transition-colors"
              >
                (88) 99618-2376
              </a>
            </div>
          </div>
          
          <div className="flex items-center mb-6">
            <Instagram className="text-brandYellow mr-3 h-6 w-6 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-semibold text-brandYellow">Instagram</h3>
              <a 
                href="https://www.instagram.com/alberson_radiadores/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-brandYellow transition-colors"
              >
                @alberson_radiadores
              </a>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p>Organização: Alberson Carlos Matos</p>
            <p className="mt-2 text-sm">CNPJ: 35.454.337/0001-53</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
