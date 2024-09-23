import React, { useEffect, useState } from 'react';
import { fetchEstoque } from '../../../services/estoqueServices';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteModal from '../../modals/delete_modal';
import EditarEstoqueModal from '../modal_editar_estoque/modal_editar_estoque';

const TableEstoque = ({ searchTerm, refresh }) => {
  const [estoques, setEstoques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedEstoque, setSelectedEstoque] = useState(null);

  const handleCloseEdit = () => setShowEdit(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowEdit = (estoque) => {
    setSelectedEstoque(estoque);
    setShowEdit(true);
  };
  const handleShowDelete = (estoque) => {
    setSelectedEstoque(estoque);
    setShowDelete(true);
  };

  const loadEstoque = async () => {
    try {
      const data = await fetchEstoque();
      setEstoques(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEstoque();
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
            <th>Capa</th>
            <th>Titulo</th>
            <th>isbn</th>
            <th>Condição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estoques
            .filter(estoque => 
              estoque.livro.titulo.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(estoque => (
              <tr key={estoque.id}>
                <td className='align-middle col-md-0 text-center'>{estoque.id}</td>
                <td className='align-middle col-md-0 text-center  align-middle'>
                  <img width='50px' src={estoque.livro.cover} alt="Capa do livro" />
                </td>
                <td className='align-middle col-md-5'>{estoque.livro.titulo}</td>
                <td className='align-middle col-md-4'>{estoque.livro.isbn}</td>
                <td className='align-middle col-md-1'>{estoque.condicao}</td>
                <td className='align-middle col-md-0'>
                  <Button variant="primary" onClick={() => handleShowEdit(estoque)}>
                    <FontAwesomeIcon icon={faPen} />    
                  </Button>{' '}
                  <Button variant="danger" onClick={() => handleShowDelete(estoque)}>
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
        onSuccess={loadEstoque}
        type='estoque'
        data={selectedEstoque}
      />

      <EditarEstoqueModal
        show={showEdit} 
        handleClose={handleCloseEdit} 
        onSuccess={loadEstoque}
        data={selectedEstoque}
      />
    </div>
  );
};

export default TableEstoque;