import React, { useState } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import { deleteGenero } from '../../services/generosServices';
import { deleteEditora } from '../../services/editorasServices';
import { deleteAutores } from '../../services/autoresServices';
import { deleteLivros } from '../../services/livrosServices';
import { deleteClientes } from '../../services/clientesServices';
import { deleteEstoque } from '../../services/estoqueServices';
import { deleteEmprestimos } from '../../services/emprestimosServices';

const DeleteModal = ({ show, handleClose, onSuccess, type, data }) => {
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const handleSubmit = async () => {

        if (!data || !data.id) {
            console.error("Dados inválidos:", data);
            return;
        }

        try {
            if (type === 'gênero') {
                await deleteGenero(data.id);
            }
            if (type === 'editora') {
                await deleteEditora(data.id);
            }
            if (type === 'autor') {
                await deleteAutores(data.id);
            }
            if (type === 'livro') {
                await deleteLivros(data.id);
            }
            if (type === 'cliente') {
                await deleteClientes(data.id);
            }
            if (type === 'estoque') {
                await deleteEstoque(data.id);
            }
            if (type === 'emprestimo') {
                await deleteEmprestimos(data.id);
            }
            setToastMessage(`${type} deletado com sucesso.`);
            setToastVariant('success');
            setShowToast(true);
            handleClose();
            onSuccess();
            setTimeout(() => {
            }, 3300);
        } catch (error) {
            console.error("Erro ao deletar:", error);
            setToastMessage(`Erro ao deletar ${type}.`);
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Deletar {type}</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={handleSubmit}>
                        Deletar
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

export default DeleteModal;
