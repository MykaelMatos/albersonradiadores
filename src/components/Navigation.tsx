
import React, { useState, useEffect } from 'react';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Update nav bar style when scrolled
      setScrolled(window.scrollY > 50);
      
      // Determine which section is currently visible
      const sections = ['about', 'services', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }
      
      setActiveSection(current);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 60,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <nav className={`bg-brandYellow py-4 shadow-md sticky top-0 z-30 transition-all duration-300 ${
      scrolled ? 'py-3 shadow-lg' : 'py-4'
    }`}>
      <div className="container mx-auto">
        <ul className="flex justify-center space-x-4 md:space-x-16">
          <li>
            <button 
              onClick={() => scrollToSection('about')}
              className={`nav-link font-medium ${activeSection === 'about' ? 'after:w-full' : ''}`}
            >
              Sobre
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('services')}
              className={`nav-link font-medium ${activeSection === 'services' ? 'after:w-full' : ''}`}
            >
              Serviços
            </button>
          </li>
          <li>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`nav-link font-medium ${activeSection === 'contact' ? 'after:w-full' : ''}`}
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
