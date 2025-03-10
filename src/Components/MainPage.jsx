import React, { useState } from 'react';
import LoginPopup from './LoginPopup';
import RegisterPopup from './RegisterPopup';
import SuccessPopup from './SuccessPopup';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function MainPage({handleLogin, handleRegister}) {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleLoginShow = () => setShowLogin(true);
    const handleLoginClose = () => setShowLogin(false);

    const handleRegisterShow = () => setShowRegister(true);
    const handleRegisterClose = () => setShowRegister(false);

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
                            <Button onClick={handleRegisterShow} variant="success">
                                Register
                            </Button>
                        </Card.Body>
                    </Card>
                    <LoginPopup show={showLogin} onHide={handleLoginClose} handleLogin={handleLogin} />
                    <RegisterPopup 
                        show={showRegister} 
                        onHide={handleRegisterClose} 
                        setShowSuccessPopup={setShowSuccessPopup}
                        handleRegister={async (email, password) => {
                            return await handleRegister(email, password);
                        }} 
                    />
                    <SuccessPopup show={showSuccessPopup} onHide={() => setShowSuccessPopup(false)} />
                </Col>
            </Row>
        </Container>
    );
}
