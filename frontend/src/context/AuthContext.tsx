import React, { createContext, useContext, useState } from "react";

// Define the shape of the authentication context
interface AuthContextType {
  isAuthenticated: boolean;
  userId: string | null;
  signIn: (token: string, userId: string) => void; // Accept token and userId as parameters
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem("token");
    return token !== null; // Check if token exists
  });

  const [userId, setUserId] = useState<string | null>(null);

  const signIn = (token: string, userId: string) => {
    localStorage.setItem("token", token); // Store token in local storage
    setUserId(userId); // Set the userId in state
    setIsAuthenticated(true);
    localStorage.setItem("userId", userId); // Store userId in local storage

    localStorage.setItem("token", token); // Store token in local storage
    setUserId(userId); // Set the userId in state
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    setUserId(null); // Clear the userId from state
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, signIn, signOut }}>
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
