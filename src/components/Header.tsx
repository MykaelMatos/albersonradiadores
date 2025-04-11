
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-brandPurple text-brandYellow py-6 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-brandYellow">
              Alberson Radiadores
            </h1>
            <p className="text-brandYellow/80 mt-1 font-light">
              Especializada em Radiadores
            </p>
          </div>
          <div>
            <Link 
              to="/admin" 
              className="btn-secondary flex items-center gap-2 group"
            >
              <span className="group-hover:translate-x-1 transition-transform">
                Área Restrita
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="group-hover:translate-x-1 transition-transform"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
