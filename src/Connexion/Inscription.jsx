import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './Inscription.css';
import Urlconfig from '../../urlConfig'; // Importer la configuration URL

function Inscription() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const MDPVerif = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setErrorMessage('Le mot de passe doit faire au moins 6 caractères');
      return false;
    }
    if (!hasUpperCase) {
      setErrorMessage('Le mot de passe doit contenir au moins une lettre majuscule');
      return false;
    }
    if (!hasLowerCase) {
      setErrorMessage('Le mot de passe doit contenir au moins une lettre minuscule');
      return false;
    }
    if (!hasNumber) {
      setErrorMessage('Le mot de passe doit contenir au moins un chiffre');
      return false;
    }
    if (!hasSpecialChar) {
      setErrorMessage('Le mot de passe doit contenir au moins un caractère spécial');
      return false;
    }
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!MDPVerif(password)) {
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas');
      return;
    }
    
    setErrorMessage('');
    setSuccessMessage('');

    // Envoyer le formulaire au backend
    try {
      const response = await fetch(`${Urlconfig.apiBaseUrl}/registerUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage('Inscription réussie !');
        // Réinitialiser les champs du formulaire
        setFullName('');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setErrorMessage('')
      } else {
        const errorData = await response.json();
        setSuccessMessage('');
        setErrorMessage(errorData.message || 'Erreur lors de l\'inscription');
      }
    } catch (error) {
      setErrorMessage('Erreur lors de la connexion au serveur');
    }
  };

  return (
    <div className="container-center show">
      <Card id="Formulaire_Inscription">
        <Card.Body>
          <Card.Title>Inscription</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formFullName">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer votre nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUsername">
              <Form.Label>Nom d'utilisateur</Form.Label>
              <Form.Control
                type="text"
                placeholder="Entrer un nom d'utilisateur"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Entrer l'e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">Votre e-mail ne sera jamais partagé avec quelqu'un d'autre.</Form.Text>
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

            <Form.Group className="mb-3" controlId="formConfirmPassword">
              <Form.Label>Confirmer mot de passe</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <Button variant="primary" type="submit">
              S'inscrire
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Inscription;
