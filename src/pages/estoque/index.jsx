import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import TableEstoque from '../../components/estoque/table_estoque/table_estoque';
import CadastrarEstoqueModal from '../../components/estoque/modal_cadastrar_estoque/modal_cadastrar_estoque';

const Estoque = () => {
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
          <h1>Estoque</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="success" id="addEstoque" onClick={handleShow}>
                <div>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span> Estoque</span>
                </div>
              </Button>
            </InputGroup>
          </div>
        </div>
        <TableEstoque searchTerm={searchTerm} refresh={refresh} />
      </div>
      
      <CadastrarEstoqueModal show={show} handleClose={handleClose} onSuccess={handleRefresh} />
    </>
  );
};

export default Estoque;