import React, { useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { createEditora } from '../../../services/editorasServices';

const CadastrarEditoraModal = ({ show, handleClose, onSuccess }) => {
    const [editora, setEditora] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createEditora(editora);
            setToastMessage('Editora cadastrado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            onSuccess();
            setEditora('');
            handleClose();
        } catch (error) {
            console.error("Erro ao cadastrar o editora:", error);
            setToastMessage(error.response.data.genero[0]);
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ zIndex: '100000000000000000' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Editora</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Editora</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Panini, V&R, Planeta de Agostini..."
                                value={editora}
                                onChange={(e) => setEditora(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Cadastrar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1000000' }} 
                bg={toastVariant}
                autohide
                delay={3000}
                className='text-white'
            >
                <Toast.Header>
                    <strong className="me-auto">Notificação</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>
        </>
    );
};

export default CadastrarEditoraModal;