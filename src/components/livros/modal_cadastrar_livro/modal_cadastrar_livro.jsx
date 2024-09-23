import React, { useEffect, useState } from 'react';
import { InputGroup, Modal, Button, Form, Toast } from 'react-bootstrap';
import axios from 'axios';

import { fetchEditoras } from '../../../services/editorasServices';
import { fetchAutores } from '../../../services/autoresServices';
import { fetchGeneros } from '../../../services/generosServices';
import { createLivros } from '../../../services/livrosServices';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons';
import CadastrarAutoresModal from '../../autores/modal_cadastrar_autor/modal_cadastrar_autor';
import CadastrarEditoraModal from '../../editoras/modal_cadastrar_editora/modal_cadastrar_editora';
import CadastrarGeneroModal from '../../generos/modal_cadastrar_genero/modal_cadastrar_genero';

const CadastrarLivroModal = ({ show, handleClose, onSuccess }) => {
    //Aux
    const [cover, setCover] = useState(process.env.REACT_APP_BASE_COVER_URL);
    //Get data
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [editoras, setEditoras] = useState([]);

    //Form inputs
    const [autoresSelect, setAutoresSelect] = useState('');
    const [generosSelect, setGenerosSelect] = useState([]);
    const [editorasSelect, setEditorasSelect] = useState('');
    const [ano, setAno] = useState('');
    const [titulo, setTitulo] = useState('');
    const [isbn, setIsbn] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVariant, setToastVariant] = useState('success');

    const [showAddAutor, setShowAddAutor] = useState(false);
    const handleCloseAddAutor = () => setShowAddAutor(false);
    const handleShowAddAutor = () => setShowAddAutor(true);

    const [showAddEditora, setShowAddEditora] = useState(false);
    const handleCloseAddEditora = () => setShowAddEditora(false);
    const handleShowAddEditora = () => setShowAddEditora(true);

    const [showAddGenero, setShowAddGenero] = useState(false);
    const handleCloseAddGenero = () => setShowAddGenero(false);
    const handleShowAddGenero = () => setShowAddGenero(true);

    const loadData = async () => {
        try {
          const autoresData = await fetchAutores();
          const generosData = await fetchGeneros();
          const editorasData = await fetchEditoras();
    
          setAutores(autoresData);  
          setGeneros(generosData);  
          setEditoras(editorasData); 
    
        } catch (error) {
          console.error("Erro ao carregar dados:", error);
        }
      };

    useEffect(() => {
        loadData();
      }, [onSuccess]);

      const handleCover = async (isbn) => {
          try {
            const response = await  axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=data&format=json`)
            console.log(response);
            if(response.data[`ISBN:${isbn}`] !== undefined) {
                setCover(response.data[`ISBN:${isbn}`]['cover']['large'])
                setTitulo(response.data[`ISBN:${isbn}`]['notes'] ? response.data[`ISBN:${isbn}`]['notes'].split('Source title:')[1] : response.data[`ISBN:${isbn}`]['title'])
                setAno(response.data[`ISBN:${isbn}`]['publish_date'].split(', ')[1])
            } else {
                setCover(process.env.REACT_APP_BASE_COVER_URL)
            }
        
        } catch (error) {
            throw error;
        }
      }

      const handleIsbnChange = (e) => {
        const input = e.target.value;
        const isbnRegex = /^(97(8|9))?\d{9}(\d|X)$/;
        setIsbn(input);

        if (isbnRegex.test(input)) {
            handleCover(input);
        } else {
            setCover(null)
        }
      };

    //   const handleSelectChange = (e) => {
    //     const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
    //     setGenerosSelect(selectedValues);
    // };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const livroData = {
                titulo,
                isbn,
                ano,
                autor_id: parseInt(autoresSelect),
                generos: generosSelect,
                editora_id: parseInt(editorasSelect),
            }

            await createLivros(livroData);
            setToastMessage('Livro cadastrado com sucesso!');
            setToastVariant('success');
            setShowToast(true);
            onSuccess();
            handleClose();
            setAno('');
            setTitulo('');
            setIsbn(null);
            setEditorasSelect('');
            setGenerosSelect('');
            setAutoresSelect('');
        } catch (error) {
            console.error("Erro ao cadastrar o livro:", error);
            setToastMessage("Erro ao cadastrar o livro");
            setToastVariant('danger');
            setShowToast(true);
        }
    };

    return (
        <>
            <Modal size='lg' show={show} onHide={handleClose} style={{zIndex: '1050'}}>
                <Modal.Header closeButton>
                    <Modal.Title>Cadastrar Livro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <div className='d-flex'>
                            <Form.Group className="mb-3 col-md-10" controlId="exampleForm.ControlInput1">
                                <Form.Label>ISBN</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ex.: 9788576836902"
                                    value={isbn}
                                    onChange={(e) => handleIsbnChange(e)}
                                    autoFocus
                                />
                            </Form.Group>
                            {!cover ? (
                                <div className='bg-secondary col-md-2 m-2 mx-auto rounded text-white d-flex flex-column justify-content-center' style={{width: '50px', height: 'auto' }}>
                                    <FontAwesomeIcon className='h3column  mt-1' icon={faBook} />  
                                </div>
                            ) : (
                                <img className='mx-auto' width='75px' src={cover} alt="Capa do livro" />
                            ) }
                        </div>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Diario de um Banana"
                                value={titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Ano</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ex.: Diario de um Banana"
                                value={ano}
                                onChange={(e) => setAno(e.target.value)}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Autor</Form.Label>
                            <InputGroup>
                                <Form.Select
                                aria-label="Default select example"
                                value={autoresSelect}
                                onChange={(e) => setAutoresSelect(e.target.value)}
                                autoFocus
                                >
                                    <option value="" disabled selected>Selecione um Autor</option>
                                    {autores.map(autor => (
                                        <option selected key={autor.id} value={autor.id}>{autor.nome}</option>
                                    ))}
                                </Form.Select>
                                <Button className='col-md-2' variant="success" id="addAutor" onClick={handleShowAddAutor}>
                                    <div>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    <span> Autor</span>
                                    </div>
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Editora</Form.Label>
                            <InputGroup>
                                <Form.Select
                                aria-label="Default select example"
                                value={editorasSelect}
                                onChange={(e) => setEditorasSelect(e.target.value)}
                                autoFocus
                                >
                                    <option value="" disabled selected>Selecione uma editora</option>
                                    {editoras.map(editora => (
                                        <option selected key={editora.id} value={editora.id}>{editora.nome}</option>
                                    ))}
                                </Form.Select>
                                <Button className='col-md-2' variant="success" id="addEditoras" onClick={handleShowAddEditora}>
                                    <div>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    <span> Editora</span>
                                    </div>
                                </Button>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className='mb-3'>
                            <Form.Label className='col-md-1'>Gêneros</Form.Label>
                            <Button className='col-md-2' variant="success" id="addGenero" onClick={handleShowAddGenero}>
                                    <div>
                                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                                    <span> Gênero</span>
                                    </div>
                            </Button>
                            </div>
                            <div className='d-flex flex-wrap'>
                            {generos.map(genero => (
                                <Form.Check
                                    className='mx-2'
                                    key={genero.id} 
                                    type="checkbox" 
                                    label={genero.genero} 
                                    value={genero.id} 
                                    checked={generosSelect.includes(genero.id)}
                                    onChange={(e) => {
                                        const selectedValues = [...generosSelect];
                                        if (e.target.checked) {
                                            selectedValues.push(genero.id);
                                        } else {
                                            const index = selectedValues.indexOf(genero.id);
                                            if (index > -1) {
                                                selectedValues.splice(index, 1);
                                            }
                                        }
                                        setGenerosSelect(selectedValues);
                                    }}
                                />
                            ))}
                            </div>

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

            <CadastrarAutoresModal show={showAddAutor} handleClose={handleCloseAddAutor} onSuccess={loadData}/>
            <CadastrarEditoraModal show={showAddEditora} handleClose={handleCloseAddEditora} onSuccess={loadData}/>
            <CadastrarGeneroModal show={showAddGenero} handleClose={handleCloseAddGenero} onSuccess={loadData}/>
        </>
    );
};

export default CadastrarLivroModal;