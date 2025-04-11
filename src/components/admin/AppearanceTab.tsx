
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AppearanceTab = () => {
  const { toast } = useToast();
  const [brandPurple, setBrandPurple] = useState('#6A3AB2');
  const [brandYellow, setBrandYellow] = useState('#FFD143');

  useEffect(() => {
    // Load colors
    const savedPurple = localStorage.getItem('siteBrandPurple') || '#6A3AB2';
    const savedYellow = localStorage.getItem('siteBrandYellow') || '#FFD143';
    setBrandPurple(savedPurple);
    setBrandYellow(savedYellow);
  }, []);

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

  return (
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
  );
};

export default AppearanceTab;
