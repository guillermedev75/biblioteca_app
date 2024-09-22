import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import TableGeneros from '../../components/generos/table_generos/table_generos';
import CadastrarGeneroModal from '../../components/generos/modal_cadastrar_genero/modal_cadastrar_genero';

const Generos = () => {
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
          <h1>Gêneros</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="success" id="addGenero" onClick={handleShow}>
                <div>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span> Gênero</span>
                </div>
              </Button>
            </InputGroup>
          </div>
        </div>
        <TableGeneros searchTerm={searchTerm} refresh={refresh} /> {/* Passa o refresh para a tabela */}
      </div>

      <CadastrarGeneroModal show={show} handleClose={handleClose} onSuccess={handleRefresh} />
    </>
  );
};

export default Generos;