
import React, { useState, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Service, loadServices, saveServices, loadHeroImages, saveHeroImages } from '@/data/servicesData';
import { X, Plus, Upload, ImageIcon } from 'lucide-react';

const ContentTab = () => {
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');
  const [newHeroImage, setNewHeroImage] = useState('');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setServices(loadServices());
    setHeroImages(loadHeroImages());
    
    // Load logo
    const savedLogo = localStorage.getItem('siteLogoUrl') || '';
    setLogoUrl(savedLogo);
  }, []);

  const handleServiceUpdate = (serviceId: string, field: keyof Service, value: string | string[]) => {
    const updatedServices = services.map(service => 
      service.id === serviceId ? { ...service, [field]: value } : service
    );
    setServices(updatedServices);
    saveServices(updatedServices);
    toast({
      title: "Serviço atualizado",
      description: "As alterações foram salvas com sucesso",
    });
  };

  const addImageToService = (serviceId: string) => {
    if (!newImage) return;
    
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          images: [...service.images, newImage]
        };
      }
      return service;
    });
    
    setServices(updatedServices);
    saveServices(updatedServices);
    setNewImage('');
    toast({
      title: "Imagem adicionada",
      description: "A nova imagem foi adicionada ao serviço",
    });
  };
  
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, serviceId: string) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      
      const updatedServices = services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            images: [...service.images, base64String]
          };
        }
        return service;
      });
      
      setServices(updatedServices);
      saveServices(updatedServices);
      
      toast({
        title: "Imagem adicionada",
        description: "A nova imagem foi adicionada ao serviço",
      });
    };
    reader.readAsDataURL(file);
  };
  
  const handleHeroImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setHeroImages([...heroImages, base64String]);
      saveHeroImages([...heroImages, base64String]);
      
      toast({
        title: "Imagem adicionada",
        description: "A nova imagem foi adicionada ao banner principal",
      });
    };
    reader.readAsDataURL(file);
  };
  
  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setLogoUrl(base64String);
      localStorage.setItem('siteLogoUrl', base64String);
      
      toast({
        title: "Logo atualizada",
        description: "A nova logo foi salva com sucesso",
      });
    };
    reader.readAsDataURL(file);
  };

  const removeImageFromService = (serviceId: string, imageIndex: number) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const newImages = [...service.images];
        newImages.splice(imageIndex, 1);
        return {
          ...service,
          images: newImages
        };
      }
      return service;
    });
    
    setServices(updatedServices);
    saveServices(updatedServices);
    toast({
      title: "Imagem removida",
      description: "A imagem foi removida do serviço",
    });
  };

  const addHeroImage = () => {
    if (!newHeroImage) return;
    
    const updatedImages = [...heroImages, newHeroImage];
    setHeroImages(updatedImages);
    saveHeroImages(updatedImages);
    setNewHeroImage('');
    toast({
      title: "Imagem adicionada",
      description: "A nova imagem foi adicionada ao banner principal",
    });
  };

  const removeHeroImage = (index: number) => {
    const updatedImages = [...heroImages];
    updatedImages.splice(index, 1);
    setHeroImages(updatedImages);
    saveHeroImages(updatedImages);
    toast({
      title: "Imagem removida",
      description: "A imagem foi removida do banner principal",
    });
  };
  
  const removeLogo = () => {
    setLogoUrl('');
    localStorage.removeItem('siteLogoUrl');
    toast({
      title: "Logo removida",
      description: "A logo foi removida com sucesso",
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-brandPurple">Logo do Site</h3>
        
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-40 h-40 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <span className="text-gray-400">Sem logo</span>
            )}
          </div>
          
          <div className="space-y-4">
            <input
              type="file"
              ref={logoFileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              hidden
            />
            <button
              onClick={() => logoFileInputRef.current?.click()}
              className="bg-brandPurple text-white py-2 px-4 rounded hover:bg-brandPurpleLight flex items-center"
            >
              <Upload size={18} className="mr-2" />
              Carregar Logo
            </button>
            
            {logoUrl && (
              <button
                onClick={removeLogo}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 flex items-center"
              >
                <X size={18} className="mr-2" />
                Remover Logo
              </button>
            )}
          </div>
        </div>
      </div>
    
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-brandPurple">Banner Principal</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {heroImages.map((image, index) => (
            <div key={index} className="relative">
              <img 
                src={image} 
                alt={`Banner ${index + 1}`} 
                className="w-full h-40 object-cover rounded"
              />
              <button
                onClick={() => removeHeroImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="url"
              placeholder="URL da nova imagem do banner"
              className="flex-1 p-2 border rounded"
              value={newHeroImage}
              onChange={(e) => setNewHeroImage(e.target.value)}
            />
            <button
              onClick={addHeroImage}
              className="bg-brandPurple text-white py-2 px-4 rounded hover:bg-brandPurpleLight"
            >
              <Plus size={20} />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="file"
              ref={heroFileInputRef}
              onChange={handleHeroImageUpload}
              accept="image/*"
              hidden
            />
            <button
              onClick={() => heroFileInputRef.current?.click()}
              className="w-full bg-brandPurple text-white py-2 px-4 rounded hover:bg-brandPurpleLight flex items-center justify-center"
            >
              <Upload size={18} className="mr-2" />
              Carregar imagem do seu computador
            </button>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título
              </label>
              <input
                type="text"
                value={service.title}
                onChange={(e) => handleServiceUpdate(service.id, 'title', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={service.description}
                onChange={(e) => handleServiceUpdate(service.id, 'description', e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>
            
            <h4 className="font-bold mb-3">Imagens</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {service.images.map((image, index) => (
                <div key={index} className="relative">
                  <img 
                    src={image} 
                    alt={`${service.title} ${index + 1}`} 
                    className="w-full h-40 object-cover rounded"
                  />
                  <button
                    onClick={() => removeImageFromService(service.id, index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="url"
                  placeholder="URL da nova imagem"
                  className="flex-1 p-2 border rounded"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
                <button
                  onClick={() => addImageToService(service.id)}
                  className="bg-brandPurple text-white py-2 px-4 rounded hover:bg-brandPurpleLight"
                >
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e, service.id)}
                  accept="image/*"
                  hidden
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-brandPurple text-white py-2 px-4 rounded hover:bg-brandPurpleLight flex items-center justify-center"
                >
                  <Upload size={18} className="mr-2" />
                  Carregar imagem do seu computador
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentTab;
