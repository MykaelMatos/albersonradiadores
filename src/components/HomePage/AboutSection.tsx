
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-16">
      <div className="section-container">
        <h2 className="section-title">Sobre Nós</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg mb-8">
            Somos a única empresa da região do Cariri especializada em radiadores de veículos de linha leve.
          </p>
          <div className="mt-10">
            <button className="btn-secondary text-xl">
              Queremos você como nosso parceiro comercial!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
