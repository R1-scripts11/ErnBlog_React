import React, { useEffect } from 'react';
import './NavBar1.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Search, PersonFillAdd, PersonFill,BoxArrowInRight, GridFill  } from 'react-bootstrap-icons';
import { useAuth } from '../AuthContext';
import { Link } from 'react-router-dom';

function NavBar1() {
    const { user, logoutUser  } = useAuth();
    //console.log('Current user:', user); // Ajout d'un log pour vérifier l'état de l'utilisateur
    if (user) {
        //console.log('User role:', user.role); // Ajout d'un log pour vérifier le rôle de l'utilisateur
    }
    useEffect(() => {
        // Fonction pour mettre à jour le padding-top du contenu principal en fonction de la hauteur de la navbar
        const updatePadding = () => {
            const navbar = document.getElementById('navbar'); // Sélectionne l'élément avec l'ID 'navbar'
            const mainContent = document.getElementById('main-content'); // Sélectionne l'élément avec l'ID 'main-content'
            if (navbar && mainContent) {
                // Si les deux éléments existent
                mainContent.style.paddingTop = `${navbar.offsetHeight}px`; // Définit le padding-top du contenu principal à la hauteur de la navbar
                //console.log(`${navbar.offsetHeight}px`);
            }
        };
        // Met à jour initialement le padding
        updatePadding();
        // Met à jour le padding lorsque la fenêtre est redimensionnée
        window.addEventListener('resize', updatePadding);
        // Nettoie l'écouteur d'événements lorsque le composant est démonté pour éviter les fuites de mémoire
        return () => {
            window.removeEventListener('resize', updatePadding);
        };
    }, [user]); // Dépendance sur user pour ré-rendre lorsque user change



    return (
        <Navbar id="navbar" expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">ErnBlog</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {user && user.role === 'admin' && (
                            <Nav.Link as={Link} to="/interface"><GridFill/> Interface</Nav.Link>
                        )}
                        {/* <Nav.Link href="#action2">Développement</Nav.Link>
                        <Nav.Link href="#action2">Réseaux</Nav.Link>
                        <Nav.Link href="#action2">Management</Nav.Link>
                        <NavDropdown title="Sport" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Boxe</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Grappling</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">MMA</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
                        </NavDropdown> */}
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-secondary"><Search color="secondary" /></Button>
                    </Form>
                    
                    <Nav>
                        {user ? (
                            
                            <>

                                <Nav.Link as={Link} to="/Profil"><PersonFill /> {user.username}</Nav.Link>               
                                <Nav.Link onClick={logoutUser} >Déconnexion<BoxArrowInRight /></Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/Inscription"><PersonFillAdd /> S'inscrire</Nav.Link>
                                <Nav.Link as={Link} to="/Connexion" ><PersonFill /> Se connecter</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar1;
