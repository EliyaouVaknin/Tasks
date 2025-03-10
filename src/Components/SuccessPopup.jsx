import React from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';

export default function SuccessPopup({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registration Successful 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You have successfully registered! You can now log in.</p>
                <Container fluid className="d-flex align-items-center justify-content-center text-center pt-3">
                    <Row>
                        <Col>
                            <Button style={{ backgroundColor: '#60AE6D', color: '#fff', border: 'none' }} onClick={onHide}>
                                OK
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
        </Modal>
    );
}
