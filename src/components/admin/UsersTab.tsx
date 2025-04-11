
import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

type User = {
  username: string;
  email: string;
  password: string;
};

type NewUserForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const UsersTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState<NewUserForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // Load users
    const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    setUsers(savedUsers);
  }, []);

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
  );
};

export default UsersTab;
