
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-brandPurple text-brandYellow py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold text-brandYellow">Alberson Radiadores</h1>
            <p className="text-brandYellowDark mt-1">Especializada em Radiadores</p>
          </div>
          <div>
            <Link to="/admin" className="btn-secondary">
              Área Restrita
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
