
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brandPurple text-brandYellow py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex flex-col items-center">
          <p className="mb-4">© {currentYear} Alberson Radiadores. Todos os direitos reservados.</p>
          <Link 
            to="/register" 
            className="flex items-center gap-2 text-brandYellow hover:text-white transition-colors underline text-sm group"
          >
            <span>Cadastro de Usuário</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-x-1 transition-transform"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          
          <div className="mt-6 pt-6 border-t border-brandPurpleLight/30 w-full">
            <p className="text-xs text-brandYellow/70">
              Desenvolvido com ❤️ para Alberson Radiadores
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
