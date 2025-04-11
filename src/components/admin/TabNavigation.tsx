
import React from 'react';
import { ImageIcon, User, Palette } from 'lucide-react';

type TabNavigationProps = {
  activeTab: 'content' | 'users' | 'appearance';
  onTabChange: (tab: 'content' | 'users' | 'appearance') => void;
};

const TabNavigation = ({ activeTab, onTabChange }: TabNavigationProps) => {
  return (
    <div className="mb-6">
      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'content' ? 'border-b-2 border-brandPurple text-brandPurple' : 'text-gray-500'}`}
          onClick={() => onTabChange('content')}
        >
          <ImageIcon className="inline mr-2" size={18} /> Conteúdo
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'users' ? 'border-b-2 border-brandPurple text-brandPurple' : 'text-gray-500'}`}
          onClick={() => onTabChange('users')}
        >
          <User className="inline mr-2" size={18} /> Usuários
        </button>
        <button
          className={`px-4 py-2 font-medium ${activeTab === 'appearance' ? 'border-b-2 border-brandPurple text-brandPurple' : 'text-gray-500'}`}
          onClick={() => onTabChange('appearance')}
        >
          <Palette className="inline mr-2" size={18} /> Aparência
        </button>
      </div>
    </div>
  );
};

export default TabNavigation;
