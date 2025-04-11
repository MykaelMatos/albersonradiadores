
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { 
  Service, 
  heroImages as defaultHeroImages, 
  loadServices, 
  saveServices,
  loadHeroImages,
  saveHeroImages
} from '@/data/servicesData';
import { X, Plus } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');
  const [newHeroImage, setNewHeroImage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    // Load data
    setServices(loadServices());
    setHeroImages(loadHeroImages());
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-brandPurple p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          <div className="flex items-center space-x-4">
            <span>Olá, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-1 bg-white text-brandPurple rounded hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Gerenciar Conteúdo</h2>
        
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
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-brandYellow text-brandPurple py-2 px-6 rounded font-semibold hover:bg-brandYellowDark"
          >
            Ver Site
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
