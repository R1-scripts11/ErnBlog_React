import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './Connexion.css';
import { useNavigate } from "react-router-dom";
import Urlconfig from '../../urlConfig'; // Importer la configuration URL
import { useAuth } from '../AuthContext'; // Importer le hook useAuth


function Connexion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Utilisation du hook useNavigate
  const { loginUser } = useAuth(); // Utiliser le hook useAuth pour accéder à loginUser

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${Urlconfig.apiBaseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Connexion réussie !');
         // Met à jour l'état utilisateur dans le contexte
         loginUser({ userId: data.userId, username: data.username, role: data.role });
        // Redirection et autres actions après la connexion réussie
        navigate('/'); // Redirige vers la page d'accueil
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Erreur lors de la connexion');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion au serveur');
    }
  };

  return (
    <div className="container-center-connexion">
      <Card id="Formulaire_Connexion">
        <Card.Body>
          <Card.Title>Connexion</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer l'e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Votre e-mail ne sera jamais partagé avec quelqu'un d'autre.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <Button variant="primary" type="submit">
              Soumettre
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Connexion;
