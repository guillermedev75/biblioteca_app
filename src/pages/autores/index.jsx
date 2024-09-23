import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import TableAutores from '../../components/autores/table_autores/table_autores';
import CadastrarAutoresModal from '../../components/autores/modal_cadastrar_autor/modal_cadastrar_autor';

const Autores = () => {
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
          <h1>Autores</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="success" id="addAutor" onClick={handleShow}>
                <div>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span> Autor</span>
                </div>
              </Button>
            </InputGroup>
          </div>
        </div>
        <TableAutores searchTerm={searchTerm} refresh={refresh} />
      </div>
      <CadastrarAutoresModal show={show} handleClose={handleClose} onSuccess={handleRefresh} />
    </>
  );
};

export default Autores;