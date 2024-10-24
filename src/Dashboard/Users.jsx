import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PencilSquare, Trash, PlusCircle } from 'react-bootstrap-icons';
import Urlconfig from '../../urlConfig'; // Importer la configuration URL

function Users() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        email: '',
        full_name: '',
        role: 'user'
    });
    const [editUserId, setEditUserId] = useState(null);
    const [editUser, setEditUser] = useState({
        username: '',
        email: '',
        full_name: '',
        role: ''
    });

    useEffect(() => {
        // Charger les utilisateurs depuis l'API
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/users`); // Modifier l'URL selon votre backend
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Erreur lors du chargement des utilisateurs:', error);
        }
    };

    const handleAddUser = async () => {
        if (!newUser.username || !newUser.email) return;
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/addUser`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            const data = await response.json();

            setUsers([...users, data]);
            setNewUser({
                username: '',
                email: '',
                full_name: '',
                role: 'user'
            });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
        }
    };

    const handleEditUser = async (id) => {
        if (!editUser.username || !editUser.email) return;
        try {
            const response = await fetch(`${Urlconfig.apiBaseUrl}/users/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editUser),
            });
            const updatedUser = await response.json();

            setUsers(users.map(user => (user.user_id === id ? updatedUser : user)));
            setEditUserId(null);
            setEditUser({
                username: '',
                email: '',
                full_name: '',
                role: ''
            });
        } catch (error) {
            console.error('Erreur lors de la modification de l\'utilisateur:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await fetch(`${Urlconfig.apiBaseUrl}/delUser/${id}`, { method: 'DELETE' });
            setUsers(users.filter(user => user.user_id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Gestion des Utilisateurs</h1>
            <div className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={newUser.username}
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                    className="mb-2"
                />
                <Form.Control
                    type="email"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="mb-2"
                />
                <Form.Control
                    type="text"
                    placeholder="Nom complet"
                    value={newUser.full_name}
                    onChange={(e) => setNewUser({ ...newUser, full_name: e.target.value })}
                    className="mb-2"
                />
                <Form.Control
                    as="select"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="mb-2"
                >
                    <option value="user">Utilisateur</option>
                    <option value="admin">Administrateur</option>
                </Form.Control>
                <Button variant="success" onClick={handleAddUser}>
                    <PlusCircle /> Ajouter
                </Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nom d'utilisateur</th>
                        <th>Email</th>
                        <th>Nom complet</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.user_id}>
                            <td>
                                {editUserId === user.user_id ? (
                                    <Form.Control
                                        type="text"
                                        value={editUser.username}
                                        onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>
                            <td>
                                {editUserId === user.user_id ? (
                                    <Form.Control
                                        type="email"
                                        value={editUser.email}
                                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>
                                {editUserId === user.user_id ? (
                                    <Form.Control
                                        type="text"
                                        value={editUser.full_name}
                                        onChange={(e) => setEditUser({ ...editUser, full_name: e.target.value })}
                                    />
                                ) : (
                                    user.full_name
                                )}
                            </td>
                            <td>
                                {editUserId === user.user_id ? (
                                    <Form.Control
                                        as="select"
                                        value={editUser.role}
                                        onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                                    >
                                        <option value="user">Utilisateur</option>
                                        <option value="admin">Administrateur</option>
                                    </Form.Control>
                                ) : (
                                    user.role
                                )}
                            </td>
                            <td>
                                {editUserId === user.user_id ? (
                                    <Button variant="primary" onClick={() => handleEditUser(user.user_id)}>
                                        Sauvegarder
                                    </Button>
                                ) : (
                                    <Button variant="warning" onClick={() => {
                                        setEditUserId(user.user_id);
                                        setEditUser({
                                            username: user.username,
                                            email: user.email,
                                            full_name: user.full_name,
                                            role: user.role
                                        });
                                    }}>
                                        <PencilSquare /> Éditer
                                    </Button>
                                )}
                                <Button variant="danger" onClick={() => handleDeleteUser(user.user_id)}>
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

export default Users;
