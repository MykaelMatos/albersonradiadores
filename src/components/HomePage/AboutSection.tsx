
import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="bg-white py-16">
      <div className="section-container">
        <h2 className="section-title mb-16">Sobre Nós</h2>
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brandPurple/5 to-brandYellow/5 p-8 rounded-2xl shadow-sm border border-brandPurple/10">
            <p className="text-lg mb-8 leading-relaxed">
              Somos a <span className="text-brandPurple font-semibold">única empresa da região do Cariri</span> especializada em radiadores de veículos de linha leve.
            </p>
            <div className="mt-10">
              <button className="btn-secondary text-xl flex mx-auto items-center gap-2 group">
                <span>Queremos você como nosso parceiro comercial!</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <polyline points="16 11 18 13 22 9"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
