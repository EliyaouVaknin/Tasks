import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function MainPage({handleLogin}) {
    const [showLogin, setShowLogin] = useState(false);
    const handleLoginShow = () => setShowLogin(true);
    const handleLoginClose = () => setShowLogin(false);

    return (
        <Container fluid className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100">
                <Col xs={12} md={8} lg={6} className="mx-auto">
                    <Card className="shadow-sm">
                        <Card.Body>
                            <h2>Welcome to Task Manager</h2>
                            <p>Please sign in to manage your tasks:</p>
                            <Button onClick={handleLoginShow} variant="primary">
                                Sign In
                            </Button>
                        </Card.Body>
                    </Card>
                    <LoginPopup show={showLogin} onHide={handleLoginClose} handleLogin={handleLogin} />
                </Col>
            </Row>
        </Container>
    );
}
