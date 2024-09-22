import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { updateGenero } from '../../../services/generosServices';

const EditarGeneroModal = ({ show, handleClose, onSuccess, data }) => {
    const [genero, setGenero] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    useEffect(() => {
        if (data) {
            setGenero(data.genero);
        }
    }, [data]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = {
            id: data.id,
            genero: genero,
        };

        try {
            await updateGenero(updatedData);
            setToastMessage('Gênero editado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            onSuccess();
            handleClose();
            setGenero('');
        } catch (error) {
            console.error("Erro ao editar o gênero:", error);
            setToastMessage(error.response.data.genero[0]);
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Gênero</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Gênero</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Ação, Aventura, Magia, etc..."
                                value={genero}
                                onChange={(e) => setGenero(e.target.value)}
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

export default EditarGeneroModal;