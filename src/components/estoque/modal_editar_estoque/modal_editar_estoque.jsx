import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { updateEstoque } from '../../../services/estoqueServices';
import { fetchLivros } from '../../../services/livrosServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const EditarEstoqueModal = ({ show, handleClose, onSuccess, data }) => {

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const [livros, setLivros] = useState([]);
    const [selectedLivro, setSelectedLivro] = useState('');
    const [condicao, setCondicao] = useState('');

    const [cover, setCover] = useState('');

    const handleCover = async (isbn) => {
        try {
          const response = await  axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
          console.log(response);
          response.data[`ISBN:${isbn}`] !== undefined ? setCover(response.data[`ISBN:${isbn}`]['cover']['large']) : setCover(null)
      } catch (error) {
          throw error;
      }
    }

    const loadData = async () => {
        try {
          const livrosData = await fetchLivros();
    
          setLivros(livrosData); 
    
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => {
        if(data){
            setSelectedLivro(data.livro.id);
            setCondicao(data.condicao);
            setCover(data.livro.cover)
        }
    },[data])

    useEffect(() => {
        loadData()
    }, []);

    const handleLivroChange = (e) => {
        setSelectedLivro(e.target.value);
        handleCover(livros.find(livro => livro.id == e.target.value).isbn)

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const estoqueData = {
                id: data.id,
                livro_id: selectedLivro,
                condicao
            }

            await updateEstoque(estoqueData);
            setToastMessage('Estoque editado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            setSelectedLivro('');
            setCondicao('');
            onSuccess();
            handleClose();
        } catch (error) {
            console.error("Erro ao editar o estoque:", error);
            setToastMessage("Erro ao editar estoque.");
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ zIndex: '10000' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Estoque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className='d-flex'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Livro</Form.Label>
                                <Form.Select
                                aria-label="Default select example"
                                value={selectedLivro}
                                onChange={(e) => handleLivroChange(e)}
                                autoFocus
                                >
                                    <option value="" disabled selected>Selecione um Livro</option>
                                    {livros.map(livro => (
                                        <option selected key={livro.id} value={livro.id}>{livro.titulo}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            {!cover ? (
                                <div className='bg-secondary col-md-2 m-2 mx-auto rounded text-white d-flex flex-column justify-content-center' style={{width: '50px', height: 'auto' }}>
                                    <FontAwesomeIcon className='h3 mt-1' icon={faBook} />  
                                </div>
                            ) : (
                                <img className='mx-auto' width='75px' src={cover} alt="Capa do livro" />
                            ) }
                        </div>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Condição</Form.Label>
                            <Form.Select
                            aria-label="Default select example"
                            value={condicao}
                            onChange={(e) => setCondicao(e.target.value)}
                            autoFocus
                            > 
                                <option value="" disabled selected>Selecione a Condição</option>
                                <option value="novo">Novo</option>
                                <option value="gasto">Gasto</option>
                                <option value="velho">Velho</option>
                            </Form.Select>
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

export default EditarEstoqueModal;