import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import EditarClienteModal from '../modal_editar_cliente/modal_editar_cliente';
import { fetchClientes } from '../../../services/clientesServices';

const TableClientes = ({ searchTerm, refresh }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = (cliente) => {
    setSelectedCliente(cliente);
    setShowEdit(true);
  };
  const handleShowDelete = (cliente) => {
    setSelectedCliente(cliente);
    setShowDelete(true);
  };

  const loadClientes = async () => {
    try {
      const data = await fetchClientes();
      setClientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadClientes();
  }, [refresh]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Contato 1</th>
            <th>Contato 2</th>
            <th>Endereço</th>
            <th>Número</th>
            <th>Codigo Postal</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes
            .filter(cliente => 
              cliente.nome.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(cliente => (
              <tr key={cliente.id}>
                <td className='col-md-0 text-center'>{cliente.id}</td>
                <td className='col-md-2'>{cliente.nome}</td>
                <td className='col-md-1'>{cliente.sexo}</td>
                <td className='col-md-2'>{cliente.contato1}</td>
                <td className='col-md-2'>{cliente.contato2}</td>
                <td className='col-md-2'>{cliente.endereco}</td>
                <td className='col-md-0'>{cliente.numero}</td>
                <td className='col-md-0'>{cliente.cep}</td>
                <td className='col-md-0'>
                  <Button variant="primary" onClick={() => handleShowEdit(cliente)}>
                    <FontAwesomeIcon icon={faPen} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(cliente)}>
                    <FontAwesomeIcon icon={faTrash} />    
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <DeleteModal 
        show={showDelete} 
        handleClose={handleCloseDelete} 
        onSuccess={loadClientes}
        type='cliente'
        data={selectedCliente}
      />

      <EditarClienteModal
        show={showEdit} 
        handleClose={handleCloseEdit} 
        onSuccess={loadClientes}
        data={selectedCliente}
      />
    </div>
  );
};

export default TableClientes;