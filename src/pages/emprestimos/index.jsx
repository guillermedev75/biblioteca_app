import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import CadastrarEstoqueModal from '../../components/estoque/modal_cadastrar_estoque/modal_cadastrar_estoque';
import TableEmprestimos from '../../components/emprestimos/table_emprestimo/table_emprestimo';
import CadastrarEmprestimoModal from '../../components/emprestimos/modal_cadastrar_emprestimo/modal_cadastrar_emprestimo';

const Emprestimos = () => {
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
          <h1>Emprestimo</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
              <Button variant="success" id="addEmprestimo" onClick={handleShow}>
                <div>
                  <FontAwesomeIcon icon={faPlus} className="mr-2" />
                  <span> Emprestimo</span>
                </div>
              </Button>
            </InputGroup>
          </div>
        </div>
        <TableEmprestimos searchTerm={searchTerm} refresh={refresh} />
      </div>
      
      <CadastrarEmprestimoModal show={show} handleClose={handleClose} onSuccess={handleRefresh} />
    </>
  );
};

export default Emprestimos;