import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';
import '../Styles/LoginPopup.css';

export default function LoginPopup({ show, onHide, handleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setsIsLoading] = useState(false)
    const [error, setError] = useState('');

    useEffect(() => {
        if (!show) {
            setEmail('');
            setPassword('');
            setError('');
        }
    }, [show]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await handleLogin(email, password);
        setError('');
        if (res) {
            setError(res);
        }
    };

    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Container fluid className="d-flex align-items-center justify-content-center text-center pt-3">
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit">
                                        {isLoading ? 'Loading...' : 'Login'}
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
