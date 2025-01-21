import React, { createContext, useContext, useState } from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (token: string) => void; // Accept token as parameter
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const signIn = (token: string) => {
    localStorage.setItem("token", token); // Store token in local storage
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
