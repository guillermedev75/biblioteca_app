import React, { useState } from 'react';
import { Modal, Button, Toast, Form } from 'react-bootstrap';
import DataInput from '../../input/dataInput';
import { restoreEmprestimo } from '../../../services/emprestimosServices';

const ModalDevolucaoEmprestimo = ({ show, handleClose, onSuccess, data }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');
    const [dataDevolucao, setDataDevolucao] = useState('');

    const handleSubmit = async () => {

        const emprestimoData = {
            id: data.id,
            data_devolucao: dataDevolucao
        }

        try {
            await restoreEmprestimo(emprestimoData)
            setToastMessage(`Emprestimo devolvido com sucesso.`);
            setToastVariant('success');
            setShowToast(true);
            handleClose();
            onSuccess();
            setTimeout(() => {
            }, 3300);
        } catch (error) {
            console.error("Erro ao devolver:", error);
            setToastMessage(`Erro ao devolver.`);
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Devolver Emprestimo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <DataInput today label='Data Devolução' onDataChange={setDataDevolucao} />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Devolver
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

export default ModalDevolucaoEmprestimo;
