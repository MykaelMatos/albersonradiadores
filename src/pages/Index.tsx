
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AboutSection from '@/components/HomePage/AboutSection';
import ServicesSection from '@/components/HomePage/ServicesSection';
import ContactSection from '@/components/HomePage/ContactSection';
import HeroSlideshow from '@/components/HeroSlideshow';
import { heroImages, loadHeroImages } from '@/data/servicesData';

const Index = () => {
  const [heroSlides, setHeroSlides] = useState<string[]>([]);
  
  useEffect(() => {
    // Load hero images from storage or use default
    setHeroSlides(loadHeroImages());
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4">
          <div className="mt-6">
            <HeroSlideshow images={heroSlides} />
          </div>
        </div>
        
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
