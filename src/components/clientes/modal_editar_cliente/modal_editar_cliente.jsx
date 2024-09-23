import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Toast } from 'react-bootstrap';
import { updateClientes } from '../../../services/clientesServices';
import axios from 'axios';

const EditarClientesModal = ({ show, handleClose, onSuccess, data }) => {

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [contato1, setContato1] = useState('');
    const [contato2, setContato2] = useState('');
    const [endereco, setEndereco] = useState('');
    const [numero, setNumero] = useState('');
    const [cep, setCep] = useState('');

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    useEffect(() => {
        if(data){
            setNome(data.nome);
            setSexo(data.sexo);
            setContato1(data.contato1);
            setContato2(data.contato2);
            setEndereco(data.endereco);
            setNumero(data.numero);
            setCep(data.cep);
        }
    }, [data]);

    const handleCepChange = (e) => {
        const input = e.target.value;
        const cepRegex = /^\d{5}-?\d{3}$/

        setCep(input);
        
        if (cepRegex.test(input)) {
            handleEndereco(input);
        }
    }

    const handleEndereco = async (cep) => {
        try {
          const response = await  axios.get(`https://viacep.com.br/ws/${cep}/json/`)
          console.log(response);
          setEndereco(response.data.logradouro)
      } catch (error) {
          throw error;
      }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const clienteData = {
                id: data.id,
                nome,
                sexo,
                contato1,
                contato2,
                endereco,
                numero,
                cep
            }

            await updateClientes(clienteData);
            setToastMessage('Cliente cadastrado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            setNome('');
            setSexo('');
            setContato1('');
            setContato2('');
            setEndereco('');
            setCep('');
            setNumero('');
            onSuccess();
            handleClose();
        } catch (error) {
            console.error("Erro ao cadastrar o cliente:", error);
            setToastMessage("Erro ao cadastrar cliente.");
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} style={{ zIndex: '10000' }}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: José, Pedro, Antonio"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Sexo</Form.Label>
                            <Form.Select
                            aria-label="Default select example"
                            value={sexo}
                            onChange={(e) => setSexo(e.target.value)}
                            autoFocus
                            > 
                                <option value="" disabled selected>Selecione o sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </Form.Select>
                            <Form.Label>Contato1</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Pedro@email.com, 2198745632"
                                value={contato1}
                                onChange={(e) => setContato1(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Contato2</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Pedro@email.com, 2198745632"
                                value={contato2}
                                onChange={(e) => setContato2(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Codigo Postal</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: 25075341"
                                value={cep}
                                onChange={(e) => handleCepChange(e)}
                                autoFocus
                            />
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Avenida dos Tomates"
                                value={endereco}
                                onChange={(e) => setEndereco(e.target.value)}
                                autoFocus
                            />
                            <Form.Label>Número</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: 235"
                                value={numero}
                                onChange={(e) => setNumero(e.target.value)}
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

export default EditarClientesModal;