import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function SuccessPopup({ show, onHide }) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registration Successful 🎉</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>You have successfully registered! You can now log in.</p>
                <Button variant="primary" onClick={onHide}>
                    OK
                </Button>
            </Modal.Body>
        </Modal>
    );
}
