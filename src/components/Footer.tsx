
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brandPurple text-brandYellow py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <p className="mb-4">© {currentYear} Alberson Radiadores. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
