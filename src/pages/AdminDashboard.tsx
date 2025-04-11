
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AdminNavbar from '@/components/admin/AdminNavbar';
import TabNavigation from '@/components/admin/TabNavigation';
import ContentTab from '@/components/admin/ContentTab';
import UsersTab from '@/components/admin/UsersTab';
import AppearanceTab from '@/components/admin/AppearanceTab';

const AdminDashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'content' | 'users' | 'appearance'>('content');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin');
      return;
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar username={user?.username} onLogout={handleLogout} />

      <main className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Gerenciar Conteúdo</h2>
        
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'users' && <UsersTab />}
        {activeTab === 'appearance' && <AppearanceTab />}
        
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
