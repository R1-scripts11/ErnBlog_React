import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Interface() {
    const navigate = useNavigate(); // Utilisation du hook useNavigate

    const handleEdit = (path) => {
        navigate(path);
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Admin Interface</h1>
            <Row>
                <Col md={6} lg={3} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>User</Card.Title>
                            <Card.Text>
                                Manage users of the blog.
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleEdit('/Users')}>Edit</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} lg={3} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Catégories</Card.Title>
                            <Card.Text>
                                Manage blog categories.
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleEdit('/manage-categories')}>Edit</Button>
                        </Card.Body>
                    </Card>
                </Col>
                {/* <Col md={6} lg={3} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Tags</Card.Title>
                            <Card.Text>
                                Manage blog tags.
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleEdit('/manage-tags')}>Edit</Button>
                        </Card.Body>
                    </Card>
                </Col> */}
                <Col md={6} lg={3} className="mb-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Articles</Card.Title>
                            <Card.Text>
                                Manage blog articles.
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleEdit('/createArticle')}>Edit</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Interface;
