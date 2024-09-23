import React, { useState } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import SideNavBar from '../../components/side_nav_bar/side_nav_bar';
import Showroom from '../../components/showroom/showroom';

const Emprestimos = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <SideNavBar />
      <div style={{ marginLeft: '250px', padding: '25px' }}>
        <div className="d-flex justify-content-between px-2">
          <h1>Bem Vindo!</h1>
          <div className="col-md-3">
            <InputGroup>
              <Form.Control
                placeholder="Busca"
                aria-label="Busca"
                aria-describedby="basic-addon2"
                value={searchTerm}
                onChange={handleInputChange}
              />
            </InputGroup>
          </div>
        </div>
        <Showroom searchTerm={searchTerm}/>
      </div>
    </>
  );
};

export default Emprestimos;