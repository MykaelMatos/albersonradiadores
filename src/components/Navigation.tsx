
import React from 'react';

const Navigation = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-brandYellow py-4 shadow-md sticky top-0 z-30">
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-4 md:space-x-12">
          <li>
            <button 
              onClick={() => scrollToSection('about')}
              className="nav-link"
            >
              Sobre
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('services')}
              className="nav-link"
            >
              Serviços
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className="nav-link"
            >
              Contato
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
