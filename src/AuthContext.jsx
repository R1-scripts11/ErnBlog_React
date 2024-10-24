import React, { createContext, useState, useEffect, useContext } from 'react';
import Urlconfig from '../urlConfig'; // Importer la configuration URL
import { useNavigate } from 'react-router-dom';

// Crée un contexte d'authentification
const AuthContext = createContext();

// Composant fournisseur pour le contexte d'authentification
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // État pour stocker l'utilisateur authentifié
  const [loading, setLoading] = useState(true); // État pour indiquer le chargement
  const navigate = useNavigate()

  // Fonction pour mettre à jour l'utilisateur après connexion
  const loginUser = (userData) => {
    setUser(userData);
  };

    // Fonction pour déconnecter l'utilisateur
    const logoutUser = async () => {
      try {
        const response = await fetch(`${Urlconfig.apiBaseUrl}/logout`, {
          method: 'POST',
          credentials: 'include',
        });
        if (response.ok) {
          setUser(null);
          navigate('/'); // Redirige vers la page d'accueil
        } else {
          console.error('Erreur lors de la déconnexion');
        }
      } catch (error) {
        console.error('Erreur lors de la déconnexion', error);
      }
    };

  // Effet pour vérifier la session utilisateur lors du montage du composant
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`${Urlconfig.apiBaseUrl}/checkSession`, {
          method: 'GET',
          credentials: 'include', // Assure que les cookies sont envoyés avec la requête
        });

        if (response.ok) {
          const data = await response.json();
          //console.log('Session valid:', data); // Log pour vérifier la réponse
          
        //console.log(data)
          setUser({ userId: data.userId, username: data.username, role: data.role }); // Enregistre l'utilisateur authentifié
        } else {
          console.error('Aucune session trouvée');
        }

      } catch (error) {
        console.error('Erreur lors de la vérification de la session', error);
      } finally {
        setLoading(false); // Arrête le chargement
      }
    };

    checkSession();
  }, []); // Le tableau vide indique que cet effet ne se produit qu'une fois, après le premier rendu

  return (
    // Fournit le contexte d'authentification aux composants enfants
    <AuthContext.Provider value={{ user, loading, loginUser , logoutUser}}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  return useContext(AuthContext);
};
