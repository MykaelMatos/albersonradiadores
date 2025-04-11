
import React from 'react';
import ServiceSlideshow from '../ServiceSlideshow';
import { Service, loadServices } from '../../data/servicesData';

const ServicesSection = () => {
  const [services, setServices] = React.useState<Service[]>([]);
  
  React.useEffect(() => {
    setServices(loadServices());
  }, []);

  return (
    <section id="services" className="py-16 bg-gray-100">
      <div className="section-container">
        <h2 className="section-title">Nossos Serviços</h2>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <h3 className="text-xl font-bold mb-3 text-brandPurple">{service.title}</h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
                <div className="md:w-1/2">
                  <ServiceSlideshow images={service.images} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-bold mb-3 text-brandPurple">Nossa Garantia</h3>
          <p className="text-gray-700">
            Nossa garantia cobre qualquer falha no reparo "solda" realizado em um prazo de três meses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
