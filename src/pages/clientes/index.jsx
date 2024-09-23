import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import TableClientes from '../../components/clientes/table_cliente/table_cliente';
import CadastrarClientesModal from '../../components/clientes/modal_cadastrar_cliente/modal_cadastrar_cliente';

const Clientes = () => {
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
          <h1>Clientes</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="success" id="addCliente" onClick={handleShow}>
                <div>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span> Cliente</span>
                </div>
              </Button>
            </InputGroup>
          </div>
        </div>
        <TableClientes searchTerm={searchTerm} refresh={refresh} />
      </div>
      <CadastrarClientesModal show={show} handleClose={handleClose} onSuccess={handleRefresh} />
    </>
  );
};

export default Clientes;