import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>; // Affiche un message de chargement
  }

  if (!user) {
    return <Navigate to="/Connexion" replace />; // Redirige vers la page de connexion si l'utilisateur n'est pas connecté
  }

  return children;
};

export default ProtectedRoute;
