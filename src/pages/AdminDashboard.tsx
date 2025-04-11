
import React, { useState, useEffect, useRef } from 'react';
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
import { X, Plus, Upload, Image as ImageIcon, User, Palette } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [services, setServices] = useState<Service[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [newImage, setNewImage] = useState('');
  const [newHeroImage, setNewHeroImage] = useState('');
  const [activeTab, setActiveTab] = useState<'content' | 'users' | 'appearance'>('content');
  const [logoUrl, setLogoUrl] = useState<string>('');
  const [brandPurple, setBrandPurple] = useState('#6A3AB2');
  const [brandYellow, setBrandYellow] = useState('#FFD143');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const heroFileInputRef = useRef<HTMLInputElement>(null);
  const logoFileInputRef = useRef<HTMLInputElement>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }

    // Load data
    setServices(loadServices());
    setHeroImages(loadHeroImages());
    
    // Load logo
    const savedLogo = localStorage.getItem('siteLogoUrl') || '';
    setLogoUrl(savedLogo);
    
    // Load colors
    const savedPurple = localStorage.getItem('siteBrandPurple') || '#6A3AB2';
    const savedYellow = localStorage.getItem('siteBrandYellow') || '#FFD143';
    setBrandPurple(savedPurple);
    setBrandYellow(savedYellow);
    
    // Load users
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsers(savedUsers);
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
  
  const saveColors = () => {
    localStorage.setItem('siteBrandPurple', brandPurple);
    localStorage.setItem('siteBrandYellow', brandYellow);
    
    // Add CSS variables to the document
    document.documentElement.style.setProperty('--brand-purple', brandPurple);
    document.documentElement.style.setProperty('--brand-yellow', brandYellow);
    
    toast({
      title: "Cores salvas",
      description: "As novas cores foram aplicadas ao site",
    });
  };
  
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newUser.password !== newUser.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não correspondem",
        variant: "destructive",
      });
      return;
    }
    
    // Check if username or email already exists
    const userExists = users.some(
      (user) => user.username === newUser.username || user.email === newUser.email
    );
    
    if (userExists) {
      toast({
        title: "Erro de Registro",
        description: "Nome de usuário ou e-mail já cadastrado",
        variant: "destructive",
      });
      return;
    }
    
    // Add new user
    const updatedUsers = [...users, {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    }];
    
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    // Reset form
    setNewUser({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    
    toast({
      title: "Usuário adicionado",
      description: "O novo usuário foi cadastrado com sucesso",
    });
  };
  
  const removeUser = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers.splice(index, 1);
    setUsers(updatedUsers);
    localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    
    toast({
      title: "Usuário removido",
      description: "O usuário foi removido com sucesso",
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
        
        <div className="mb-6">
          <div className="flex border-b border-gray-200 mb-4">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'content' ? 'border-b-2 border-brandPurple text-brandPurple' : 'text-gray-500'}`}
              onClick={() => setActiveTab('content')}
            >
              <ImageIcon className="inline mr-2" size={18} /> Conteúdo
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'border-b-2 border-brandPurple text-brandPurple' : 'text-gray-500'}`}
              onClick={() => setActiveTab('users')}
            >
              <User className="inline mr-2" size={18} /> Usuários
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'appearance' ? 'border-b-2 border-brandPurple text-brandPurple' : 'text-gray-500'}`}
              onClick={() => setActiveTab('appearance')}
            >
              <Palette className="inline mr-2" size={18} /> Aparência
            </button>
          </div>
        </div>
        
        {activeTab === 'content' && (
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
        )}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6 text-brandPurple">Gerenciar Usuários</h3>
            
            <div className="mb-8">
              <h4 className="font-semibold text-lg mb-4">Usuários Existentes</h4>
              {users.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b text-left">Usuário</th>
                        <th className="py-2 px-4 border-b text-left">Email</th>
                        <th className="py-2 px-4 border-b text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="py-2 px-4 border-b">{user.username}</td>
                          <td className="py-2 px-4 border-b">{user.email}</td>
                          <td className="py-2 px-4 border-b text-right">
                            <button
                              onClick={() => removeUser(index)}
                              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm"
                            >
                              Remover
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500">Nenhum usuário registrado.</p>
              )}
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Adicionar Novo Usuário</h4>
              <form onSubmit={handleAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome de Usuário
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="bg-brandPurple text-white py-2 px-6 rounded hover:bg-brandPurpleLight"
                  >
                    Adicionar Usuário
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {activeTab === 'appearance' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold mb-6 text-brandPurple">Personalizar Aparência</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Principal (Roxo)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={brandPurple}
                    onChange={(e) => setBrandPurple(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brandPurple}
                    onChange={(e) => setBrandPurple(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Cor utilizada em fundos e botões</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cor Secundária (Amarelo)
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={brandYellow}
                    onChange={(e) => setBrandYellow(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={brandYellow}
                    onChange={(e) => setBrandYellow(e.target.value)}
                    className="flex-1 p-2 border rounded"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">Cor utilizada em textos e detalhes</p>
              </div>
            </div>
            
            <div className="mt-8">
              <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h4 className="font-semibold mb-2">Pré-visualização</h4>
                <div className="flex flex-col space-y-4">
                  <div className="p-4 rounded" style={{ backgroundColor: brandPurple }}>
                    <p className="font-medium" style={{ color: brandYellow }}>Texto em cor secundária sobre fundo primário</p>
                  </div>
                  <div className="p-4 rounded" style={{ backgroundColor: brandYellow }}>
                    <p className="font-medium" style={{ color: brandPurple }}>Texto em cor primária sobre fundo secundário</p>
                  </div>
                  <button 
                    className="py-2 px-4 rounded" 
                    style={{ backgroundColor: brandPurple, color: brandYellow }}
                  >
                    Botão com Cores Personalizadas
                  </button>
                </div>
              </div>
              
              <button
                onClick={saveColors}
                className="bg-brandPurple text-white py-2 px-6 rounded hover:bg-brandPurpleLight"
              >
                Salvar Cores
              </button>
            </div>
          </div>
        )}
        
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
