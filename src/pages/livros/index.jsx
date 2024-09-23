import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import TableLivros from '../../components/livros/table_livro/table_livro';
import CadastrarLivroModal from '../../components/livros/modal_cadastrar_livro/modal_cadastrar_livro';

const Livros = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setShow] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleRefresh = () => setRefresh(prev => prev + 1);

  return (
    <>
      <SideNavBar />
      <div style={{ marginLeft: '250px', padding: '25px' }}>
        <div className="d-flex justify-content-between px-2">
          <h1>Livros</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="success" id="addLivro" onClick={handleShow}>
                <div>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span> Livro</span>
                </div>
              </Button>
            </InputGroup>
          </div>
        </div>
        <TableLivros searchTerm={searchTerm} refresh={refresh} />
      </div>
      <CadastrarLivroModal show={show} handleClose={handleClose} onSuccess={handleRefresh} />
    </>
  );
};

export default Livros;