
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brandPurple text-brandYellow py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {currentYear} Alberson Radiadores. Todos os direitos reservados.</p>
        <div className="mt-4">
          <Link 
            to="/register" 
            className="text-brandYellow hover:text-white transition-colors underline text-sm"
          >
            Cadastro de Usuário
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
