
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check for saved user in localStorage on mount
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Hard-coded admin credentials for demo purposes
    // In a real app, this would validate against a backend
    if (username === "Mykaelmatos" && password === "Mkm201015") {
      const adminUser = {
        username: "Mykaelmatos",
        email: "mykael.mcarvalho@gmail.com",
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem("user", JSON.stringify(adminUser));
      return true;
    }
    
    // Check other registered users (would come from a database in a real app)
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]");
    const matchedUser = registeredUsers.find(
      (u: any) => u.username === username && u.password === password
    );
    
    if (matchedUser) {
      const loggedInUser = {
        username: matchedUser.username,
        email: matchedUser.email,
        isAdmin: false
      };
      setUser(loggedInUser);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
