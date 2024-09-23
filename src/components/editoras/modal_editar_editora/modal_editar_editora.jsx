import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { updateEditora } from '../../../services/editorasServices';

const EditarEditoraModal = ({ show, handleClose, onSuccess, data }) => {
    const [editora, setEditora] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    useEffect(() => {
        if (data) {
            setEditora(data.nome);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            id: data.id,
            nome: editora,
        };

        try {
            await updateEditora(updatedData);
            setToastMessage('Editora editado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            onSuccess();
            handleClose();
            setEditora('');
        } catch (error) {
            console.error("Erro ao editar o editora:", error);
            setToastMessage(error.response.data.nome[0]);
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Editora</Modal.Title>
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
                    <Button variant="primary" onClick={handleSubmit}>
                        Editar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '100' }} 
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

export default EditarEditoraModal;