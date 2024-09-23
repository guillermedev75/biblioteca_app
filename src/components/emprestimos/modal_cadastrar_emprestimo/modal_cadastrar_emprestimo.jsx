import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { fetchClientes } from '../../../services/clientesServices';
import { fetchEstoque } from '../../../services/estoqueServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { createEmprestimos } from '../../../services/emprestimosServices';
import DataInput from '../../input/dataInput';

const CadastrarEmprestimoModal = ({ show, handleClose, onSuccess }) => {

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const [estoques, setEstoques] = useState([]);
    const [selectedEstoque, setSelectedEstoque] = useState('');
    const [clientes, setClientes] = useState([]);
    const [selectedCliente, setSelectedCliente] = useState('');

    const [dataEmprestimo, setDataEmprestimo] = useState('')
    const [dataLimite, setDataLimite] = useState('')

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
          const estoqueData = await fetchEstoque();
          const clientesData = await fetchClientes();
    
          setEstoques(estoqueData); 
          setClientes(clientesData); 
    
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
    };

    useEffect(() => {
        loadData()
    }, []);

    const handleEstoqueChange = (e) => {
        setSelectedEstoque(e.target.value);
        handleCover(estoques.find(estoque => estoque.id == e.target.value).livro.isbn)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const emprestimoData = {
                estoque_id: selectedEstoque,
                cliente_id: selectedCliente,
                data_emprestimo: dataEmprestimo,
                data_limite: dataLimite,
            }

            await createEmprestimos(emprestimoData);
            setToastMessage('Emprestimo cadastrado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            setSelectedEstoque('');
            setSelectedCliente('');
            setDataEmprestimo('');
            setDataLimite('');
            onSuccess();
            handleClose();
        } catch (error) {
            console.error("Erro ao cadastrar o emprestimo:", error);
            setToastMessage("Erro ao cadastrar emprestimo.");
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ zIndex: '10000' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Emprestimo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className='d-flex'>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Livro</Form.Label>
                                <Form.Select
                                aria-label="Default select example"
                                value={selectedEstoque}
                                onChange={(e) => handleEstoqueChange(e)}
                                autoFocus
                                >
                                    <option value="" disabled selected>Selecione um Livro do Estoque</option>
                                    {estoques.map(estoque => (
                                        <option selected key={estoque.id} value={estoque.id}>{estoque.id}-{estoque.livro.titulo}</option>
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
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Clientes</Form.Label>
                            <Form.Select
                            aria-label="Default select example"
                            value={selectedCliente}
                            onChange={(e) => setSelectedCliente(e.target.value)}
                            autoFocus
                            >
                                <option value="" disabled selected>Selecione um Cliente</option>
                                {clientes.map(cliente => (
                                    <option selected key={cliente.id} value={cliente.id}>{cliente.nome}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <DataInput today label='Data Emprestimo' onDataChange={setDataEmprestimo}/>
                        <DataInput nextMonth label='Data Limite' onDataChange={setDataLimite}/>
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

export default CadastrarEmprestimoModal;