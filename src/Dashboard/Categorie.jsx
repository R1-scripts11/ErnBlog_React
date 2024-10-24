import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';
import Urlconfig from '../../urlConfig'; // Importer la configuration URL

function CategoryPage() {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newDescription, setNewDescription] = useState(''); // Nouvel état pour la description
    const [editCategoryId, setEditCategoryId] = useState(null);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editCategoryDescription, setEditCategoryDescription] = useState('');
    

    useEffect(() => {
        // Charger les catégories depuis l'API
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/categories`); // Modifier l'URL selon votre backend
            const data = await response.json();
            setCategories(data);
        } catch (error) {
            console.error('Erreur lors du chargement des catégories:', error);
        }
    };

    const handleAddCategory = async () => {
        if (!newCategory) return;
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/addCategorie`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategory, description: newDescription }),
            });
            const data = await response.json();

            setCategories([...categories, data]);
            setNewCategory('');
            setNewDescription('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de la catégorie:', error);
        }
    };

    const handleEditCategory = async (id) => {
        if (!editCategoryName) return;
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/categories/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: editCategoryName, description: editCategoryDescription }),
            });
            const updatedCategory = await response.json();
            console.log('fzpeokfpozejfzef fze fz ef ')
            console.log(updatedCategory)
            console.log(categories)
            setCategories(categories.map(cat => (cat.category_id === id ? updatedCategory : cat)));
            setEditCategoryId(null);
            setEditCategoryName('');
            
        } catch (error) {
            console.error('Erreur lors de la modification de la catégorie:', error);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            await fetch(`${Urlconfig.apiBaseUrl}/delCategories/${id}`, { method: 'DELETE' });
            setCategories(categories.filter(cat => cat.category_id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la catégorie:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Gestion des Catégories</h1>
                <div className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Nouvelle catégorie"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="mb-2"
                    />
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="mb-2"
                    />
                    <Button variant="success" onClick={handleAddCategory}>
                        <PlusCircle /> Ajouter
                    </Button>
                </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {/* <th>ID</th> */}
                        <th>Nom</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.category_id}>
                            {/* <td>{category.id}</td> */}
                            <td>
                                {editCategoryId === category.category_id ? (
                                    <Form.Control
                                        type="text"
                                        value={editCategoryName}
                                        onChange={(e) => setEditCategoryName(e.target.value)}
                                    />
                                ) : (
                                    category.name
                                )}
                            </td>
                            <td>
                                {editCategoryId === category.category_id ? (
                                    <Form.Control
                                        type="text"
                                        value={editCategoryDescription}
                                        onChange={(e) => setEditCategoryDescription(e.target.value)}
                                    />
                                ) : (
                                    category.description
                                )}
                            </td>
                            <td>
                                {editCategoryId === category.category_id ? (
                                    <Button variant="primary" onClick={() => handleEditCategory(category.category_id)}>
                                        Sauvegarder
                                    </Button>
                                ) : (
                                    <Button variant="warning" onClick={() => { setEditCategoryId(category.category_id); setEditCategoryName(category.name);setEditCategoryDescription(category.description) }}>
                                        <PencilSquare /> Éditer
                                    </Button>
                                )}
                                <Button variant="danger" onClick={() => handleDeleteCategory(category.category_id)}>
                                    <Trash /> Supprimer
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CategoryPage;
