import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Urlconfig from '../../urlConfig'; // Importer la configuration URL
import { useAuth } from '../AuthContext';

function CreateArticlePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const { user  } = useAuth();

    useEffect(() => {
        // Charger les catégories depuis l'API
        fetchCategories();
        setAuthorId(user.userId)
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories'); // Modifier l'URL selon votre backend
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erreur lors du chargement des catégories:', error);
        }
    };

    const handleCreateArticle = async () => {
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/createArticle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, content, authorId, categoryId }),
            });
            const result = await response.json();
            if (response.ok) {
                alert('Article créé avec succès!');
                // Réinitialiser le formulaire
                setTitle('');
                setContent('');
                setAuthorId('');
                setCategoryId('');
            } else {
                alert('Erreur lors de la création de l\'article: ' + result.error);
            }
        } catch (error) {
            console.error('Erreur lors de la création de l\'article:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Créer un Article</h1>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Titre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez le titre"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Contenu</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Entrez le contenu"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Control
                        as="select"
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        <option value="">Sélectionnez une catégorie</option>
                        {categories.map(category => (
                            <option key={category.category_id} value={category.category_id}>
                                {category.name}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="success" onClick={handleCreateArticle}>
                    Créer l'Article
                </Button>
            </Form>
        </div>
    );
}

export default CreateArticlePage;
