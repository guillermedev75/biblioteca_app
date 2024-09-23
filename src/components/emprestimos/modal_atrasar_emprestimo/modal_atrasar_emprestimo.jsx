import React, { useState } from 'react';
import { Modal, Button, Toast, Form } from 'react-bootstrap';
import DataInput from '../../input/dataInput';
import { postergarEmprestimo } from '../../../services/emprestimosServices';

const ModalAtrasarEmprestimo = ({ show, handleClose, onSuccess, data }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
    const [dataLimite, setDataLimite] = useState('');

    const handleSubmit = async () => {

        const emprestimoData = {
            id: data.id,
            data_limite: dataLimite
        }

        try {
            await postergarEmprestimo(emprestimoData)
            setToastMessage(`Emprestimo postergado com sucesso.`);
            setToastVariant('success');
            setShowToast(true);
            handleClose();
            onSuccess();
            setTimeout(() => {
            }, 3300);
        } catch (error) {
            console.error("Erro ao postergar:", error);
            setToastMessage(`Erro ao postergar.`);
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Postergar Emprestimo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <DataInput data={data ? data.data_limite : null} today label='Data Posterior' onDataChange={setDataLimite} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="warning" onClick={handleSubmit}>
                        Postergar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast 
                onClose={() => setShowToast(false)} 
                show={showToast} 
                style={{ position: 'fixed', top: '20px', right: '20px', zIndex: '100' }} 
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

export default ModalAtrasarEmprestimo;
