
import React from 'react';

type AdminNavbarProps = {
  username: string | undefined;
  onLogout: () => void;
};

const AdminNavbar = ({ username, onLogout }: AdminNavbarProps) => {
  return (
    <nav className="bg-brandPurple p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        <div className="flex items-center space-x-4">
          <span>Olá, {username}</span>
          <button
            onClick={onLogout}
            className="px-4 py-1 bg-white text-brandPurple rounded hover:bg-gray-100"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
